import { LogoFD } from "@/components/unitsReport/logoFD";
import { Welcome } from "@/components/unitsReport/welcome";
import { Form } from "@/components/unitsReport/form";

interface Prop {
  fullname: string;
}
const UnitsReport: React.FC<Prop> = ({ fullname }) => {
  return (
    <div className="flex flex-col gap-10">
      <LogoFD />
      <Welcome fullname={fullname} />
      <Form />
    </div>
  );
};

export { UnitsReport };
