import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";

import MobileLogo from "./MobileLogo";
import NavItem from "./NavItem";
import ThemeSwitcher from "./ThemeSwitcher";
import Logo from "./Logo";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

import { navItems } from "@/constants";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="flex items-center px-2 justify-between">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild={true}>
            <Button variant={"ghost"} size={"icon"}>
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent className="w-[400px]" side={"left"}>
            <Logo />

            <div className="flex flex-col gap-1 pt-4">
              {navItems.map((item, i) => (
                <NavItem
                  key={i}
                  label={item.label}
                  link={item.link}
                  onClickHandler={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <MobileLogo />
        </div>

        <div className="flex items-center gap-5">
          <ThemeSwitcher />

          <UserButton />
        </div>
      </nav>
    </div>
  );
};

export default MobileNavbar;
