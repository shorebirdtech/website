import { motion } from 'framer-motion';
import promo from '../assets/videos/promo.mp4';

export const PromoVideo = () => {
  return (
    <section className="w-full flex justify-center pt-10 mb-16 lg:mb-32 relative">
      <div className="flex flex-col w-full lg:w-[1150px] justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {/* <div className="shorebird-block-subtitle text-center mb-6">Demo</div> */}
          <div className="shorebird-block-big-title text-center mb-16 px-8 sm:px-24 md:px-48">
            See it in action
          </div>
          <video
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            src={promo}
            className="w-6/7 sm:w-4/6 2xl:w-[1200px] mx-auto rounded-xl shorebird-border-gray hero-dashboard-border-gradient"
          />
        </motion.div>
      </div>
    </section>
  );
};
