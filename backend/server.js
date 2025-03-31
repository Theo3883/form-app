const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
  
app.use(express.json()); // Parse JSON request body
app.use(morgan('dev')); // HTTP request logger

const oauth2Client = new google.auth.OAuth2(
  process.env.client_id,
  process.env.client_secret,
  process.env.redirect_uri
);

oauth2Client.setCredentials({ refresh_token:  process.env.refresh_token });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
});


async function uploadFile(fileName, jsonData) {
  try {
    // Convert JSON data to string and then to buffer
    const jsonString = JSON.stringify(jsonData, null, 2);
    
    const { Readable } = require('stream');
    const readableStream = new Readable();
    readableStream.push(jsonString);
    readableStream.push(null); 
    
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: 'application/json'
      },
      media: {
        mimeType: 'application/json',
        body: readableStream 
      }
    });
    
    console.log('File uploaded successfully to Google Drive:', response.data);
    return { 
      success: true, 
      fileId: response.data.id,
      fileName: response.data.name 
    };
  } catch (error) {
    console.error('Error uploading to Google Drive:', error.message);
    return { success: false, message: error.message };
  }
}

// Modify the submission handler to upload directly to Google Drive
app.post('/api/submit', async (req, res) => {
  try {
    const formData = req.body;
    
    // Generate a unique filename using timestamp and user's name (if available)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const userName = formData.name ? formData.name.replace(/\s+/g, '_') : 'anonymous';
    const filename = `${timestamp}_${userName}.json`;
    
    // Upload directly to Google Drive without saving locally
    const uploadResult = await uploadFile(filename, formData);
    
    console.log(`Form submission uploaded directly to Google Drive: ${filename}`);
    
    // Send success response
    res.status(201).json({ 
      success: true, 
      message: 'Form submission received and uploaded successfully',
      filename,
      driveUpload: uploadResult
    });
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your submission'
    });
  }
});

// Route to get all submissions (for admin purposes)
/*app.get('/api/submissions', (req, res) => {
  try {
    const files = fs.readdirSync(submissionsDir);
    res.status(200).json({ 
      success: true, 
      count: files.length,
      submissions: files
    });
  } catch (error) {
    console.error('Error retrieving submissions:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while retrieving submissions'
    });
  }
});*/

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});