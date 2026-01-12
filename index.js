const axios = require('axios');

module.exports = async (req, res) => {
    // CORS bypass aur Headers set karna
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const { prompt } = req.query;

    if (!prompt) {
        return res.status(400).json({
            status: false,
            error: "Prompt missing! Example: ?prompt=hello",
            developer: "DEVELOPER AKASHHACKER"
        });
    }

    try {
        // Original worker API call
        const response = await axios.get(`https://gpt-3-5.apis-bj-devs.workers.dev/?prompt=${encodeURIComponent(prompt)}`);
        
        // Data extraction
        const result = response.data.content || response.data;

        // Success response
        res.status(200).json({
            status: true,
            developer: "DEVELOPER AKASHHACKER",
            result: result
        });

    } catch (error) {
        // Detailed error for debugging
        res.status(500).json({
            status: false,
            error: "Worker API is not responding. Please try again later.",
            developer: "DEVELOPER AKASHHACKER"
        });
    }
};
