import { useState } from 'react';
import { MotionProps } from 'framer-motion';

const useAnimateOnce = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  const onAnimationComplete = () => {
    setHasAnimated(true);
  };

  const motionProps: MotionProps = {
    initial: hasAnimated ? undefined : 'hidden',
    whileInView: 'show',
    onAnimationComplete,
  };

  return [motionProps];
};

export default useAnimateOnce;
