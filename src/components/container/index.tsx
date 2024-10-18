import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[90%] lg:max-w-[1269px] xl:max-w-[1440px] mx-auto h-full">
      {children}
    </div>
  );
};

export default Container;
