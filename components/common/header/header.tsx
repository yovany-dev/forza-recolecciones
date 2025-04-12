import React from "react";

interface Props {
  title: string;
  description: string;
}

const Header: React.FC<Props> = ({ title, description }) => {
  return (
    <div>
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight leading-10">
        {title}
      </h1>
      <p className="text-base text-muted-foreground">{description}</p>
    </div>
  );
};

export { Header };
