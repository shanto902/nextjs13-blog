import React, { ReactNode } from "react";

const PaddingContainer = ({ children }: { children: ReactNode }) => {
  return <div className="px-8 w-full xl:max-w-5xl lg:max-w-4xl mx-auto ">{children}</div>;
};

export default PaddingContainer;
