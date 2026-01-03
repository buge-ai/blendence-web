'use client';

import React from 'react';
import ProductLayout from '@/app/components/ProductLayout';
import { useLanguage } from '@/lib/LanguageContext';

export default function ResetBalancePage() {
    const { t } = useLanguage();
    const p = t.productPages.resetBalance;

    return (
        <ProductLayout
            title={p.title}
            subtitle={p.subtitle}
            description={p.description}
            tag={p.tag}
            heroImage="/product/product-1.png"
            themeColor="#a89b7c"
            features={[
                {
                    title: p.features.what.title,
                    content: (
                        <>
                            {p.features.what.content.map((text, i) => (
                                <p key={i}>{text}</p>
                            ))}
                        </>
                    )
                },
                {
                    title: p.features.when.title,
                    content: (
                        <ul>
                            {p.features.when.list.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    )
                },
                {
                    title: p.features.supports.title,
                    content: (
                        <ul>
                            {p.features.supports.list.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    )
                },
                {
                    title: p.features.how.title,
                    content: p.features.how.content
                }
            ]}
        />
    );
}
