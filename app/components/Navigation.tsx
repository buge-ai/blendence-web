'use client';

import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavDropdown,
} from "./ui/resizable-navbar";
import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const stagesItems = [
    { name: "KidGrow (4-7)", link: "/stages/kidgrow" },
    { name: "KidRise (8-12)", link: "/stages/kidrise" },
    { name: "TeenFocus (13-16)", link: "/stages/teenfocus" },
  ];

  const resetItems = [
    { name: "Balance", link: "/reset/balance" },
    { name: "Intense", link: "/reset/intense" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  return (
    <Navbar className="top-0">
      {/* Desktop Navigation */}
      <NavBody className="bg-transparent backdrop-blur-none border-none">
        <NavbarLogo src="/logo.png" href="/" />

        <div className="flex flex-1 items-center justify-center gap-6">
          <NavDropdown name="Stages" items={stagesItems} />
          <NavDropdown name="Reset" items={resetItems} />
          <Link
            href="/our-approach"
            className="text-sm font-medium text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white transition-colors duration-200"
          >
            Our Approach
          </Link>
        </div>

        {/* Spacer for layout balance */}
        <div className="w-[180px] hidden lg:block" />
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav className="bg-transparent border-none">
        <MobileNavHeader>
          <NavbarLogo src="/logo.png" href="/" />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex flex-col gap-6 w-full">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 px-2">Stages</p>
              <div className="flex flex-col gap-1">
                {stagesItems.map((item, idx) => (
                  <Link
                    key={`mobile-stage-${idx}`}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-neutral-600 dark:text-neutral-300 font-medium text-lg py-2 px-2 hover:bg-black/5 rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 px-2">Reset</p>
              <div className="flex flex-col gap-1">
                {resetItems.map((item, idx) => (
                  <Link
                    key={`mobile-reset-${idx}`}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-neutral-600 dark:text-neutral-300 font-medium text-lg py-2 px-2 hover:bg-black/5 rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/our-approach"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-neutral-800 dark:text-white font-semibold text-lg py-2 px-2 border-t border-neutral-100 dark:border-neutral-800 mt-2 pt-4"
            >
              Our Approach
            </Link>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}


