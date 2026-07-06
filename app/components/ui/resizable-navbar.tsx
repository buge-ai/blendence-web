"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX, IconChevronDown } from "@tabler/icons-react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import { EASE } from "@/lib/motion";

import Link from "next/link";
import { usePathname } from "next/navigation";

import React, { createContext, useContext, useState } from "react";

/* ------------------------------------------------------------------ */
/* Token-mirrored constants (kept in sync with app/globals.css).       */
/* Tailwind arbitrary values are used inline; these drive the animated */
/* framer-motion style objects where a class can't reach.              */
/* ------------------------------------------------------------------ */
const HAIRLINE = "rgba(16, 51, 61, 0.09)";
// --shadow-soft
const SHADOW_SOFT =
    "0 1px 2px rgba(16, 51, 61, 0.04), 0 8px 24px rgba(16, 51, 61, 0.06)";
const SHADOW_NONE = "0 0px 0px rgba(16, 51, 61, 0)";
// Calm morph — no bounce.
const MORPH_SPRING = { type: "spring", stiffness: 180, damping: 26 } as const;

/* ------------------------------------------------------------------ */
/* Shared state — broadcast scroll / homepage mode to every sub-part.  */
/* ------------------------------------------------------------------ */
interface NavbarState {
    /** scrolled past the fold threshold */
    scrolled: boolean;
    isHomepage: boolean;
    /** homepage + not yet scrolled → transparent, light-on-hero treatment */
    overHero: boolean;
}
const NavbarContext = createContext<NavbarState>({
    scrolled: false,
    isHomepage: false,
    overHero: false,
});
const useNavbar = () => useContext(NavbarContext);

interface NavbarProps {
    children: React.ReactNode;
    className?: string;
    isHomepage?: boolean;
}

interface NavBodyProps {
    children: React.ReactNode;
    className?: string;
}

interface NavItemsProps {
    items: {
        name: string;
        link: string;
    }[];
    className?: string;
    onItemClick?: () => void;
}

interface MobileNavProps {
    children: React.ReactNode;
    className?: string;
}

interface MobileNavHeaderProps {
    children: React.ReactNode;
    className?: string;
}

interface MobileNavMenuProps {
    children: React.ReactNode;
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const Navbar = ({ children, className, isHomepage = false }: NavbarProps) => {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState<boolean>(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 80);
    });

    // On the homepage the bar floats transparent over the cinematic hero
    // until the user scrolls; everywhere else it is the frosted pill.
    const overHero = isHomepage && !scrolled;

    return (
        <NavbarContext.Provider value={{ scrolled, isHomepage, overHero }}>
            <div className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}>
                {/* Legibility scrim — only over the hero, softly fades away on scroll. */}
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-32"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(14,42,51,0.40), rgba(14,42,51,0))",
                    }}
                    initial={false}
                    animate={{ opacity: overHero ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                />
                {children}
            </div>
        </NavbarContext.Provider>
    );
};

export const NavBody = ({ children, className }: NavBodyProps) => {
    const { overHero } = useNavbar();

    return (
        <motion.div
            initial={false}
            animate={
                overHero
                    ? {
                        width: "100%",
                        y: 0,
                        backgroundColor: "rgba(255, 255, 255, 0)",
                        backdropFilter: "blur(0px) saturate(100%)",
                        boxShadow: SHADOW_NONE,
                        borderColor: "rgba(16, 51, 61, 0)",
                        paddingLeft: 8,
                        paddingRight: 8,
                        paddingTop: 18,
                        paddingBottom: 18,
                    }
                    : {
                        width: "40%",
                        y: 16,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(16px) saturate(140%)",
                        boxShadow: SHADOW_SOFT,
                        borderColor: HAIRLINE,
                        paddingLeft: 22,
                        paddingRight: 22,
                        paddingTop: 12,
                        paddingBottom: 12,
                    }
            }
            transition={MORPH_SPRING}
            style={{
                minWidth: "820px",
            }}
            className={cn(
                "relative z-[60] mx-auto hidden max-w-7xl flex-row items-center justify-between self-start rounded-full border lg:flex",
                className,
            )}
        >
            {children}
        </motion.div>
    );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
    const [hovered, setHovered] = useState<number | null>(null);
    const { overHero } = useNavbar();
    const pathname = usePathname();

    return (
        <motion.div
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "flex flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium lg:space-x-1",
                className,
            )}
        >
            {items.map((item, idx) => {
                const active =
                    pathname === item.link || pathname.startsWith(item.link + "/");
                return (
                    <Link
                        onMouseEnter={() => setHovered(idx)}
                        onClick={onItemClick}
                        className={cn(
                            "relative px-4 py-2 transition-colors duration-300",
                            overHero
                                ? active
                                    ? "text-white"
                                    : "text-white/80 hover:text-white"
                                : active
                                    ? "font-semibold text-[#1A4D5C]"
                                    : "text-[#46595F] hover:text-[#1A4D5C]",
                        )}
                        key={`link-${idx}`}
                        href={item.link}
                    >
                        {hovered === idx && (
                            <motion.div
                                layoutId="hovered"
                                className={cn(
                                    "absolute inset-0 h-full w-full rounded-full",
                                    overHero ? "bg-white/10" : "bg-[#F4F8F8]",
                                )}
                                transition={MORPH_SPRING}
                            />
                        )}
                        <span className="relative z-20">{item.name}</span>
                    </Link>
                );
            })}
        </motion.div>
    );
};

export const MobileNav = ({ children, className }: MobileNavProps) => {
    const { overHero } = useNavbar();

    return (
        <motion.div
            initial={false}
            animate={
                overHero
                    ? {
                        width: "100%",
                        y: 0,
                        backgroundColor: "rgba(255, 255, 255, 0)",
                        backdropFilter: "blur(0px) saturate(100%)",
                        boxShadow: SHADOW_NONE,
                        borderColor: "rgba(16, 51, 61, 0)",
                        borderRadius: 0,
                        paddingLeft: 16,
                        paddingRight: 16,
                    }
                    : {
                        width: "92%",
                        y: 12,
                        backgroundColor: "rgba(255, 255, 255, 0.82)",
                        backdropFilter: "blur(16px) saturate(140%)",
                        boxShadow: SHADOW_SOFT,
                        borderColor: HAIRLINE,
                        borderRadius: 18,
                        paddingLeft: 16,
                        paddingRight: 16,
                    }
            }
            transition={MORPH_SPRING}
            className={cn(
                "relative z-50 mx-auto flex w-full flex-col items-center justify-between border py-3 lg:hidden",
                className,
            )}
        >
            {children}
        </motion.div>
    );
};

export const MobileNavHeader = ({
    children,
    className,
}: MobileNavHeaderProps) => {
    return (
        <div
            className={cn(
                "flex w-full flex-row items-center justify-between",
                className,
            )}
        >
            {children}
        </div>
    );
};

export const MobileNavMenu = ({
    children,
    className,
    isOpen,
    onClose,
}: MobileNavMenuProps) => {
    const items = React.Children.toArray(children);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop — blurred veil, tap to dismiss. */}
                    <motion.div
                        className="fixed inset-0 z-40 bg-[rgba(14,42,51,0.28)] backdrop-blur-sm lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        onClick={onClose}
                    />
                    {/* Sheet — slides + fades on the signature easing. */}
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className={cn(
                            "absolute inset-x-0 top-full z-50 mt-3 flex w-full flex-col items-start justify-start gap-1 rounded-[18px] border border-[rgba(16,51,61,0.09)] bg-white/95 px-6 py-6 backdrop-blur-xl",
                            "shadow-[0_4px_8px_rgba(16,51,61,0.06),0_24px_64px_rgba(16,51,61,0.14)]",
                            className,
                        )}
                    >
                        <motion.div
                            className="flex w-full flex-col gap-1"
                            initial="hidden"
                            animate="show"
                            variants={{
                                hidden: {},
                                show: {
                                    transition: {
                                        staggerChildren: 0.07,
                                        delayChildren: 0.06,
                                    },
                                },
                            }}
                        >
                            {items.map((child, i) => (
                                <motion.div
                                    key={i}
                                    className="w-full"
                                    variants={{
                                        hidden: { opacity: 0, y: 8 },
                                        show: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.5, ease: EASE },
                                        },
                                    }}
                                >
                                    {child}
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export const MobileNavToggle = ({
    isOpen,
    onClick,
}: {
    isOpen: boolean;
    onClick: () => void;
}) => {
    const { overHero } = useNavbar();
    return (
        <button
            onClick={onClick}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className={cn(
                "relative z-[70] rounded-full p-2 transition-colors duration-300",
                overHero
                    ? "text-white hover:bg-white/15"
                    : "text-[#1A4D5C] hover:bg-[#F4F8F8]",
            )}
        >
            {isOpen ? (
                <IconX className="h-6 w-6" />
            ) : (
                <IconMenu2 className="h-6 w-6" />
            )}
        </button>
    );
};

export const NavbarLogo = ({
    src = "/logo.png",
    alt = "logo",
    href = "/",
}: {
    src?: string;
    alt?: string;
    href?: string;
}) => {
    const { overHero } = useNavbar();
    return (
        <Link
            href={href}
            className="relative z-20 flex items-center space-x-2 py-1"
        >
            <motion.img
                src={src}
                alt={alt}
                className="h-12 w-auto object-contain"
                initial={false}
                animate={{
                    filter: overHero
                        ? "brightness(0) invert(1)"
                        : "brightness(1) invert(0)",
                }}
                transition={{ duration: 0.5, ease: EASE }}
            />
        </Link>
    );
};

export const NavLinksWrapper = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "flex flex-1 items-center justify-center gap-6",
                className,
            )}
        >
            {children}
        </div>
    );
};

export const NavbarButton = ({
    href,
    as: Tag = "a",
    children,
    className,
    variant = "primary",
    ...props
}: {
    href?: string;
    as?: React.ElementType;
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
    | React.ComponentPropsWithoutRef<"a">
    | React.ComponentPropsWithoutRef<"button">
)) => {
    const { overHero } = useNavbar();

    const baseStyles =
        "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold tracking-[0.02em] transition-all duration-300 active:scale-[0.97] text-center cursor-pointer";

    // Primary mirrors .btn-primary (petrol pill); secondary mirrors .btn-ghost
    // (hairline pill), flipping to a light-on-hero treatment over the hero.
    const variantStyles: Record<string, string> = {
        primary:
            "bg-[#1A4D5C] text-white border border-[#1A4D5C] shadow-[0_1px_2px_rgba(16,51,61,0.04),0_8px_24px_rgba(16,51,61,0.06)] hover:bg-[#10333D] hover:-translate-y-0.5",
        secondary: overHero
            ? "border border-white/40 text-white hover:bg-white hover:text-[#1A4D5C]"
            : "border border-[rgba(16,51,61,0.09)] text-[#1A4D5C] hover:bg-[#1A4D5C] hover:text-white",
        dark: "bg-[#10333D] text-white hover:bg-[#0E2A33]",
        gradient:
            "bg-[#1A4D5C] text-white hover:bg-[#10333D]",
    };

    return (
        <Tag
            href={href || undefined}
            className={cn(baseStyles, variantStyles[variant], className)}
            {...props}
        >
            {children}
        </Tag>
    );
};

export const NavDropdown = ({
    name,
    link,
    items,
    className,
}: {
    name: string;
    link: string;
    items: { name: string; link: string }[];
    className?: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { overHero } = useNavbar();

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <Link
                href={link}
                className={cn(
                    "relative flex cursor-pointer items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-300",
                    overHero
                        ? "text-white/80 hover:text-white"
                        : "text-[#46595F] hover:text-[#1A4D5C]",
                )}
            >
                {name}
                <IconChevronDown
                    className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        isOpen && "rotate-180",
                    )}
                />
            </Link>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className={cn(
                            "absolute left-1/2 top-full z-[100] mt-2 w-48 -translate-x-1/2 rounded-[18px] border border-[rgba(16,51,61,0.09)] bg-white/95 p-2 shadow-[0_4px_8px_rgba(16,51,61,0.06),0_24px_64px_rgba(16,51,61,0.14)] backdrop-blur-xl",
                            className,
                        )}
                    >
                        {items.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.link}
                                className="block rounded-[12px] px-4 py-2 text-sm text-[#46595F] transition-all hover:bg-[#F4F8F8] hover:text-[#1A4D5C]"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
