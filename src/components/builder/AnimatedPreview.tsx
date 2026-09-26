import { motion, AnimatePresence } from 'framer-motion';
import { Preview } from '../builder/Preview';
import { useTemplate } from '../../hooks/useResume';

export function AnimatedPreview() {
  const template = useTemplate();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={template}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ 
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="w-full"
      >
        <Preview />
      </motion.div>
    </AnimatePresence>
  );
}
