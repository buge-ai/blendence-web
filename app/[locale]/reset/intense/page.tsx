'use client';

import React from 'react';
import ProductLayout from '@/app/components/ProductLayout';
import { useLanguage } from '@/lib/LanguageContext';

export default function ResetIntensePage() {
    const { t } = useLanguage();
    const p = t.productPages.resetIntense;

    return (
        <ProductLayout
            title={p.title}
            subtitle={p.subtitle}
            description={p.description}
            tag={p.tag}
            heroImage="/images/products/reset-intense-sachet.png"
            themeColor="#6E5678" /* canonical: var(--intense) */
            themeTint="#F1EDF3"  /* canonical: var(--intense-tint) */
            features={[
                {
                    title: p.features.why.title,
                    content: <p>{p.features.why.content}</p>,
                },
                {
                    title: p.features.whoFor.title,
                    full: true,
                    content: (
                        <ul>
                            {p.features.whoFor.list.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    ),
                },
            ]}
            cleanFormulation={p.cleanFormulation.items}
        />
    );
}
