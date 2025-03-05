import heroMotion from '@/motion/hero-motion.json';
import { useLottie } from 'lottie-react';

function HeroMotion() {
  const options = {
    animationData: heroMotion,
    loop: true,
    autoplay: true,
  };
  const { View } = useLottie(options);
  return View;
}

export { HeroMotion };
