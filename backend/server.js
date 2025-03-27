const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request body
app.use(morgan('dev')); // HTTP request logger

// Create a 'submissions' directory if it doesn't exist
const submissionsDir = path.join(__dirname, 'submissions');
if (!fs.existsSync(submissionsDir)) {
  fs.mkdirSync(submissionsDir);
}

// Route to handle form submissions
app.post('/api/submit', (req, res) => {
  try {
    const formData = req.body;
    
    // Generate a unique filename using timestamp and user's name (if available)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const userName = formData.name ? formData.name.replace(/\s+/g, '_') : 'anonymous';
    const filename = `${timestamp}_${userName}.json`;
    
    // Save the submission to a file
    const filePath = path.join(submissionsDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(formData, null, 2));
    
    console.log(`Form submission saved: ${filename}`);
    
    // Send success response
    res.status(201).json({ 
      success: true, 
      message: 'Form submission received and saved successfully',
      filename
    });
  } catch (error) {
    console.error('Error saving form submission:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your submission'
    });
  }
});

// Route to get all submissions (for admin purposes)
app.get('/api/submissions', (req, res) => {
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
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Submissions will be saved to: ${submissionsDir}`);
});