import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * @param {Object} options - Intersection Observer options
 * @returns {[React.RefObject, boolean]} - Ref to attach to element and visibility state
 */
export const useScrollAnimation = (options = {}) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const threshold = options.threshold ?? 0.1;
    const rootMargin = options.rootMargin ?? '0px 0px -50px 0px';
    const root = options.root ?? null;

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once visible, stop observing (animation plays once)
                    observer.unobserve(element);
                }
            },
            {
                threshold,
                rootMargin,
                root
            }
        );

        observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, [threshold, rootMargin, root]);

    return [ref, isVisible];
};

/**
 * Hook for multiple elements with staggered animations
 * @param {number} count - Number of elements
 * @param {Object} options - Intersection Observer options
 * @returns {Array} - Array of [ref, isVisible, delay] tuples
 */
export const useStaggeredAnimation = (count, options = {}) => {
    const refs = useRef([]);
    const [visibleStates, setVisibleStates] = useState(Array(count).fill(false));

    const threshold = options.threshold ?? 0.1;
    const rootMargin = options.rootMargin ?? '0px 0px -50px 0px';
    const root = options.root ?? null;
    const staggerDelay = options.staggerDelay ?? 100;

    useEffect(() => {
        const elements = refs.current.slice(0, count);

        const observers = elements.map((element, index) => {
            if (!element) return null;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisibleStates(prev => {
                            const newState = [...prev];
                            newState[index] = true;
                            return newState;
                        });
                        observer.unobserve(element);
                    }
                },
                {
                    threshold,
                    rootMargin,
                    root
                }
            );

            observer.observe(element);
            return observer;
        });

        return () => {
            observers.forEach((observer, index) => {
                const el = elements[index];
                if (observer && el) {
                    observer.unobserve(el);
                }
            });
        };
    }, [count, threshold, rootMargin, root]);

    return Array.from({ length: count }, (_, index) => ({
        ref: (el) => { refs.current[index] = el; },
        isVisible: visibleStates[index],
        delay: index * staggerDelay
    }));
};

export default useScrollAnimation;
