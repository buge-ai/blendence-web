"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX, IconChevronDown } from "@tabler/icons-react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";

import Link from "next/link";

import React, { useRef, useState } from "react";


interface NavbarProps {
    children: React.ReactNode;
    className?: string;
}

interface NavBodyProps {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
    isHomepage?: boolean;
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
    visible?: boolean;
    isHomepage?: boolean;
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

export const Navbar = ({ children, className }: NavbarProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const [visible, setVisible] = useState<boolean>(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 100) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    });

    return (
        <motion.div
            ref={ref}
            className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
        >
            {React.Children.map(children, (child) =>
                React.isValidElement(child)
                    ? React.cloneElement(
                        child as React.ReactElement<{ visible?: boolean }>,
                        { visible },
                    )
                    : child,
            )}
        </motion.div>
    );
};

export const NavBody = ({ children, className, visible, isHomepage }: NavBodyProps) => {
    // On homepage, hide entire navbar until scrolled; on other pages, always visible
    const shouldShow = isHomepage ? visible : true;

    return (
        <motion.div
            animate={{
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
                width: "40%",
                y: 20,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                opacity: shouldShow ? 1 : 0,
                pointerEvents: shouldShow ? "auto" : "none",
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 50,
            }}
            style={{
                minWidth: "800px",
            }}
            className={cn(
                "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-8 py-4 lg:flex",
                className,
            )}
        >
            {children}
        </motion.div>
    );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <motion.div
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "flex flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-neutral-700 transition duration-200 hover:text-neutral-900 lg:space-x-2",
                className,
            )}
        >
            {items.map((item, idx) => (
                <Link
                    onMouseEnter={() => setHovered(idx)}
                    onClick={onItemClick}
                    className="relative px-4 py-2 text-neutral-700"
                    key={`link-${idx}`}
                    href={item.link}
                >
                    {hovered === idx && (
                        <motion.div
                            layoutId="hovered"
                            className="absolute inset-0 h-full w-full rounded-full bg-gray-100"
                        />
                    )}
                    <span className="relative z-20 transition-colors duration-200 hover:text-black">{item.name}</span>
                </Link>
            ))}
        </motion.div>
    );
};

export const MobileNav = ({ children, className, visible, isHomepage }: MobileNavProps) => {
    // On homepage, hide entire mobile navbar until scrolled; on other pages, always visible
    const shouldShow = isHomepage ? visible : true;

    return (
        <motion.div
            animate={{
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
                width: "90%",
                paddingRight: "20px",
                paddingLeft: "20px",
                borderRadius: "12px",
                y: 20,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                opacity: shouldShow ? 1 : 0,
                pointerEvents: shouldShow ? "auto" : "none",
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 50,
            }}
            className={cn(
                "relative z-50 mx-auto flex w-full flex-col items-center justify-between py-4 lg:hidden",
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
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={cn(
                        "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-xl bg-white/95 px-6 py-8 shadow-xl backdrop-blur-lg",
                        className,
                    )}
                >
                    {children}
                </motion.div>
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
    return (
        <button
            onClick={onClick}
            className="p-2 transition-colors duration-200 hover:bg-black/5 rounded-full"
        >
            {isOpen ? (
                <IconX className="w-6 h-6 text-neutral-800" />
            ) : (
                <IconMenu2 className="w-6 h-6 text-neutral-800" />
            )}
        </button>
    );
};

export const NavbarLogo = ({ src = "/logo.png", alt = "logo", href = "/" }: { src?: string; alt?: string; href?: string }) => {
    return (
        <Link
            href={href}
            className="relative z-20 flex items-center space-x-2 py-1"
        >
            <img
                src={src}
                alt={alt}
                className="h-14 w-auto object-contain"
            />
        </Link>
    );
};

export const NavLinksWrapper = ({
    children,
    className
}: {
    children: React.ReactNode;
    visible?: boolean;
    isHomepage?: boolean;
    className?: string;
}) => {
    // Visibility is now controlled at the NavBody level, so always show content
    return (
        <div
            className={cn(
                "flex flex-1 items-center justify-center gap-6",
                className
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
    const baseStyles =
        "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95 text-center cursor-pointer";

    const variantStyles = {
        primary:
            "bg-black text-white hover:bg-neutral-800 shadow-lg shadow-black/5",
        secondary:
            "bg-transparent text-neutral-800 hover:bg-black/5",
        dark:
            "bg-neutral-900 text-white hover:bg-black",
        gradient:
            "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90",
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
    items,
    className
}: {
    name: string;
    items: { name: string; link: string }[];
    className?: string
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="relative px-4 py-2 text-neutral-700 transition-colors duration-200 hover:text-black flex items-center gap-1 cursor-pointer font-medium text-sm">
                {name}
                <IconChevronDown className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={cn(
                            "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-xl bg-white/95 backdrop-blur-xl border border-neutral-200/50 shadow-2xl p-2 z-[100]",
                            className
                        )}
                    >
                        {items.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.link}
                                className="block px-4 py-2 text-sm text-neutral-700 hover:text-black hover:bg-black/5 rounded-lg transition-all"
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
