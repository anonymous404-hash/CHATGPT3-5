const axios = require('axios');

module.exports = async (req, res) => {
    // Headers setup
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    // Query se prompt lena
    const { prompt } = req.query;

    if (!prompt) {
        return res.status(400).json({
            status: false,
            message: "Prompt missing! Example: /api?prompt=hello",
            developer: "DEVELOPER AKASHHACKER"
        });
    }

    try {
        // Direct worker call
        const response = await axios.get(`https://gpt-3-5.apis-bj-devs.workers.dev/?prompt=${encodeURIComponent(prompt)}`);
        
        // Data clean up
        const result = response.data.content || response.data;

        res.status(200).json({
            status: true,
            developer: "DEVELOPER AKASHHACKER",
            result: result
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal Server Error or Worker Timeout",
            developer: "DEVELOPER AKASHHACKER"
        });
    }
};
