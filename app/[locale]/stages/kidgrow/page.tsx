'use client';

import React from 'react';
import ProductLayout from '@/app/components/ProductLayout';

export default function KidGrowPage() {
    return (
        <ProductLayout
            title="KidGrow"
            subtitle="Optimized nutrition for early growth stages (4–7)."
            description="Practical support for everyday routines during early childhood."
            tag="Stages — 4–7"
            heroImage="/hero/hero-backgrounds/kid-grow.png"
            themeColor="#7ed957"
            features={[
                {
                    title: "Why KidGrow?",
                    content: (
                        <>
                            <p>Early childhood is about building habits as much as it is about growth.</p>
                            <p>KidGrow is designed as a healthier alternative to sugary drinks and snacks — offering a practical, nourishing option that fits naturally between meals and daily routines.</p>
                        </>
                    )
                },
                {
                    title: "When is it relevant?",
                    content: (
                        <>
                            <p>Ages 4–7 mark a foundational stage. During this period, children experience:</p>
                            <ul>
                                <li>Rapid physical development</li>
                                <li>Evolving daily routines</li>
                                <li>Changing nutritional needs</li>
                            </ul>
                            <p>KidGrow is optimized for this stage, where consistency and balance matter more than intensity.</p>
                        </>
                    )
                },
                {
                    title: "How it fits into daily life",
                    content: (
                        <ul>
                            <li>Easy to prepare and consume</li>
                            <li>Suitable for regular use</li>
                            <li>Especially suited for morning or daytime routines</li>
                            <li>Integrates naturally into everyday life without complexity</li>
                        </ul>
                    )
                },
                {
                    title: "A note for parents",
                    content: "KidGrow is a food product, not a medicine. While optimized for early growth stages, it can be consumed by individuals of different ages. The formulation is designed to be most relevant during this stage."
                }
            ]}
        />
    );
}
