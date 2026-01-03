'use client';

import { useLanguage } from '@/lib/LanguageContext';
import Footer from '@/app/components/Footer';

export default function LegacyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-2xl text-gray-400">Legacy Page (Archived)</h1>
      </main>
      <Footer />
    </div>
  );
}
