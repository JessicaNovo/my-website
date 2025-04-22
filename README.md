# Next.js i18n Localization

This project is a Next.js application that supports internationalization (i18n) using language detection, localization dictionaries, and a language switcher component. This README outlines how to set up, manage, and extend the localization features.

## Table of Contents

- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Adding New Languages](#adding-new-languages)
- [Localization Files](#localization-files)
- [Components and Flow](#components-and-flow)
- [Customized Language Detection](#customized-language-detection)
- [SEO Considerations](#seo-considerations)
- [Known Issues & Future Improvements](#known-issues--future-improvements)

## Getting Started

To get started with this Next.js application, run the following commands:

1. Clone the repository:

```bash
 git clone https://github.com/JessicaNovo/my-website.git
```

2. Navigate to the project directory:

```bash
cd my-website
```

3. Install the dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

The application should now be running at http://localhost:3000.

## Folder Structure

This is the basic structure of the project related to localization:

```code
/src
  /app
    /[lang]
      layout.tsx       // Layout for language specific pages
      page.tsx         // Main page for each language
  /lib
    i18n.ts            // Language retrieval and dictionary functions
    languageConfig.ts   // Centralized language configuration
  /locales
    en.json            // English localization file
    pt.json            // Portuguese localization file
  /components
    LanguageSwitcher.tsx // Component for switching languages
    CustomHead.tsx      // Component for managing meta tags
```

## Adding New Languages

To extend localization support with a new language:

1. Update the Supported Languages:
   Edit the `languageConfig.ts` file to include your new language code (e.g., `fr` for French):

```typescript
export const SUPPORTED_LANGUAGES = ['en', 'pt', 'fr'] as const;
```

2. Create the Localization File:

Inside the `/locales` folder, create a new JSON file named `fr.json` (or your desired language code) with the necessary translation keys and values.

```json
{
  "greeting": "Bonjour",
  "description": "Ceci est un exemple d'application Next.js."
}
```

## Localization Files

Localization files are stored in the `/locales` directory. Each file must be named according to the language code it represents (e.g., `en.json`, `pt.json`). Each JSON file should contain key-value pairs for all the text required by the application.

## Components and Flow

- Language Detection: The middleware located in `src/middleware.ts` checks the user's browser language settings and redirects to the appropriate language route if supported.
- Language Switcher: The `LanguageSwitcher` component allows users to change their language preference, implementing client-side navigation with `next/router`.
- CustomHead: The `CustomHead` component dynamically updates the metadata based on the selected language, enhancing SEO.

### Customized Language Detection

The middleware leverages the `accept-language` HTTP header to identify the user's preferred language. If the requested language is not supported, a 404 page will be displayed.

### SEO Considerations

Ensure that the `CustomHead` component includes language-specific metadata such as title and description to improve search engine optimization for different languages.
