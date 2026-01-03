'use client';

import React from 'react';
import ProductLayout from '@/app/components/ProductLayout';
import { useLanguage } from '@/lib/LanguageContext';

export default function KidGrowPage() {
    const { t } = useLanguage();
    const p = t.productPages.kidgrow;

    return (
        <ProductLayout
            title={p.title}
            subtitle={p.subtitle}
            description={p.description}
            tag={p.tag}
            heroImage="/hero/hero-backgrounds/kid-grow.png"
            themeColor="#7ed957"
            features={[
                {
                    title: p.features.why.title,
                    content: (
                        <>
                            {p.features.why.content.map((text, i) => (
                                <p key={i}>{text}</p>
                            ))}
                        </>
                    )
                },
                {
                    title: p.features.when.title,
                    content: (
                        <>
                            <p>{p.features.when.intro}</p>
                            <ul>
                                {p.features.when.list.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                            <p>{p.features.when.outro}</p>
                        </>
                    )
                },
                {
                    title: p.features.how.title,
                    content: (
                        <ul>
                            {p.features.how.list.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    )
                },
                {
                    title: p.features.note.title,
                    content: p.features.note.content
                }
            ]}
        />
    );
}
