const axios = require('axios');

module.exports = async (req, res) => {
    // Headers for standard API response
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const { prompt } = req.query;

    if (!prompt) {
        return res.status(400).json({
            status: false,
            message: "Prompt missing! Usage: /api/meta?prompt=hello",
            developer: "DEVELOPER AKASHHACKER"
        });
    }

    try {
        // External API calling
        const response = await axios.get(`https://gpt-3-5.apis-bj-devs.workers.dev/?prompt=${encodeURIComponent(prompt)}`);
        
        // Data extraction safely
        const aiData = response.data.content || response.data;

        res.status(200).json({
            status: true,
            developer: "DEVELOPER AKASHHACKER",
            result: aiData
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "API Timeout ya Server error.",
            developer: "DEVELOPER AKASHHACKER"
        });
    }
};
