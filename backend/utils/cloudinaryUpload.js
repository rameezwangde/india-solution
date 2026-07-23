const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');
const sharp = require('sharp');

const uploadImageBuffer = async (fileBuffer) => {
  if (!fileBuffer) {
    throw new Error('Missing file buffer');
  }
  
  try {
    const processedBuffer = await sharp(fileBuffer)
      .webp({ quality: 80 })
      .toBuffer();

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'india-solutions-crm/products',
          format: 'webp',
          width: 1600,
          crop: 'limit'
        },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result.secure_url,
            publicId: result.public_id
          });
        }
      );

      streamifier.createReadStream(processedBuffer).pipe(uploadStream);
    });
  } catch (error) {
    throw new Error(`Image processing failed: ${error.message}`);
  }
};

const deleteCloudinaryImage = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary deletion error:', error.message);
  }
};

module.exports = { uploadImageBuffer, deleteCloudinaryImage };
