import { AnimatePresence, motion } from 'motion/react';
import { useFormMode } from '../../providers/form-mode';
import { FORM_COMPONENT_MAP } from './constants';

export function FormModeContent() {
  const { formMode } = useFormMode();

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
    >
      <motion.div
        key={formMode}
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {FORM_COMPONENT_MAP[formMode]}
      </motion.div>
    </AnimatePresence>
  );
}
