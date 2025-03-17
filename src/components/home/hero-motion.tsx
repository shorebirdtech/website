import heroMotion from '@/motion/hero-motion.json';
import { useLottie } from 'lottie-react';
import { useEffect, useRef } from 'react';

function HeroMotion() {
  const ref = useRef<HTMLDivElement>(null);
  const options = {
    animationData: heroMotion,
    loop: true,
    autoplay: true,
  };
  const { View, pause, play } = useLottie(options);

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
      { threshold: 0.5 },
    );
    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, [ref, play, pause]);

  return <span ref={ref}>{View}</span>;
}

export { HeroMotion };
