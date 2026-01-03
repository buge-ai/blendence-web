'use client';

import React from 'react';
import ProductLayout from '@/app/components/ProductLayout';

export default function TeenFocusPage() {
    return (
        <ProductLayout
            title="TeenFocus"
            subtitle="Optimized nutrition for focus-intensive stages (13–16)."
            description="Designed to support consistency during mentally demanding school years."
            tag="Stages — 13–16"
            heroImage="/hero/hero-backgrounds/teen-focus.png"
            themeColor="#87ceeb"
            features={[
                {
                    title: "Why TeenFocus?",
                    content: (
                        <>
                            <p>As school years progress, mental demands increase. Longer study periods, more information, and sustained attention become part of daily routines.</p>
                            <p>TeenFocus is designed to support focus during these periods — without turning nutrition into pressure or shortcuts.</p>
                        </>
                    )
                },
                {
                    title: "When is it relevant?",
                    content: (
                        <p>Ages 13–16 are often mentally intensive. TeenFocus is optimized for stages where clarity and consistency matter more than stimulation.</p>
                    )
                },
                {
                    title: "How it fits into daily life",
                    content: (
                        <ul>
                            <li>Fits naturally into study routines and longer school days</li>
                            <li>Easy to prepare</li>
                            <li>Suitable for regular use</li>
                            <li>No strict timing required</li>
                        </ul>
                    )
                },
                {
                    title: "A note on use",
                    content: "TeenFocus is a food product, not a medicine. While optimized for focus-intensive teenage years, it can be consumed by individuals of different ages."
                }
            ]}
        />
    );
}
