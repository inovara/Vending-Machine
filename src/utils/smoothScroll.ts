// Smooth scrolling utility functions

export const smoothScrollTo = (elementId: string, offset: number = 80): void => {
  const element = document.querySelector(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  
  // Check if browser supports smooth scrolling
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  } else {
    // Fallback for older browsers
    const startPosition = window.pageYOffset;
    const distance = elementPosition - startPosition;
    const duration = 800; // 800ms duration
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  }
};

// Easing function for smooth animation
const easeInOutQuad = (t: number, b: number, c: number, d: number): number => {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

// Scroll to top function
export const scrollToTop = (): void => {
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } else {
    // Fallback for older browsers
    const startPosition = window.pageYOffset;
    const duration = 800;
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = easeInOutQuad(timeElapsed, startPosition, -startPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  }
};

// Scroll to next section
export const scrollToNextSection = (): void => {
  const currentSection = document.querySelector('section:target') || 
                        document.querySelector('section[style*="opacity: 1"]') ||
                        document.querySelector('section');
  
  if (currentSection) {
    const nextSection = currentSection.nextElementSibling as HTMLElement;
    if (nextSection && nextSection.tagName === 'SECTION') {
      smoothScrollTo(`#${nextSection.id}`, 80);
    }
  }
};
