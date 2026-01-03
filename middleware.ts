import { NextRequest, NextResponse } from 'next/server';

export const locales = ['en', 'tr'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'en';

// Get the preferred locale from the request
function getLocale(request: NextRequest): Locale {
    // Check if locale is stored in cookie
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale && locales.includes(cookieLocale as Locale)) {
        return cookieLocale as Locale;
    }

    // Check Accept-Language header
    const acceptLanguage = request.headers.get('Accept-Language');
    if (acceptLanguage) {
        const preferredLocale = acceptLanguage
            .split(',')
            .map(lang => lang.split(';')[0].trim().substring(0, 2))
            .find(lang => locales.includes(lang as Locale));

        if (preferredLocale) {
            return preferredLocale as Locale;
        }
    }

    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the pathname already has a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // Skip middleware for static files, api routes, etc.
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') // static files like .ico, .png, etc.
    ) {
        return NextResponse.next();
    }

    // Redirect to the locale-prefixed path
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next, api)
        // Skip all static files
        '/((?!_next|api|.*\\..*).*)',
    ],
};
