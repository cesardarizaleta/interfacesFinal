const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');
const { config } = require('../config/config');

class GoogleDriveService {
  constructor() {
    // Use OAuth2 instead of service account
    this.oAuth2Client = new google.auth.OAuth2(
      config.googleDrive.clientId,
      config.googleDrive.clientSecret,
      config.googleDrive.redirectUri
    );

    // Set credentials if refresh token exists
    if (config.googleDrive.refreshToken) {
      this.oAuth2Client.setCredentials({
        refresh_token: config.googleDrive.refreshToken,
      });
    }

    this.drive = google.drive({ version: 'v3', auth: this.oAuth2Client });
    this.parentFolderId = config.googleDrive.parentFolderId;
  }

  // Method to generate authorization URL for initial setup
  generateAuthUrl() {
    return this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/drive'],
    });
  }

  // Method to get tokens from authorization code
  async getTokensFromCode(code) {
    const { tokens } = await this.oAuth2Client.getToken(code);
    return tokens;
  }

  async findOrCreateFolder(folderName, parentId = this.parentFolderId) {
    try {
      // Search for existing folder
      const response = await this.drive.files.list({
        q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and '${parentId}' in parents and trashed=false`,
        fields: 'files(id, name)',
      });

      if (response.data.files.length > 0) {
        logger.info(`Folder '${folderName}' already exists with ID: ${response.data.files[0].id}`);
        return response.data.files[0].id;
      }

      // Create new folder
      const folderMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentId],
      };

      const folder = await this.drive.files.create({
        resource: folderMetadata,
        fields: 'id',
      });

      logger.info(`Created new folder '${folderName}' with ID: ${folder.data.id}`);
      return folder.data.id;
    } catch (error) {
      logger.error('Error in findOrCreateFolder:', error);
      throw error;
    }
  }

  async uploadFile(userId, fileBuffer, fileName, mimeType) {
    try {
      // Create user folder if it doesn't exist
      const userFolderName = `fuentes-usuario-${userId}`;
      const userFolderId = await this.findOrCreateFolder(userFolderName);

      // Upload file to user folder
      const fileMetadata = {
        name: fileName,
        parents: [userFolderId],
      };

      // Convert buffer to readable stream
      const { Readable } = require('stream');
      const stream = new Readable();
      stream.push(fileBuffer);
      stream.push(null); // End the stream

      const media = {
        mimeType: mimeType,
        body: stream,
      };

      const file = await this.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id, name, webContentLink',
      });

      // Make file public
      await this.drive.permissions.create({
        fileId: file.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      // Get direct download URL
      const directUrl = `https://www.googleapis.com/drive/v3/files/${file.data.id}?alt=media`;

      logger.info(`File '${fileName}' uploaded successfully for user ${userId}. URL: ${directUrl}`);

      return {
        fileId: file.data.id,
        fileName: file.data.name,
        downloadUrl: directUrl,
        folderId: userFolderId,
      };
    } catch (error) {
      logger.error('Error uploading file to Google Drive:', error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.drive.files.delete({
        fileId: fileId,
      });
      logger.info(`File with ID ${fileId} deleted from Google Drive`);
    } catch (error) {
      logger.error('Error deleting file from Google Drive:', error);
      throw error;
    }
  }
}

module.exports = { GoogleDriveService };