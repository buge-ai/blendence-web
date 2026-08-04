'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { WordReveal, EASE } from '@/lib/motion';
import styles from './VideoHero.module.css';

/* ------------------------------------------------------------------ */
/* Post-video showcase                                                 */
/* ------------------------------------------------------------------ */

type Slide = { src: string; name: string; path: string };

/* The five real client packaging renders (transparent PNGs — box plus
   standing sachets, correct pack copy), so the hero answers "what we
   make" the second the film ends. Each slide links to its product page. */
const SLIDES: readonly Slide[] = [
  { src: '/images/boxes/kidgrow-box.png', name: 'Stages KidGrow', path: 'stages/kidgrow' },
  { src: '/images/boxes/kidrise-box.png', name: 'Stages KidRise', path: 'stages/kidrise' },
  { src: '/images/boxes/teenfocus-box.png', name: 'Stages TeenFocus', path: 'stages/teenfocus' },
  { src: '/images/boxes/reset-balance-box.png', name: 'Reset Balance', path: 'reset/balance' },
  { src: '/images/boxes/reset-intense-box.png', name: 'Reset Intense', path: 'reset/intense' },
];

const SLIDE_MS = 3500;

function HeroShowcase() {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance. The effect is keyed on `index`, so jumping via a dot
  // restarts the full dwell instead of inheriting the remainder of the
  // previous slide's timer. Reduced motion holds on the first slide (the
  // dots still work), and hovering pauses the rotation.
  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      SLIDE_MS,
    );
    return () => window.clearTimeout(id);
  }, [index, paused, reduce]);

  const slide = SLIDES[index];

  return (
    <motion.div
      className={styles.showcase}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0.5 : 0.9, delay: 0.5, ease: EASE }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.showcaseStage}>
        <AnimatePresence>
          <motion.div
            key={index}
            className={styles.slide}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.35 : 0.8, ease: EASE }}
          >
            <Link
              href={`/${language}/${slide.path}`}
              className={styles.productLink}
              aria-label={slide.name}
            >
              <Image
                src={slide.src}
                alt={slide.name}
                fill
                sizes="(max-width: 768px) 88vw, 45vw"
                className={styles.productShot}
                /* The showcase only mounts once the video ends, so a
                   `priority` preload would be flagged as unused; eager
                   just fetches the opening slide the moment it mounts. */
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export default function VideoHero() {
  const [showOverlay, setShowOverlay] = useState(false);
  // Once the intro video truly finishes, a single studio backdrop
  // crossfades in over it (and stays), the scrim fades out, and the split
  // copy/showcase layout is left standing on a clean plate. This is
  // separate from `showOverlay`, which triggers early (see below).
  const [videoEnded, setVideoEnded] = useState(false);
  const triggered = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  // Scroll-away choreography — as the hero scrolls out, the video gently
  // scales up while the overlay content drifts up and fades.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Both intro videos are trimmed to end while the powder explosion is
  // still softly settling, so we bring the overlay in only a fraction
  // (~0.5s) before the video ends — right as the backdrop begins its 0.9s
  // crossfade. Copy, showcase and backdrop then resolve together as one
  // intentional beat, rather than 2s early over unrelated footage. Same
  // lead for desktop and mobile.
  const handleTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      if (triggered.current) return;
      const video = e.currentTarget;
      if (video.duration - video.currentTime <= 0.5) {
        triggered.current = true;
        setShowOverlay(true);
      }
    },
    [],
  );

  const handleEnded = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      // Only the video the user is actually watching should hand off to
      // the backdrop. The off-breakpoint video (display:none) reports a
      // null offsetParent, so it can't trigger an early swap over a video
      // that is still playing. Unlike showOverlay, this fires ONLY at
      // true end.
      if (e.currentTarget.offsetParent !== null) {
        setVideoEnded(true);
      }
      if (!triggered.current) {
        triggered.current = true;
        setShowOverlay(true);
      }
    },
    [],
  );

  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className={styles.container}>
      {/* Desktop video (16:9) — trimmed local clip, ends mid-settle */}
      <motion.video
        className={`${styles.video} ${styles.videoDesktop}`}
        src="/videos/hero-intro.mp4"
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        style={reduce ? undefined : { scale: videoScale }}
      />
      {/* Mobile video (9:16) — trimmed local clip, ends mid-settle */}
      <motion.video
        className={`${styles.video} ${styles.videoMobile}`}
        src="/videos/hero-intro-mobile.mp4"
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        style={reduce ? undefined : { scale: videoScale }}
      />

      {/* Post-video backdrop — a minimal studio plate that crossfades in
          over the last frame and stays, so the split copy/showcase layout
          reads on a calm surface instead of a frozen powder cloud. One
          image serves desktop and mobile (cover, centered), painted UNDER
          the overlay and sharing the videos' scroll-scale so the handoff
          stays spatially seamless. */}
      <motion.img
        src="/images/hero/hero-bg.jpg"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        className={styles.heroBg}
        initial={{ opacity: 0 }}
        animate={{ opacity: videoEnded ? 1 : 0 }}
        transition={{ duration: reduce ? 0.4 : 0.9, ease: EASE }}
        style={reduce ? undefined : { scale: videoScale }}
      />

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="hero-overlay"
            className={styles.overlay}
            style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
          >
            {/* Scrim only earns its keep over the video tail; once the
                backdrop lands it would only muddy it, so it fades out. */}
            <motion.div
              className={styles.scrim}
              initial={{ opacity: 1 }}
              animate={{ opacity: videoEnded ? 0 : 1 }}
              transition={{ duration: reduce ? 0.4 : 0.9, ease: EASE }}
            />

            <div className={styles.grid}>
              <div className={styles.textCol}>
                {/* Tagline — masked word-by-word rise */}
                <WordReveal
                  as="p"
                  className={`${styles.tagline} font-display`}
                  text={t.mainPage.videoHero?.tagline ?? ''}
                  delay={0.1}
                />

                {/* Subtitle */}
                <motion.p
                  className={styles.subtitle}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
                >
                  {t.mainPage.videoHero?.subtitle}
                </motion.p>

                {/* CTA Button */}
                <motion.a
                  href="#stages-section"
                  className={styles.ctaButton}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('stages-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {t.mainPage.videoHero?.cta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </div>

              {/* Right column — packaging carousel */}
              <HeroShowcase />
            </div>

            {/* Scroll indicator */}
            <motion.div
              className={styles.scrollIndicator}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6, ease: EASE }}
              onClick={handleScroll}
            >
              <span className={styles.scrollText}>
                {t.mainPage.videoHero?.scrollCta}
              </span>
              <div className={styles.scrollLine} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
