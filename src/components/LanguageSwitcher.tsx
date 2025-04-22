'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LanguageSwitcher = ({ currentLang }: { currentLang: string }) => {
  const pathname = usePathname();

  const otherLang = currentLang === 'en' ? 'pt' : 'en';
  const newPath = pathname.replace(`/${currentLang}`, `/${otherLang}`);

  return (
    <nav style={{ marginBottom: 16 }}>
      <Link href={newPath}>Switch to {otherLang.toUpperCase()}</Link>
    </nav>
  );
};

export default LanguageSwitcher;
