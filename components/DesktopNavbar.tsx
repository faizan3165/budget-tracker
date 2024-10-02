import React from "react";
import { UserButton } from "@clerk/nextjs";

import Logo from "./Logo";
import NavItem from "./NavItem";
import ThemeSwitcher from "./ThemeSwitcher";

import { navItems } from "@/constants";

const DesktopNavbar = () => {
  return (
    <div className="hidden border-separate border-b bg-background md:block">
      <nav className="flex items-center justify-between px-8 w-full">
        <div className="flex h-[80px] min-h-[60px] items-center justify-between gap-x-4 w-[60%] xl:w-[60%] lg:w-[65%]">
          <Logo />

          <div className="flex h-full">
            {navItems.map((item, i) => (
              <NavItem key={i} link={item.link} label={item.label} />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <ThemeSwitcher />
          <UserButton />
        </div>
      </nav>
    </div>
  );
};

export default DesktopNavbar;
