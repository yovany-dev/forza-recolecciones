import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { setLocalReport } from "@/lib/localStorage";
import { useState, useRef, FormEvent } from "react";
import { clockInSchemaType } from "@/lib/zod/clockIn";
import { useClockInStore } from "@/lib/store/useClockInStore";
import { createClockInService } from "@/services/clockInService";
import {
  imageCompressionUtils,
  uploadPhotoUtils,
  formatDate,
} from "@/lib/utils";

const ToggleLocation = () => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="location" className="text-primary font-semibold">
        Permitir ubicación
      </Label>
      <p className="text-[12px] text-muted-foreground">
        Para poder registrar su horario, habilita los permisos de ubicación
        desde la configuración de su navegador y vuelve a intentarlo.
      </p>
    </div>
  );
};

interface Prop {
  uuid: string;
  dpi: string;
}
const ClockInForm: React.FC<Prop> = ({ uuid, dpi }) => {
  const {
    coordinates,
    coordinatesStates,
    loading,
    setLoading,
    setMessage,
    setJoined,
  } = useClockInStore();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [photoSelected, setPhotoSelected] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!inputFileRef.current?.files) {
      return;
    }
    const photo = inputFileRef.current.files[0];
    const compressedPhoto = await imageCompressionUtils(photo);
    const downloadURL = await uploadPhotoUtils(compressedPhoto.image, dpi);
    const data: clockInSchemaType = {
      employeeUUID: uuid,
      dpi: dpi,
      latitude: coordinates?.latitude,
      longitude: coordinates?.longitude,
      photoURL: downloadURL.url,
    };
    const res = await createClockInService(data);
    setLoading(false);

    if (res.status === 201) {
      setLocalReport({
        uuid: res.report.uuid,
        fullname: res.report.fullname,
        dpi: res.report.dpi,
        checkIn: res.report.checkIn,
        date: formatDate(new Date()),
      });
      setJoined(true);
      return;
    } else if (res.status === 409) {
      setMessage("Su horario ya fue marcado.");
      return;
    }
    setMessage("Ha ocurrido un error, vuelve a intentarlo.");
  };
  const handleFileChange = () => {
    if (inputFileRef.current?.files && inputFileRef.current.files.length > 0) {
      setPhotoSelected(true);
    } else {
      setPhotoSelected(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {coordinatesStates.status === false ? <ToggleLocation /> : ""}
      <div className="grid gap-2">
        <Label htmlFor="photo" className="text-primary font-semibold">
          Insertar fotografía
        </Label>
        <p className="text-[12px] text-muted-foreground">
          Tome una foto del establecimiento como prueba de su ingreso
        </p>
        <Input
          type="file"
          ref={inputFileRef}
          onChange={handleFileChange}
          id="photo"
          name="photo"
          required
        />
      </div>
      <div>
        <Button
          type="submit"
          className="w-full"
          disabled={coordinatesStates.status != true || !photoSelected}
        >
          {loading ? <Loader className="animate-spin" /> : "Marcar Horario"}
        </Button>
        {loading ? (
          <p className="mt-2 text-center">
            Creado reporte, por favor espere...
          </p>
        ) : (
          ""
        )}
      </div>
    </form>
  );
};

export { ClockInForm };
