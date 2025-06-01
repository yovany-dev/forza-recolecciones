import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

interface Prop {
  dpi: string;
  location: string;
  photo: string;
}
const ReportTest: React.FC<Prop> = ({ dpi, location, photo }) => {
  const [coordinates, setCoordinates] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const getClockIn = async () => {
    const res = await fetch(`/api/report/clock-in?dpi=${dpi}`);
    const data = await res.json();

    if (data.status == 200) {
      setCoordinates(`${data.clockIn.latitude},${data.clockIn.longitude}`);
      setPhotoUrl(data.clockIn.photoUrl);
    }
  };
  useEffect(() => {
    getClockIn();
  }, []);
  return (
    <>
      {location === "DETECTADA" && coordinates ? (
        <DropdownMenuItem
          onClick={() => {
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates}`;
            window.open(mapUrl, "_blank");
          }}
        >
          Ver ubicación
        </DropdownMenuItem>
      ) : (
        ""
      )}
      {photo === "CARGADA" && photoUrl ? (
        <DropdownMenuItem
          onClick={() => {
            if (photoUrl) {
              window.open(photoUrl, "_blank");
            }
          }}
        >
          Ver fotografía
        </DropdownMenuItem>
      ) : (
        ""
      )}
    </>
  );
};

export { ReportTest };
