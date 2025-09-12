const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

class ImgBBService {
  constructor() {
    this.apiKey = '0a9bc63df5f3ead331cea9bc4e08893c';
    this.baseUrl = 'https://api.imgbb.com/1/upload';
  }

  async uploadImage(fileBuffer, filename = null, expiration = null) {
    try {
      const formData = new FormData();

      // Add the API key
      formData.append('key', this.apiKey);

      // Add the image buffer
      formData.append('image', fileBuffer, {
        filename: filename || 'image.jpg',
        contentType: 'image/jpeg'
      });

      // Add optional expiration
      if (expiration) {
        formData.append('expiration', expiration.toString());
      }

      // Make the request to ImgBB
      const response = await axios.post(this.baseUrl, formData, {
        headers: {
          ...formData.getHeaders(),
        },
        timeout: 30000, // 30 seconds timeout
      });

      if (response.data && response.data.success) {
        return {
          success: true,
          data: {
            id: response.data.data.id,
            title: response.data.data.title,
            url: response.data.data.url,
            displayUrl: response.data.data.display_url,
            thumbUrl: response.data.data.thumb?.url || response.data.data.url,
            mediumUrl: response.data.data.medium?.url || response.data.data.url,
            deleteUrl: response.data.data.delete_url,
            width: parseInt(response.data.data.width),
            height: parseInt(response.data.data.height),
            size: parseInt(response.data.data.size),
            mime: response.data.data.image?.mime || 'image/jpeg',
            filename: response.data.data.image?.filename || filename,
            uploadedAt: new Date().toISOString()
          }
        };
      } else {
        throw new Error('ImgBB upload failed');
      }

    } catch (error) {
      console.error('ImgBB upload error:', error.response?.data || error.message);
      throw new Error(`Failed to upload image to ImgBB: ${error.message}`);
    }
  }

  async deleteImage(deleteUrl) {
    try {
      // ImgBB delete URLs are direct links that can be accessed via GET
      const response = await axios.get(deleteUrl);
      return response.data;
    } catch (error) {
      console.error('ImgBB delete error:', error.response?.data || error.message);
      throw new Error(`Failed to delete image from ImgBB: ${error.message}`);
    }
  }
}

module.exports = ImgBBService;