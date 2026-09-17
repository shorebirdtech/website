import codePushMotion from '@/motion/code-push-motion.json';
import { useLottie } from 'lottie-react';
import { useEffect, useRef } from 'react';

/**
 * The Code Push product hero Lottie ("Bug Fixed" globe, phone + code diff)
 * exported from Webflow (`696120564c84e6906b44d2eb_code-push.json`).
 * `src/motion/code-push-motion.json` is that file with its single bitmap — the
 * halftone-dot world map behind the phone — downscaled from 2048px to 512px
 * and re-encoded. Every visible pixel of that PNG is white; the map is carried
 * entirely by its alpha channel, and the export left undefined RGB noise under
 * the transparent pixels, so flattening the RGB to white halved the file
 * (144kB -> 72kB) for a pixel-identical render. Don't downscale it further:
 * the dots are real detail, not a gradient, and 512px is already soft.
 * It is 1200x565 like the homepage animation; the parent reserves that aspect
 * ratio so nothing shifts while the island hydrates.
 */
function CodePushMotion() {
  const ref = useRef<HTMLDivElement>(null);
  const options = {
    animationData: codePushMotion,
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

export { CodePushMotion };
