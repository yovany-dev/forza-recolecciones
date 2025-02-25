import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="driver" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="driver">Piloto</TabsTrigger>
        <TabsTrigger value="assistant">Auxiliar</TabsTrigger>
      </TabsList>
      <TabsContent value="driver">
        <Card>
          <CardHeader>
            <CardTitle>Piloto</CardTitle>
            <CardDescription>
              Complete la información del nuevo piloto. Por favor, no deje campos vacíos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="employeeNumber">No. Gafete</Label>
              <Input id="employeeNumber" defaultValue="111654" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="fullname">Nombre Completo</Label>
              <Input id="fullname" defaultValue="Denilson Yovani Morales Chivalan" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="dpi">Número de Documento</Label>
              <Input id="dpi" defaultValue="3270080241402" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="position">Cargo</Label>
              <Input id="position" defaultValue="Piloto Recolector" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="schedule">Horario</Label>
              <Input id="schedule" defaultValue="08:30" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Guardar</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="assistant">
        <Card>
          <CardHeader>
            <CardTitle>Auxiliar</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
