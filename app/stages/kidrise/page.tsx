'use client';

import React from 'react';
import ProductLayout from '../../components/ProductLayout';

export default function KidRisePage() {
    return (
        <ProductLayout
            title="KidRise"
            subtitle="Optimized nutrition for learning and active routines (8–12)."
            description="Designed to support consistency throughout school days."
            tag="Stages — 8–12"
            heroImage="/hero/hero-backgrounds/kid-rise.png"
            themeColor="#ffb347"
            features={[
                {
                    title: "Why KidRise?",
                    content: (
                        <>
                            <p>As school routines begin, daily demands increase.</p>
                            <p>KidRise is designed as a practical alternative to sugary drinks and snacks — supporting steady energy during longer, more structured days.</p>
                        </>
                    )
                },
                {
                    title: "When is it relevant?",
                    content: (
                        <>
                            <p>Ages 8–12 represent a transition. Learning becomes more structured, days become longer, and routines more demanding.</p>
                            <p>KidRise is optimized for this stage, where steady energy and routine compatibility matter more than intensity.</p>
                        </>
                    )
                },
                {
                    title: "How it fits into daily life",
                    content: (
                        <ul>
                            <li>Easy to prepare and consume</li>
                            <li>Suitable for regular use</li>
                            <li>Designed to fit into busy school-day schedules</li>
                            <li>No strict timing or cycles required</li>
                        </ul>
                    )
                },
                {
                    title: "A note for parents",
                    content: "KidRise is a food product, not a medicine. While optimized for school-age routines, it can be consumed by individuals of different ages. The formulation is designed to be most relevant during this stage."
                }
            ]}
        />
    );
}
