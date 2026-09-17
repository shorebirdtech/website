import heroMotion from '@/motion/hero-motion.json';
import { useLottie } from 'lottie-react';
import { useEffect, useRef } from 'react';

/**
 * The homepage "home" Lottie (phone + terminal lines) exported from Webflow.
 * `src/motion/hero-motion.json` is the `animations/main.json` of the
 * `.lottie` bundle with its single bitmap inlined as a data URI. It is
 * 1200x565; the parent reserves that aspect ratio so nothing shifts while
 * the island hydrates.
 */
function HeroMotion() {
  const ref = useRef<HTMLDivElement>(null);
  const options = {
    animationData: heroMotion,
    loop: true,
    autoplay: true,
    rendererSettings: { preserveAspectRatio: 'xMidYMax meet' },
  };
  const { View, pause, play } = useLottie(options, {
    width: '100%',
    height: '100%',
  });

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
        } else {
          pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, [ref, play, pause]);

  return (
    <div ref={ref} className="h-full w-full">
      {View}
    </div>
  );
}

export { HeroMotion };
