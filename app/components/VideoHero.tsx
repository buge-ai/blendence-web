'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { WordReveal, EASE } from '@/lib/motion';
import { blob } from '@/lib/blob';
import styles from './VideoHero.module.css';

// `peak` is each mound's peak x-position as a fraction of the end-still's
// width (measured from /images/hero/hero-end-desktop.jpg, 2560x1429). The
// desktop fan positions every sachet dead-center over its own mound using
// these fractions — see the productRow map + `.productSlot` below.
const products = [
  { src: blob('products/kid-grow.png'), name: 'KidGrow', rotate: -5, y: 4, peak: 0.133 },
  { src: blob('products/kid-rise.png'), name: 'KidRise', rotate: -2.5, y: 1, peak: 0.317 },
  { src: blob('products/teen-focus.png'), name: 'TeenFocus', rotate: 0, y: 0, peak: 0.497 },
  { src: blob('products/balance_front.png'), name: 'Balance', rotate: 2.5, y: 1, peak: 0.68 },
  { src: blob('products/intense_front.png'), name: 'Intense', rotate: 5, y: 4, peak: 0.863 },
];

// The end still is object-fit: cover, horizontally centered. Its displayed
// width is therefore max(viewport width, imageAspect * viewport height), and
// a point at image fraction `f` lands at screen-x = 50% + (f - 0.5) * that
// displayed width. Positioning each sachet with this exact expression makes it
// track its mound at every aspect ratio (16:9, 16:10, 3:2), not just one.
const STILL_ASPECT = 2560 / 1429; // ~1.7915
const moundLeft = (peak: number) => {
  const d = peak - 0.5;
  const sign = d < 0 ? '-' : '+';
  return `calc(50% ${sign} ${Math.abs(d).toFixed(4)} * max(100vw, ${(STILL_ASPECT * 100).toFixed(2)}vh))`;
};

export default function VideoHero() {
  const [showOverlay, setShowOverlay] = useState(false);
  // Once the intro video truly finishes, we crossfade a color-corrected
  // still of the powder mounds in over it (and keep it there). This is
  // separate from `showOverlay`, which triggers early (see below).
  const [videoEnded, setVideoEnded] = useState(false);
  const [mobileProductIndex, setMobileProductIndex] = useState(0);
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

  // Mobile product carousel — cycle every 2s once overlay is shown
  useEffect(() => {
    if (!showOverlay) return;
    const timer = setInterval(() => {
      setMobileProductIndex((prev) => (prev + 1) % products.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [showOverlay]);

  // Both intro videos are now trimmed to end just before the powder mounds
  // form (the mounds materialize during the still crossfade instead). The
  // tail of each trimmed clip is the explosion softly settling, so we bring
  // the overlay in only a fraction (~0.5s) before the video ends — right as
  // the corrected-mounds still begins its 0.9s crossfade. Content and still
  // then resolve together as one intentional beat, rather than 2s early over
  // unrelated footage. Same lead for desktop and mobile.
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
      // the still. The off-breakpoint video (display:none) reports a null
      // offsetParent, so it can't trigger an early swap over a video that
      // is still playing. Unlike showOverlay, this fires ONLY at true end.
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
      {/* Desktop video (16:9) — trimmed local clip, ends just before mounds form */}
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
      {/* Mobile video (9:16) — trimmed local clip, ends just before mounds form */}
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

      {/* Color-corrected end stills — the mounds in the video read too
          vivid, so once the video finishes we fade a corrected still in
          over it (and leave it there). Same responsive show/hide + cover
          fit + scroll-scale as the videos, painted UNDER the overlay. */}
      <motion.img
        src="/images/hero/hero-end-desktop.jpg"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        className={`${styles.still} ${styles.videoDesktop}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: videoEnded ? 1 : 0 }}
        transition={{ duration: reduce ? 0.4 : 0.9, ease: EASE }}
        style={reduce ? undefined : { scale: videoScale }}
      />
      <motion.img
        src="/images/hero/hero-end-mobile.jpg"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        className={`${styles.still} ${styles.videoMobile}`}
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
            <div className={styles.scrim} />

            <div className={styles.topContent}>
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

            {/* Desktop — each sachet stands in front of its own powder mound.
                The slot is absolutely positioned at the mound's peak x; the
                inner motion.div keeps the stagger entrance, per-item tilt and
                hover lift. */}
            <div className={styles.productRow}>
              {products.map((product, i) => (
                <div
                  key={product.name}
                  className={styles.productSlot}
                  style={{ left: moundLeft(product.peak), zIndex: 2 }}
                >
                  <motion.div
                    className={styles.productItem}
                    style={{ rotate: product.rotate }}
                    initial={{ opacity: 0, y: 60, scale: 0.94 }}
                    animate={{ opacity: 1, y: product.y, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.45 + i * 0.09,
                      ease: EASE,
                    }}
                    whileHover={
                      reduce
                        ? undefined
                        : {
                            y: product.y - 12,
                            scale: 1.04,
                            transition: { duration: 0.45, ease: EASE },
                          }
                    }
                  >
                    <Image
                      src={product.src}
                      alt={product.name}
                      width={270}
                      height={420}
                      className={styles.productImage}
                    />
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Mobile — fan carousel (all products visible, active one centered) */}
            <div className={styles.mobileCarousel}>
              <div className={styles.mobileFan}>
                {products.map((product, i) => {
                  // Position relative to active index (-2 to +2)
                  let offset = i - mobileProductIndex;
                  // Wrap around for circular carousel
                  if (offset > 2) offset -= products.length;
                  if (offset < -2) offset += products.length;

                  const isActive = offset === 0;
                  const scale = isActive ? 1 : 0.75 - Math.abs(offset) * 0.08;
                  const translateX = offset * 100;
                  const rotate = offset * 7;
                  const zIndex = 5 - Math.abs(offset);
                  const opacity = Math.abs(offset) <= 2 ? 1 - Math.abs(offset) * 0.25 : 0;

                  return (
                    <motion.div
                      key={product.name}
                      className={`${styles.mobileFanItem} ${isActive ? styles.mobileFanActive : ''}`}
                      animate={{
                        x: translateX,
                        scale,
                        rotate,
                        opacity,
                        zIndex,
                      }}
                      transition={{ duration: 0.6, ease: EASE }}
                      onClick={() => setMobileProductIndex(i)}
                    >
                      <div className={styles.mobileProductImageWrap}>
                        <Image
                          src={product.src}
                          alt={product.name}
                          fill
                          sizes="280px"
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
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
