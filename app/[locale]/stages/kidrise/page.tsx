'use client';

import React from 'react';
import ProductLayout from '@/app/components/ProductLayout';
import { useLanguage } from '@/lib/LanguageContext';

export default function KidRisePage() {
    const { t } = useLanguage();
    const p = t.productPages.kidrise;

    return (
        <ProductLayout
            title={p.title}
            subtitle={p.subtitle}
            description={p.description}
            tag={p.tag}
            heroImage="/hero/hero-backgrounds/kid-rise.png"
            themeColor="#ffb347"
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
                            {p.features.when.content.map((text, i) => (
                                <p key={i}>{text}</p>
                            ))}
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
