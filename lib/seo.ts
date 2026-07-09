import type { Metadata } from 'next';
import type { Locale } from './i18n-config';

// og:locale codes per app locale. The root layout keeps a neutral default;
// every [locale] route overrides it through pageMetadata() below.
const OG_LOCALE: Record<Locale, string> = { en: 'en_US', tr: 'tr_TR' };

const SITE_NAME = 'BLENDENCE';

type PageContent = { title: string; description: string };

export type PageKey =
  | 'home'
  | 'about'
  | 'approach'
  | 'contact'
  | 'foodSafety'
  | 'genderEquality'
  | 'privacy'
  | 'terms'
  | 'reset'
  | 'resetBalance'
  | 'resetIntense'
  | 'stages'
  | 'kidgrow'
  | 'kidrise'
  | 'teenfocus';

interface PageDef {
  // Path segment after the locale, '' for the locale root (home).
  path: string;
  en: PageContent;
  tr: PageContent;
}

// Per-page, per-locale titles + meta descriptions. Copy is written in the
// page's own language and reflects current product names (Stages: KidGrow,
// KidRise, TeenFocus; Reset: Balance, Intense) and the 100% freeze-dried
// (liyofilize) positioning — never "vegan supplements", "Green Mix" or
// "Red Mix".
const PAGES: Record<PageKey, PageDef> = {
  home: {
    path: '',
    en: {
      title: 'BLENDENCE — Naturally Powerful, Perfectly Balanced',
      description:
        'BLENDENCE crafts 100% freeze-dried nutrition mixes from natural fruits and vegetables — designed to fit real life across every stage and reset moment.',
    },
    tr: {
      title: 'BLENDENCE — Doğal Güç, Mükemmel Denge',
      description:
        'BLENDENCE, doğal meyve ve sebzelerden %100 liyofilize beslenme karışımları üretir — her yaşam evresine ve yenilenme anına uyum sağlayacak şekilde tasarlandı.',
    },
  },
  about: {
    path: 'about',
    en: {
      title: 'About | BLENDENCE',
      description:
        'Blendence is a functional nutrition brand by BUGE Foods, built on freeze-drying technology — additive-free, 100% fruit-and-vegetable, FSSC 22000 certified.',
    },
    tr: {
      title: 'Hakkımızda | BLENDENCE',
      description:
        "Blendence, BUGE Foods'un liyofilizasyon teknolojisi üzerine kurduğu fonksiyonel beslenme markasıdır — katkısız, %100 meyve-sebze, FSSC 22000 sertifikalı.",
    },
  },
  approach: {
    path: 'approach',
    en: {
      title: 'Our Approach | BLENDENCE',
      description:
        'The Blendence method starts with real-life needs, not ingredients — bringing food engineering and nutritional insight together to design blends for daily life.',
    },
    tr: {
      title: 'Yaklaşımımız | BLENDENCE',
      description:
        'Blendence metodu malzemelerden değil gerçek yaşam ihtiyaçlarından başlar; gıda mühendisliği ve beslenme bilgisini birleştirerek günlük yaşama karışımlar tasarlar.',
    },
  },
  contact: {
    path: 'contact',
    en: {
      title: 'Contact | BLENDENCE',
      description:
        "Get in touch with Blendence. Reach the BUGE Foods team in Edirne, Türkiye by phone, WhatsApp or email — we'd love to hear from you about our freeze-dried mixes.",
    },
    tr: {
      title: 'İletişim | BLENDENCE',
      description:
        "Blendence ile iletişime geçin. Edirne'deki BUGE Foods ekibine telefon, WhatsApp veya e-posta ile ulaşın. Liyofilize karışımlarımız için buradayız.",
    },
  },
  foodSafety: {
    path: 'food-safety',
    en: {
      title: 'Food Safety & Quality | BLENDENCE',
      description:
        'Blendence and BUGE Foods produce freeze-dried fruit and vegetable products under FSSC 22000 and ISO 22000 standards, with full traceability and clean sourcing.',
    },
    tr: {
      title: 'Gıda Güvenliği ve Kalite | BLENDENCE',
      description:
        'Blendence ve BUGE Foods, liyofilize meyve ve sebze ürünlerini FSSC 22000 ve ISO 22000 standartlarına uygun, tam izlenebilirlik ve temiz tedarikle üretir.',
    },
  },
  genderEquality: {
    path: 'gender-equality',
    en: {
      title: 'Gender Equality Plan | BLENDENCE',
      description:
        'The BUGE Foods (Blendence) Gender Equality Plan sets out our commitment to equal opportunity, balanced representation and an inclusive workplace culture.',
    },
    tr: {
      title: 'Toplumsal Cinsiyet Eşitliği Planı | BLENDENCE',
      description:
        'BUGE Foods (Blendence) Toplumsal Cinsiyet Eşitliği Planı; fırsat eşitliği, dengeli temsil ve kapsayıcı bir iş yeri kültürüne olan bağlılığımızı ortaya koyar.',
    },
  },
  privacy: {
    path: 'privacy',
    en: {
      title: 'Privacy Policy | BLENDENCE',
      description:
        'Read the Blendence and BUGE Foods privacy policy and KVKK disclosure, covering how personal data is collected, processed, protected and your rights as a user.',
    },
    tr: {
      title: 'Gizlilik Politikası | BLENDENCE',
      description:
        'Blendence ve BUGE Foods gizlilik politikası ve KVKK aydınlatma metni: kişisel verilerin nasıl toplandığı, işlendiği, korunduğu ve kullanıcı haklarınız.',
    },
  },
  terms: {
    path: 'terms',
    en: {
      title: 'Terms & Conditions | BLENDENCE',
      description:
        "The terms and conditions for using the Blendence website, including intellectual property, user responsibilities, disclaimers and BUGE Foods' policies.",
    },
    tr: {
      title: 'Kullanım Şartları | BLENDENCE',
      description:
        "Blendence web sitesinin kullanım şartları: fikri mülkiyet hakları, kullanıcı sorumlulukları, sorumluluk reddi ve BUGE Foods'un politikalarını içerir.",
    },
  },
  reset: {
    path: 'reset',
    en: {
      title: 'Reset | BLENDENCE',
      description:
        'Blendence Reset is a range of freeze-dried blends for moments when the body benefits from lightness and renewed balance. Meet Balance and Intense.',
    },
    tr: {
      title: 'Reset | BLENDENCE',
      description:
        'Blendence Reset, vücudun hafiflik ve yenilenen dengeden fayda sağladığı anlar için liyofilize karışımlar serisidir. Balance ve Intense ile tanışın.',
    },
  },
  resetBalance: {
    path: 'reset/balance',
    en: {
      title: 'Reset Balance | BLENDENCE',
      description:
        'Reset Balance is a light, plant-based freeze-dried blend designed to support everyday digestive lightness and balance — for ongoing routines, no strict timing.',
    },
    tr: {
      title: 'Reset Balance | BLENDENCE',
      description:
        'Reset Balance, günlük sindirim hafifliği ve dengeyi desteklemek için tasarlanmış hafif, bitki bazlı liyofilize bir karışımdır. Sürekli rutinler için.',
    },
  },
  resetIntense: {
    path: 'reset/intense',
    en: {
      title: 'Reset Intense | BLENDENCE',
      description:
        'Reset Intense is a concentrated, plant-based freeze-dried blend for moments when a stronger sense of lightness and balance is preferred. For intermittent use.',
    },
    tr: {
      title: 'Reset Intense | BLENDENCE',
      description:
        'Reset Intense, daha güçlü bir hafiflik ve denge hissinin tercih edildiği anlar için yoğun, bitki bazlı liyofilize bir karışımdır. Aralıklı kullanım için.',
    },
  },
  stages: {
    path: 'stages',
    en: {
      title: 'Stages | BLENDENCE',
      description:
        'Blendence Stages offers freeze-dried nutrition optimized for every life phase, from early growth to focus-intensive teens: KidGrow, KidRise and TeenFocus.',
    },
    tr: {
      title: 'Stages | BLENDENCE',
      description:
        'Blendence Stages, erken büyümeden odak yoğun ergenliğe her yaşam evresi için optimize edilmiş liyofilize beslenme sunar: KidGrow, KidRise ve TeenFocus.',
    },
  },
  kidgrow: {
    path: 'stages/kidgrow',
    en: {
      title: 'KidGrow | BLENDENCE',
      description:
        'KidGrow is a freeze-dried nutrition mix optimized for early growth stages (ages 4–7) — a natural, practical alternative to sugary drinks and snacks.',
    },
    tr: {
      title: 'KidGrow | BLENDENCE',
      description:
        'KidGrow, erken büyüme aşamaları (4–7 yaş) için optimize edilmiş liyofilize beslenme karışımıdır. Şekerli içecek ve atıştırmalıklara doğal bir alternatif.',
    },
  },
  kidrise: {
    path: 'stages/kidrise',
    en: {
      title: 'KidRise | BLENDENCE',
      description:
        'KidRise is a freeze-dried nutrition mix optimized for learning and active school routines (ages 8–12), supporting steady energy through longer, busy days.',
    },
    tr: {
      title: 'KidRise | BLENDENCE',
      description:
        'KidRise, öğrenme ve aktif okul rutinleri (8–12 yaş) için optimize edilmiş liyofilize beslenme karışımıdır; daha uzun, yoğun günlerde dengeli enerjiyi destekler.',
    },
  },
  teenfocus: {
    path: 'stages/teenfocus',
    en: {
      title: 'TeenFocus | BLENDENCE',
      description:
        'TeenFocus is a freeze-dried nutrition mix optimized for focus-intensive teens (ages 13–16), supporting clarity and consistency on demanding school days.',
    },
    tr: {
      title: 'TeenFocus | BLENDENCE',
      description:
        'TeenFocus, odak yoğun ergenlik yılları (13–16 yaş) için optimize edilmiş liyofilize beslenme karışımıdır; zorlu okul günlerinde berraklık ve tutarlılığı destekler.',
    },
  },
};

/**
 * Build full, self-contained Metadata for a given locale + route. Every field
 * (title, description, openGraph incl. locale/alternateLocale, twitter,
 * hreflang alternates) is set here so the output is correct regardless of how
 * Next merges parent/child metadata. metadataBase (root layout) resolves the
 * relative canonical/url/language URLs to absolute.
 */
export function pageMetadata(locale: Locale, key: PageKey): Metadata {
  const page = PAGES[key];
  const content = page[locale];
  const otherLocale: Locale = locale === 'en' ? 'tr' : 'en';
  const seg = page.path ? `/${page.path}` : '';
  const canonical = `/${locale}${seg}`;

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical,
      languages: {
        en: `/en${seg}`,
        tr: `/tr${seg}`,
      },
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      locale: OG_LOCALE[locale],
      alternateLocale: OG_LOCALE[otherLocale],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
    },
  };
}
