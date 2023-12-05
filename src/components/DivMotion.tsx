import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const DivMotion = ({ children }: { children: ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {children}
        </motion.div>
    );
}