'use client';

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/resizable-navbar";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, Locale, locales } from "@/lib/LanguageContext";
import { blob } from "@/lib/blob";

export default function Navigation() {
  const { language, t } = useLanguage();
  const pathname = usePathname();

  const getLocalizedPath = (targetLocale: Locale, path?: string) => {
    const currentPath = path || pathname;
    const segments = currentPath.split('/').filter(Boolean);
    if (locales.includes(segments[0] as Locale)) {
      segments[0] = targetLocale;
    } else {
      segments.unshift(targetLocale);
    }
    return '/' + segments.join('/');
  };

  const navItems = [
    { name: t.nav.stages, link: `/${language}/stages` },
    { name: t.nav.reset, link: `/${language}/reset` },
    { name: t.nav.ourApproach, link: `/${language}/approach` },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const otherLang: Locale = language === 'en' ? 'tr' : 'en';
  const otherLangLabel = language === 'en' ? 'TR' : 'EN';

  // Homepage = the locale root (/, /en, /tr). Only there does the navbar
  // float transparent over the hero and morph into the frosted pill on scroll.
  const segments = pathname.split('/').filter(Boolean);
  const isHomepage =
    segments.length === 0 ||
    (segments.length === 1 && locales.includes(segments[0] as Locale));

  return (
    <Navbar isHomepage={isHomepage}>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo src={blob('logos/logo.png')} href={`/${language}`} />
        <NavItems items={navItems} />
        <div className="flex items-center gap-2">
          <Link href={getLocalizedPath(otherLang)}>
            <NavbarButton variant="secondary" as="span">
              {otherLangLabel}
            </NavbarButton>
          </Link>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo src={blob('logos/logo.png')} href={`/${language}`} />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative block w-full py-2 text-lg font-medium text-[#1A4D5C] transition-colors hover:text-[#10333D]"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex w-full flex-col gap-3 pt-4 mt-2 border-t border-[rgba(16,51,61,0.09)]">
            <Link href={getLocalizedPath(otherLang)} onClick={() => setIsMobileMenuOpen(false)}>
              <NavbarButton variant="secondary" as="span" className="w-full">
                {language === 'en' ? t.common.turkish : t.common.english}
              </NavbarButton>
            </Link>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
