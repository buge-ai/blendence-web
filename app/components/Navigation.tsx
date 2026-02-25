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

  return (
    <Navbar>
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
              className="relative text-neutral-600 w-full py-2 text-lg font-medium"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex w-full flex-col gap-3 pt-4 border-t border-neutral-100">
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
