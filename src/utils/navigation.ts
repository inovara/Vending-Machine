// Navigation utility functions
export const navigateToSection = (sectionId: string) => {
  const element = document.querySelector(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

export const navigateToPage = (page: string) => {
  // For now, we'll navigate to sections since we don't have separate pages
  // In the future, this can be updated to use React Router or Next.js routing
  const pageMap: { [key: string]: string } = {
    'home': '#hero',
    'about': '#about',
    'services': '#services',
    'contact': '#contact',
    'case-studies': '#case-studies',
    'why-inovara': '#why-inovara',
    'enterprise': '#enterprise'
  };
  
  const targetSection = pageMap[page] || `#${page}`;
  navigateToSection(targetSection);
};

export const openExternalLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const scrollToTop = () => {
  window.scrollTo({ 
    top: 0, 
    behavior: 'smooth' 
  });
};
