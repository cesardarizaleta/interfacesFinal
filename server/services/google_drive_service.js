const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');

class GoogleDriveService {
  constructor() {
    this.credentials = require('../config/google-drive-credentials.json');
    this.auth = new google.auth.GoogleAuth({
      credentials: this.credentials,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    this.drive = google.drive({ version: 'v3', auth: this.auth });
    this.parentFolderId = process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID || '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs'; // Default to a placeholder, user needs to set this
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

      const media = {
        mimeType: mimeType,
        body: fileBuffer,
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