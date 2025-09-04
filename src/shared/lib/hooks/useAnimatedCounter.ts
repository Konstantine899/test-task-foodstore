import { useState, useEffect, useCallback } from 'react';

interface UseAnimatedCounterOptions {
  duration?: number;
  easing?: (t: number) => number;
  onComplete?: () => void;
}

export function useAnimatedCounter(
  targetValue: number,
  options: UseAnimatedCounterOptions = {}
) {
  const { duration = 1000, easing = (t) => t, onComplete } = options;
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startAnimation = useCallback(() => {
    if (targetValue === 0) {
      setCurrentValue(0);
      return;
    }

    if (hasStarted) {
      return; // Предотвращаем повторный запуск
    }

    setHasStarted(true);
    setIsAnimating(true);
    const startTime = Date.now();
    const startValue = 0; // Всегда начинаем с 0

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      
      const newValue = Math.round(startValue + (targetValue - startValue) * easedProgress);
      setCurrentValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(targetValue);
        setIsAnimating(false);
        onComplete?.();
      }
    };

    requestAnimationFrame(animate);
  }, [targetValue, duration, easing, onComplete, hasStarted]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return { currentValue, isAnimating, startAnimation };
}
