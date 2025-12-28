'use client';

import React from 'react';
import ProductLayout from '../../components/ProductLayout';

export default function ResetIntensePage() {
    return (
        <ProductLayout
            title="Reset Intense"
            subtitle="Designed for moments when a more pronounced sense of lightness is preferred."
            description="Designed for periods when everyday balance feels harder to maintain and a more concentrated approach becomes relevant."
            tag="Reset — Targeted"
            heroImage="/product/product-1.png" // Placeholder
            themeColor="#6b4e71"
            features={[
                {
                    title: "What is it about?",
                    content: (
                        <>
                            <p>Reset Intense focuses on intensity of formulation, not intensity of use.</p>
                            <p>It is designed for moments when you want to support digestive lightness and balance in a shorter, more focused way. Intended for intermittent use, rather than continuous routines.</p>
                        </>
                    )
                },
                {
                    title: "When is it relevant?",
                    content: (
                        <ul>
                            <li>When a stronger sense of lightness is preferred</li>
                            <li>When meals or routines feel noticeably heavier than usual</li>
                            <li>When a more concentrated, plant-based option feels appropriate</li>
                            <li>When digestive comfort and simplicity become immediate priorities</li>
                        </ul>
                    )
                },
                {
                    title: "How it fits into daily life",
                    content: "Designed to be used when needed, not as a permanent part of daily routines. Practical for specific moments. Flexible use without rigid timing or cycles."
                }
            ]}
        />
    );
}
