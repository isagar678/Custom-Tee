
require('dotenv').config({ path: '../.env' });


const express = require('express');
const axios = require('axios');
const sharp = require('sharp');
const { Buffer } = require('buffer'); // Node.js core module for Buffer handling
const cors = require('cors');

const app = express();

// Your environment configuration, similar to Django settings
app.use(express.static('client/build'));
app.use(express.json());
app.use(cors());
const VISIONARY_LLM_SECRET_KEY = process.env.VISIONARY_LLM_SECRET_KEY;

// Function to generate an image
async function generateImage(prompt) {
    console.log(VISIONARY_LLM_SECRET_KEY)
    try {
        // API URL and headers
        const url = "https://Visionary-LLM.proxy-production.allthingsdev.co/generate";
        const headers = {
            'x-apihub-key': VISIONARY_LLM_SECRET_KEY,
            'x-apihub-host': 'Visionary-LLM.allthingsdev.co',
            'x-apihub-endpoint': 'a3a236af-e072-405a-8c4c-e540af401c08'
        };

        // Payload
        const params = { prompt: prompt };

        // Make the API request
        const response = await axios.get(url, { headers: headers, params: params });

        // Check if request was successful
        console.log("API Response Status:", response.status);
        console.log("API Response Data:", response.data);

        if (response.status === 200) {
            const data = response.data;
            const imageUrl = data.img_url;  // Adjust based on actual key returned by API

            // Download and encode the image
            if (imageUrl) {
                const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                if (imageResponse.status === 200) {
                    // Use Sharp for image processing
                    const imgBuffer = Buffer.from(imageResponse.data, 'binary');
                    const image = await sharp(imgBuffer).png().toBuffer();
                    const imgBase64 = image.toString('base64');

                    return imgBase64;
                } else {
                    console.error("Failed to download image from URL:", imageUrl);
                    return null;
                }
            } else {
                console.error("No image URL returned by the API.");
                return null;
            }
        } else {
            console.error("Unexpected response status:", response.status);
            return null;
        }
    } catch (error) {
        console.error(`Error generating image: ${error.message}`);
        return null;
    }
}
// API route to call the generateImage function
app.post('/api/generate-image/', async (req, res) => {
    console.log('Received request:', req.body);

    const { prompt } = req.body;  // Changed to req.body for POST requests

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    const imgBase64 = await generateImage(prompt);

    if (imgBase64) {
        res.json({ image: imgBase64 });
    } else {
        res.status(500).json({ error: "Failed to generate image" });
    }
});
app.get('/',(req,res)=>{
    return res.send('hello from server');
})
// Start the Express server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(VISIONARY_LLM_SECRET_KEY)

    console.log(`Server is running on port ${PORT}`);
});
