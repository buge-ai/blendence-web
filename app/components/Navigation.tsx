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
  NavLinksWrapper,
} from "./ui/resizable-navbar";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, Locale, locales } from "@/lib/LanguageContext";
import { IconWorld } from "@tabler/icons-react";

export default function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  // Get the path without the locale prefix for building links
  const getLocalizedPath = (targetLocale: Locale, path?: string) => {
    const currentPath = path || pathname;
    const segments = currentPath.split('/').filter(Boolean);

    // Check if first segment is a locale
    if (locales.includes(segments[0] as Locale)) {
      segments[0] = targetLocale;
    } else {
      segments.unshift(targetLocale);
    }

    return '/' + segments.join('/');
  };

  // Get path without locale for internal links
  const getPathWithoutLocale = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (locales.includes(segments[0] as Locale)) {
      segments.shift();
    }
    return '/' + segments.join('/');
  };

  const stagesItems = [
    { name: t.nav.kidGrow, link: `/${language}/stages/kidgrow` },
    { name: t.nav.kidRise, link: `/${language}/stages/kidrise` },
    { name: t.nav.teenFocus, link: `/${language}/stages/teenfocus` },
  ];

  const resetItems = [
    { name: t.nav.balance, link: `/${language}/reset/balance` },
    { name: t.nav.intense, link: `/${language}/reset/intense` },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const handleLanguageChange = (lang: Locale) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <Navbar className="top-0">
      {/* Desktop Navigation */}
      <NavBody className="bg-transparent backdrop-blur-none border-none">
        <NavbarLogo src="/logo.png" href={`/${language}`} />

        <NavLinksWrapper>
          <NavDropdown name={t.nav.stages} items={stagesItems} />
          <NavDropdown name={t.nav.reset} items={resetItems} />
          <Link
            href={`/${language}/approach`}
            className="text-sm font-medium text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white transition-colors duration-200"
          >
            {t.nav.ourApproach}
          </Link>
        </NavLinksWrapper>

        {/* Language Switcher - Desktop */}
        <div className="relative hidden lg:block">
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <IconWorld size={18} />
            <span className="uppercase">{language}</span>
          </button>

          {isLanguageDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 py-2 min-w-[140px] z-50">
              <Link
                href={getLocalizedPath('en')}
                onClick={() => setIsLanguageDropdownOpen(false)}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${language === 'en' ? 'font-semibold text-black dark:text-white' : 'text-neutral-600 dark:text-neutral-300'
                  }`}
              >
                {t.common.english}
              </Link>
              <Link
                href={getLocalizedPath('tr')}
                onClick={() => setIsLanguageDropdownOpen(false)}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${language === 'tr' ? 'font-semibold text-black dark:text-white' : 'text-neutral-600 dark:text-neutral-300'
                  }`}
              >
                {t.common.turkish}
              </Link>
            </div>
          )}
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav className="bg-transparent border-none">
        <MobileNavHeader>
          <NavbarLogo src="/logo.png" href={`/${language}`} />
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
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 px-2">{t.nav.stages}</p>
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
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 px-2">{t.nav.reset}</p>
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
              href={`/${language}/approach`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-neutral-800 dark:text-white font-semibold text-lg py-2 px-2 border-t border-neutral-100 dark:border-neutral-800 mt-2 pt-4"
            >
              {t.nav.ourApproach}
            </Link>

            {/* Language Switcher - Mobile */}
            <div className="border-t border-neutral-100 dark:border-neutral-800 pt-4 mt-2">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 px-2">{t.common.language}</p>
              <div className="flex gap-2 px-2">
                <Link
                  href={getLocalizedPath('en')}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium text-center transition-colors ${language === 'en'
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300'
                    }`}
                >
                  {t.common.english}
                </Link>
                <Link
                  href={getLocalizedPath('tr')}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium text-center transition-colors ${language === 'tr'
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300'
                    }`}
                >
                  {t.common.turkish}
                </Link>
              </div>
            </div>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
