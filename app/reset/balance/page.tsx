'use client';

import React from 'react';
import ProductLayout from '../../components/ProductLayout';

export default function ResetBalancePage() {
    return (
        <ProductLayout
            title="Reset Balance"
            subtitle="Designed to support lightness and balance in everyday routines."
            description="Designed for periods when daily routines continue, but a lighter, more balanced option feels more appropriate."
            tag="Reset — Everyday"
            heroImage="/product/product-1.png" // Placeholder as no specific Reset image in hero folder
            themeColor="#a89b7c"
            features={[
                {
                    title: "What is it about?",
                    content: (
                        <>
                            <p>Reset Balance focuses on continuity, not intensity.</p>
                            <p>It is designed for moments when you want to support balance and digestive lightness without disrupting your everyday flow. Rather than adding more, Reset Balance is about reducing unnecessary load.</p>
                        </>
                    )
                },
                {
                    title: "When is it relevant?",
                    content: (
                        <ul>
                            <li>When meals feel heavier than usual</li>
                            <li>When a lighter, plant-based option is preferred between meals</li>
                            <li>When digestive comfort and simplicity become daily priorities</li>
                            <li>When maintaining balance matters more than stimulation</li>
                        </ul>
                    )
                },
                {
                    title: "What it supports",
                    content: (
                        <ul>
                            <li>Fluid balance and digestive lightness</li>
                            <li>Digestive-friendly routines (fiber-supported)</li>
                            <li>Satiety between meals</li>
                        </ul>
                    )
                },
                {
                    title: "How it fits into daily life",
                    content: "Suitable for regular, ongoing routines. Works well as a lighter alternative between meals. No strict timing. No cycles."
                }
            ]}
        />
    );
}
