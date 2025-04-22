import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LANGUAGES = ['en', 'pt'] as const;
type Language = (typeof SUPPORTED_LANGUAGES)[number];

function detectLocale(request: NextRequest): Language {
  const acceptLang = request.headers.get('accept-language');
  const preferred =
    acceptLang?.split(',').map((l) => l.split('-')[0].trim()) ?? [];

  return (
    (preferred.find((lang) =>
      SUPPORTED_LANGUAGES.includes(lang as Language)
    ) as Language) || 'en'
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and already-localized paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api') ||
    SUPPORTED_LANGUAGES.some((lang) => pathname.startsWith(`/${lang}`))
  ) {
    return NextResponse.next();
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'],
};
