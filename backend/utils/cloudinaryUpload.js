const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const uploadImageBuffer = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) {
      return reject(new Error('Missing file buffer'));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'india-solutions-crm/products',
        quality: 'auto',
        fetch_format: 'auto',
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

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
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
