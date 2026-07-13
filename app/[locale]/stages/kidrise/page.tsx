'use client';

import React from 'react';
import ProductLayout from '@/app/components/ProductLayout';
import { useLanguage } from '@/lib/LanguageContext';
import { blob } from '@/lib/blob';

export default function KidRisePage() {
    const { t } = useLanguage();
    const p = t.productPages.kidrise;

    return (
        <ProductLayout
            title={p.title}
            subtitle={p.subtitle}
            description={p.description}
            tag={p.tag}
            heroImage={blob('products/kid-rise.png')}
            themeColor="#D9964E" /* canonical: var(--kidrise) */
            themeTint="#FAF1E6"  /* canonical: var(--kidrise-tint) */
            features={[
                {
                    title: p.features.why.title,
                    content: <p>{p.features.why.content}</p>,
                },
                {
                    title: p.features.whoFor.title,
                    content: (
                        <ul>
                            {p.features.whoFor.list.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    ),
                },
                {
                    title: p.features.note.title,
                    content: p.features.note.content,
                },
            ]}
            cleanFormulation={p.cleanFormulation.items}
        />
    );
}
