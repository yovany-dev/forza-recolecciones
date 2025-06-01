import { LogoFD } from "@/components/home/logoFD";
import { ClockIn } from "@/components/home/clockIn";
// import { Report } from "@/components/home/report";

interface Prop {
  fullname: string;
  uuid: string;
}
const ClockInHome: React.FC<Prop> = ({ fullname, uuid }) => {
  return (
    <div className="flex flex-col gap-10">
      <LogoFD />
      <ClockIn fullname={fullname} uuid={uuid} />
      {/* {loading ? (
        "cargando..."
      ) : Si existe reporte ? (
        <Report />
      ) : (
        <ClockIn fullname={fullname} uuid={uuid} />
      )} */}
    </div>
  );
};

export { ClockInHome };
