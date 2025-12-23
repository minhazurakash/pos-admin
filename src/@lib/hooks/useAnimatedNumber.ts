import { useEffect, useState } from 'react';

const useAnimatedNumber = (value, duration = 500) => {
  const [animatedValue, setAnimatedValue] = useState(value);

  useEffect(() => {
    let start = null;
    const initial = animatedValue;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = initial + (value - initial) * progress;
      setAnimatedValue(current);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return animatedValue;
};

export default useAnimatedNumber;
