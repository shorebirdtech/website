import { motion } from 'framer-motion';
import promo from '../assets/videos/promo.mp4';

export const PromoVideo = () => {
  return (
    <section className="relative mb-16 flex w-full justify-center pt-10 lg:mb-32">
      <div className="flex w-full flex-col justify-center lg:w-[1150px]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="shorebird-block-big-title mb-16 px-8 text-center sm:px-24 md:px-48">
            See it in action
          </div>
          <video
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            src={promo}
            className="w-6/7 shorebird-border-gray hero-dashboard-border-gradient mx-auto rounded-xl sm:w-4/6 2xl:w-[1200px]"
          />
        </motion.div>
      </div>
    </section>
  );
};
