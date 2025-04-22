// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LANGUAGES = ['en', 'pt'] as const;
type Language = (typeof SUPPORTED_LANGUAGES)[number];

function detectLocale(request: NextRequest): Language {
  const acceptLang = request.headers.get('accept-language');
  const preferred =
    acceptLang?.split(',').map((lang) => lang.split('-')[0].trim()) ?? [];

  const foundLang = preferred.find((lang) =>
    SUPPORTED_LANGUAGES.includes(lang as Language)
  );

  // Fallback to English if no valid language found
  return (foundLang as Language) || 'en';
}

// Helper function to check if the requested pathname is already localized (i.e., contains a language code)
function isLocalizedPath(pathname: string): boolean {
  return SUPPORTED_LANGUAGES.some((lang) => pathname.startsWith(`/${lang}`));
}

// Middleware function to handle requests and redirect users based on their preferred language
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl; // Get the pathname from the request URL

  // Check if the request is for static files, API routes, or already localized paths
  if (
    pathname.startsWith('/_next') || // Skip Next.js internal files
    pathname.startsWith('/favicon.ico') || // Skip favicon requests
    pathname.startsWith('/api') || // Skip API route requests
    isLocalizedPath(pathname) // Skip paths that already contain a supported language
  ) {
    return NextResponse.next(); // Proceed to the next middleware or response
  }

  // Detect the user's preferred language
  const locale = detectLocale(request);

  // Redirect the user to their preferred language path, preserving the original pathname
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}
