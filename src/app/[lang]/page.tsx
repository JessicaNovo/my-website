import { getDictionary, Language, languages } from 'lib/i18n';
import { notFound } from 'next/navigation';
import LanguageSwitcher from 'components/LanguageSwitcher';

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function Page({ params }: Props) {
  // Await the params object and directly access the lang property
  const { lang } = await params;

  if (!languages.includes(lang as Language)) {
    notFound();
  }

  const t = await getDictionary(lang as Language);

  return (
    <main>
      <LanguageSwitcher currentLang={lang} />
      <h1>{t.greeting}</h1>
      <p>{t.description}</p>
    </main>
  );
}
