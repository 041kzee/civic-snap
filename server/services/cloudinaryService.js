const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

/**
 * Uploads a file buffer to Cloudinary
 * @param {Buffer} fileBuffer 
 * @param {string} folder 
 * @returns {Promise<{ photoUrl: string, thumbnailUrl: string }>}
 */
const uploadImage = (fileBuffer, folder = 'civicsnap/issues') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) return reject(error);

        // Generate thumbnail URL using Cloudinary transformations
        const thumbnailUrl = cloudinary.url(result.public_id, {
          width: 300,
          crop: 'scale',
          secure: true,
        });

        resolve({
          photoUrl: result.secure_url,
          thumbnailUrl,
        });
      }
    );

    const stream = Readable.from(fileBuffer);
    stream.pipe(uploadStream);
  });
};

module.exports = { uploadImage };
