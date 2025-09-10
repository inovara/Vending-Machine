import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Inovara - Enterprise Technology Solutions & Digital Transformation | AI-Powered Innovation",
  description = "Leading enterprise technology company delivering AI-powered solutions, digital transformation, and mission-critical software for Fortune 500 companies. Trusted by 500+ enterprises worldwide.",
  keywords = "enterprise technology, digital transformation, AI solutions, software development, Fortune 500, business automation, cloud solutions, technology consulting, innovation, enterprise software",
  canonicalUrl = "https://inovara.com",
  ogImage = "https://inovara.com/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('name', 'author', 'Inovara Corporation');
    
    // Update Open Graph tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:type', ogType);
    updateMetaTag('property', 'og:url', canonicalUrl);
    
    // Update Twitter tags
    updateMetaTag('property', 'twitter:title', title);
    updateMetaTag('property', 'twitter:description', description);
    updateMetaTag('property', 'twitter:image', ogImage);
    updateMetaTag('property', 'twitter:card', twitterCard);
    
    // Update canonical URL
    updateCanonicalUrl(canonicalUrl);
    
    // Add structured data
    if (structuredData) {
      addStructuredData(structuredData);
    }
    
    // Update language and robots
    updateMetaTag('name', 'language', 'English');
    updateMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, twitterCard, structuredData]);

  return null;
};

const updateMetaTag = (attribute: string, name: string, content: string) => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
};

const updateCanonicalUrl = (url: string) => {
  let element = document.querySelector('link[rel="canonical"]');
  
  if (element) {
    element.setAttribute('href', url);
  } else {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', url);
    document.head.appendChild(element);
  }
};

const addStructuredData = (data: object) => {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

export default SEOHead;
