const axios = require('axios');
const fs = require('fs');
const { config } = require('../config/config');

class VimeoService {
  constructor() {
    this.clientId = config.vimeo.clientId;
    this.clientSecret = config.vimeo.clientSecret;
    this.accessToken = config.vimeo.accessToken;
    this.baseUrl = config.vimeo.baseUrl;
  }

  async uploadVideo(fileBuffer, filename = null, title = 'Untitled', description = 'Video uploaded to gallery') {
    try {
      // Use the resumable upload approach which doesn't require user-specific tokens
      const fileSize = fileBuffer.length;

      // Step 1: Create upload ticket
      const ticketResponse = await axios.post(`${this.baseUrl}/me/videos`, {
        upload: {
          approach: 'post',
          size: fileSize.toString()
        },
        name: title,
        description: description,
        privacy: {
          view: 'anybody'
        }
      }, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.vimeo.*+json;version=3.4'
        }
      });

      const videoUri = ticketResponse.data.uri;
      const uploadLink = ticketResponse.data.upload.upload_link;

      if (!uploadLink) {
        throw new Error('No upload link received from Vimeo');
      }

      // Step 2: Upload the file using POST to the upload link
      const uploadResponse = await axios.post(uploadLink, fileBuffer, {
        headers: {
          'Content-Type': 'video/mp4',
          'Accept': 'application/vnd.vimeo.*+json;version=3.4'
        },
        timeout: 300000, // 5 minutes timeout for large files
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      });

      // Step 3: Wait for transcoding to complete
      await this._waitForTranscoding(videoUri);

      // Step 4: Get the final video details
      const finalResponse = await axios.get(`${this.baseUrl}${videoUri}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/vnd.vimeo.*+json;version=3.4'
        }
      });

      return {
        success: true,
        data: {
          id: finalResponse.data.uri.split('/').pop(),
          uri: finalResponse.data.uri,
          url: finalResponse.data.link,
          embedUrl: `https://player.vimeo.com/video/${finalResponse.data.uri.split('/').pop()}`,
          title: finalResponse.data.name,
          description: finalResponse.data.description,
          duration: finalResponse.data.duration,
          width: finalResponse.data.width,
          height: finalResponse.data.height,
          uploadedAt: new Date().toISOString()
        }
      };

    } catch (error) {
      console.error('Vimeo upload error:', error.response?.data || error.message);

      // Handle specific Vimeo errors
      if (error.response?.status === 401) {
        throw new Error('Vimeo Authentication Failed: Check your access token');
      } else if (error.response?.status === 403) {
        if (error.response?.data?.error_code === 8002) {
          throw new Error('Vimeo Upload Permission Required: The access token needs upload permissions. Please regenerate the token with upload scope.');
        }
        throw new Error('Vimeo Access Forbidden: Check upload permissions for your app');
      } else if (error.response?.status === 429) {
        throw new Error('Vimeo Rate Limit Exceeded: Too many requests');
      }

      throw new Error(`Failed to upload video to Vimeo: ${error.message}`);
    }
  }

  async _waitForTranscoding(videoUri, maxAttempts = 60) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await axios.get(`${this.baseUrl}${videoUri}?fields=transcode.status`, {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Accept': 'application/vnd.vimeo.*+json;version=3.4'
          }
        });

        const status = response.data.transcode?.status;

        if (status === 'complete') {
          return true;
        } else if (status === 'error') {
          throw new Error('Video transcoding failed');
        }

        // Wait 5 seconds before checking again
        await new Promise(resolve => setTimeout(resolve, 5000));

      } catch (error) {
        if (attempt === maxAttempts - 1) {
          throw new Error('Timeout waiting for video transcoding');
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }

  async getVideoInfo(videoId) {
    try {
      const response = await axios.get(`${this.baseUrl}/videos/${videoId}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/vnd.vimeo.*+json;version=3.4'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Vimeo get video info error:', error.response?.data || error.message);
      throw new Error(`Failed to get video info from Vimeo: ${error.message}`);
    }
  }

  async deleteVideo(videoId) {
    try {
      await axios.delete(`${this.baseUrl}/videos/${videoId}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/vnd.vimeo.*+json;version=3.4'
        }
      });

      return { success: true };
    } catch (error) {
      console.error('Vimeo delete video error:', error.response?.data || error.message);
      throw new Error(`Failed to delete video from Vimeo: ${error.message}`);
    }
  }
}

module.exports = VimeoService;