import React from "react";
import NavItem from "./Sections/NavItem";

const Navbar = () => {
  return (
    <section className="relative z-10 text-black bg-[#e2d7d2] h-full">
      <div className="w-full h-full">
        <div className="flex flex-col items-start justify-start h-full mx-5 sm:mx-10 lg:mx-20 mt-10">
          <div className="pt-8 flex flex-col items-start space-y-4 w-full">
            <NavItem />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;