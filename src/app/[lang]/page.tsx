import { Language, SUPPORTED_LANGUAGES } from 'lib/languageConfig';
import { notFound } from 'next/navigation';
import LanguageSwitcher from 'components/LanguageSwitcher';
import { useDictionary } from 'lib/DictionaryContext';
import DictionaryProviderWrapper from '../DictionaryProviderWrapper';
import { getDictionary } from 'lib/i18n';

// Define the props type for the Page component expecting params as a Promise
type Props = {
  params: Promise<{ lang: string }>;
};

// Asynchronous function that renders the main page based on the provided language
export default async function Page({ params }: Props) {
  // Await the params object to directly access the lang property
  const { lang } = await params;

  // Check if the language provided in the URL is supported; if not, trigger a 404 error
  if (!SUPPORTED_LANGUAGES.includes(lang as Language)) {
    notFound(); // Redirect user to a 404 page
  }

  // Fetch the localization dictionary for the selected language
  const t = await getDictionary(lang as Language); // Fetch the dictionary when server renders

  // Render the main content of the page
  return (
    <DictionaryProviderWrapper initialDictionaries={{ [lang]: t }}>
      <main>
        {/* Display language switcher component */}
        <LanguageSwitcher />
        {/* Use the greeting text from the localization dictionary */}
        <h1>{t.greeting}</h1>{' '}
        {/* Use the description text from the localization dictionary */}
        <p>{t.description}</p>{' '}
      </main>
    </DictionaryProviderWrapper>
  );
}
