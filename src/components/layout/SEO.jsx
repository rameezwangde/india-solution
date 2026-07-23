import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const siteName = "India Solution Events";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = "India Solution provides premium event management, wedding planning, corporate events, and staging across Bengaluru and India.";
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || "https://www.india-solution.com/"} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url || "https://www.india-solution.com/"} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      {image && <meta property="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
