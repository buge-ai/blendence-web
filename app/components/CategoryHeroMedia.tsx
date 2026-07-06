'use client';

/**
 * CategoryHeroMedia — the living hero background for category pages.
 *
 * Plays a short seamless loop grown from the same field image the
 * homepage teaser box uses, so clicking a category lands inside the
 * same world, now in motion. Mobile and reduced-motion visitors get
 * the still frame; a cream veil keeps the dark hero type legible and
 * fades the scene into the page surface below.
 */

import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function CategoryHeroMedia({
  video,
  poster,
}: {
  video: string;
  poster: string;
}) {
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <div className="hero-media" aria-hidden="true">
      <div className="media-still" style={{ backgroundImage: `url(${poster})` }} />
      {isDesktop && !reduce && (
        <video
          className="media-video"
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}
      <div className="media-veil" />
      <style jsx>{`
        .hero-media {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .media-still,
        .media-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .media-still {
          background-size: cover;
          background-position: center bottom;
        }
        .media-video {
          object-fit: cover;
          object-position: center bottom;
        }
        /* Strongest behind the centered type, transparent toward the
           edges where the scene lives, fading to the page surface at
           the bottom so the hero blends into the flow. */
        .media-veil {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              ellipse 62% 58% at 50% 40%,
              rgba(255, 253, 248, 0.78) 0%,
              rgba(255, 253, 248, 0.34) 58%,
              rgba(255, 253, 248, 0) 100%
            ),
            linear-gradient(
              180deg,
              rgba(255, 253, 248, 0.55) 0%,
              rgba(255, 253, 248, 0.12) 55%,
              var(--surface) 100%
            );
        }
      `}</style>
    </div>
  );
}
