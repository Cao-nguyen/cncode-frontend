import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const PageTransitionWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransitionWrapper;
