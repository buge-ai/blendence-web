'use client';

import React from 'react';
import ProductLayout from '@/app/components/ProductLayout';
import { useLanguage } from '@/lib/LanguageContext';
import { blob } from '@/lib/blob';

export default function ResetIntensePage() {
    const { t } = useLanguage();
    const p = t.productPages.resetIntense;

    return (
        <ProductLayout
            title={p.title}
            subtitle={p.subtitle}
            description={p.description}
            tag={p.tag}
            heroImage={blob('products/intense_front.png')}
            themeColor="#6b4e71"
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
                    title: p.features.how.title,
                    content: p.features.how.content
                }
            ]}
        />
    );
}
