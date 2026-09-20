import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.blendence.com';
const LOCALES = ['en', 'tr'] as const;

// Every public page, locale-less. `/legacy` is intentionally left out.
const PATHS = [
    '',
    '/about',
    '/approach',
    '/contact',
    '/food-safety',
    '/gender-equality',
    '/privacy',
    '/terms',
    '/stages',
    '/stages/kidgrow',
    '/stages/kidrise',
    '/stages/teenfocus',
    '/reset',
    '/reset/balance',
    '/reset/intense',
];

export default function sitemap(): MetadataRoute.Sitemap {
    return PATHS.flatMap((path) =>
        LOCALES.map((locale) => ({
            url: `${BASE_URL}/${locale}${path}`,
            alternates: {
                languages: Object.fromEntries(
                    LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`])
                ),
            },
        }))
    );
}
