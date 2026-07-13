'use client';

import React from 'react';
import ProductLayout from '@/app/components/ProductLayout';
import { useLanguage } from '@/lib/LanguageContext';
import { blob } from '@/lib/blob';

export default function ResetBalancePage() {
    const { t } = useLanguage();
    const p = t.productPages.resetBalance;

    return (
        <ProductLayout
            title={p.title}
            subtitle={p.subtitle}
            description={p.description}
            tag={p.tag}
            heroImage={blob('products/balance_front.png')}
            themeColor="#9C8F72" /* canonical: var(--balance) */
            themeTint="#F4F1EA"  /* canonical: var(--balance-tint) */
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
