const Product = require('../models/Product');
const { uploadImageBuffer, deleteCloudinaryImage } = require('../utils/cloudinaryUpload');

exports.uploadProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file supplied' });
    }

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: 'Invalid ObjectId' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const newImageData = await uploadImageBuffer(req.file.buffer);

    const oldPublicId = product.image && product.image.publicId;

    product.image = {
      url: newImageData.url,
      publicId: newImageData.publicId
    };

    await product.save();

    if (oldPublicId) {
      await deleteCloudinaryImage(oldPublicId);
    }

    res.status(200).json({
      success: true,
      message: 'Product image uploaded successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Image upload failed. ' + error.message });
  }
};

exports.deleteProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: 'Invalid ObjectId' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (!product.image || !product.image.publicId) {
      return res.status(200).json({
        success: true,
        message: 'No image found to remove',
        product
      });
    }

    const oldPublicId = product.image.publicId;

    product.image = { url: '', publicId: '' };
    await product.save();

    await deleteCloudinaryImage(oldPublicId);

    res.status(200).json({
      success: true,
      message: 'Product image removed successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Image removal failed. ' + error.message });
  }
};
