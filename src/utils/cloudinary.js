/**
 * Optimizes a Cloudinary image URL by injecting quality and format parameters.
 * 
 * @param {string} url - The original Cloudinary URL
 * @param {number} width - The target width for the image (default 600px for cards)
 * @returns {string} The optimized Cloudinary URL
 */
export const optimizeCloudinaryUrl = (url, width = 600) => {
  if (!url || typeof url !== 'string') return url;
  
  // Check if it's actually a Cloudinary URL
  if (!url.includes('res.cloudinary.com')) return url;
  
  // If it already has transformations (contains /upload/ followed by lowercase letters/numbers and underscores), 
  // we might not want to double-inject, but typically it's safe to replace /upload/ with /upload/f_auto,q_auto...
  
  // Find the upload path segment
  const uploadToken = '/upload/';
  const uploadIndex = url.indexOf(uploadToken);
  
  if (uploadIndex === -1) return url;
  
  // Split the URL and inject our optimization parameters
  const baseUrl = url.substring(0, uploadIndex + uploadToken.length);
  const remainingUrl = url.substring(uploadIndex + uploadToken.length);
  
  // Add f_auto (auto format like webp/avif), q_auto (auto quality compression), 
  // c_limit (limit width, never scale up), and w_{width}
  const optimizations = `f_auto,q_auto,c_limit,w_${width}/`;
  
  // Check if we already injected it (to prevent double injection if called twice)
  if (remainingUrl.startsWith('f_auto') || remainingUrl.startsWith('q_auto')) {
      return url;
  }
  
  return `${baseUrl}${optimizations}${remainingUrl}`;
};
