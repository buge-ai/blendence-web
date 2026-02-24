'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import styles from './VideoHero.module.css';

const products = [
  { src: '/product/kid-grow.png', name: 'KidGrow', rotate: -6, y: 8 },
  { src: '/product/kid-rise.png', name: 'KidRise', rotate: -3, y: 2 },
  { src: '/product/teen-focus.png', name: 'TeenFocus', rotate: 0, y: -4 },
  { src: '/product/balance_front.png', name: 'Balance', rotate: 3, y: 2 },
  { src: '/product/intense_front.png', name: 'Intense', rotate: 6, y: 8 },
];

export default function VideoHero() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [mobileProductIndex, setMobileProductIndex] = useState(0);
  const triggered = useRef(false);
  const { t } = useLanguage();

  // Mobile product carousel — cycle every 1.5s once overlay is shown
  useEffect(() => {
    if (!showOverlay) return;
    const timer = setInterval(() => {
      setMobileProductIndex((prev) => (prev + 1) % products.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [showOverlay]);

  const handleTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      if (triggered.current) return;
      const video = e.currentTarget;
      if (video.duration - video.currentTime <= 2) {
        triggered.current = true;
        setShowOverlay(true);
      }
    },
    [],
  );

  const handleMobileTimeUpdate = useCallback(
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

  const handleEnded = useCallback(() => {
    if (!triggered.current) {
      triggered.current = true;
      setShowOverlay(true);
    }
  }, []);

  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      {/* Desktop video */}
      <video
        className={`${styles.video} ${styles.videoDesktop}`}
        src="/0224.mp4"
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      {/* Mobile video (9:16) — trigger 0.5s before end */}
      <video
        className={`${styles.video} ${styles.videoMobile}`}
        src="/0224-mobile.mp4"
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleMobileTimeUpdate}
        onEnded={handleEnded}
      />

      <AnimatePresence>
        {showOverlay && (
          <div className={styles.overlay}>
            <div className={styles.scrim} />

            <div className={styles.topContent}>
              {/* Tagline */}
              <motion.p
                className={styles.tagline}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              >
                {t.mainPage.videoHero?.tagline}
              </motion.p>

              {/* Subtitle */}
              <motion.p
                className={styles.subtitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              >
                {t.mainPage.videoHero?.subtitle}
              </motion.p>

              {/* CTA Button */}
              <motion.a
                href="#stages-section"
                className={styles.ctaButton}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('stages-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t.mainPage.videoHero?.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            </div>

            {/* Desktop — fan layout */}
            <div className={styles.productRow}>
              {products.map((product, i) => (
                <motion.div
                  key={product.name}
                  className={`${styles.productItem} ${i === 2 ? styles.productCenter : ''}`}
                  style={{
                    rotate: product.rotate,
                    translateY: product.y,
                  }}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: product.y }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + i * 0.12,
                    ease: 'easeOut',
                  }}
                >
                  <Image
                    src={product.src}
                    alt={product.name}
                    width={180}
                    height={280}
                    className={styles.productImage}
                  />
                </motion.div>
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
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
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
              transition={{ duration: 0.6, delay: 1.6 }}
              onClick={handleScroll}
            >
              <span className={styles.scrollText}>
                {t.mainPage.videoHero?.scrollCta}
              </span>
              <div className={styles.scrollArrow} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
