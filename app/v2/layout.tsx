import './styles.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blendence v2 - Designed Nutrition",
    description: "Designed nutrition for everyday balance. Naturally powerful, perfectly balanced.",
};

export default function V2Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="v2-root">
            {children}
        </div>
    );
}
