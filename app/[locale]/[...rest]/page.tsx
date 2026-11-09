import { notFound } from 'next/navigation';

// Catch-all for unknown URLs under a valid locale (/tr/olmayan, /en/xyz).
// Without it Next renders the root 404, which sits outside the locale layout
// and has no language. Throwing here makes Next use app/[locale]/not-found.tsx
// instead (HTTP 404, server-rendered in the right language).
export default function CatchAllNotFound(): never {
  notFound();
}
