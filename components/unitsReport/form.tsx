import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Form = () => {
  return (
    <form>
      <div className="flex flex-col gap-5">
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-3">
              <Label htmlFor="text" className="text-sm">
                1.- ¿Cuál es su número de unidad?
              </Label>
              <Input id="text" type="text" placeholder="1420" required />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-3">
              <Label htmlFor="2" className="text-sm">
                2.- ¿La unidad ya esta próximo a su servicio?
              </Label>
              <Input
                id="2"
                type="text"
                placeholder="redacte su respuesta*"
                required
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-3">
              <Label htmlFor="3" className="text-sm">
                3.- ¿La unidad cuenta con alguna falla de motor?
              </Label>
              <Input
                id="3"
                type="text"
                placeholder="redacte su respuesta*"
                required
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-3">
              <Label htmlFor="4" className="text-sm">
                4.- ¿Ha nota alguna falla en la unidad en los últimos días?
              </Label>
              <Input
                id="4"
                type="text"
                placeholder="redacte su respuesta*"
                required
              />
            </div>
          </CardContent>
        </Card>
        <Button type="submit">Siguiente</Button>
      </div>
    </form>
  );
};

export { Form };
