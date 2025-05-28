import Image from "next/image";
import LogoForzaDeliveryWhite from "@/public/logo-forza-delivery-white.svg";

const LogoFD = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Image
        src={LogoForzaDeliveryWhite}
        alt="Logo Forza Delivery Express"
        width={250}
      />
      <span className="text-xl font-semibold text-[#ea5d1d]">
        Control Horario Recos
      </span>
    </div>
  );
};

export { LogoFD };
