'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { StyleRegistry, createStyleRegistry } from 'styled-jsx';

// Collects every <style jsx> rule rendered on the server and inlines it into
// the HTML <head> (Next's documented styled-jsx setup for the App Router).
//
// Without this, the scoped CSS only exists inside the JS chunks and is
// injected after hydration. Server HTML then paints unstyled for the first
// few hundred ms of a cold visit — e.g. next/image `fill` images (inline
// position:absolute; width/height:100%) whose wrapper only gets
// `position: relative` from styled-jsx escape to the page top and flash
// full-screen over the hero before snapping into place.
export default function StyledJsxRegistry({ children }: { children: React.ReactNode }) {
  // Create the registry once (lazy initial state), per request on the server.
  const [jsxStyleRegistry] = useState(() => createStyleRegistry());

  useServerInsertedHTML(() => {
    const styles = jsxStyleRegistry.styles();
    jsxStyleRegistry.flush();
    return <>{styles}</>;
  });

  return <StyleRegistry registry={jsxStyleRegistry}>{children}</StyleRegistry>;
}
