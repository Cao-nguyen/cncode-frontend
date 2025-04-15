import { motion } from "framer-motion";

const PageTransitionWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.1 }}
  >
    {children}
  </motion.div>
);

export default PageTransitionWrapper;
