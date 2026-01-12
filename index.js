const axios = require('axios');

module.exports = async (req, res) => {
    const { prompt } = req.query;

    if (!prompt) {
        return res.status(400).send("Error: Prompt dena zaroori hai bhai! Example: ?prompt=hello");
    }

    try {
        // Original worker ko call kiya
        const response = await axios.get(`https://gpt-3-5.apis-bj-devs.workers.dev/?prompt=${encodeURIComponent(prompt)}`);
        
        // Agar response content hai toh woh, nahi toh pura data
        const result = response.data.content || response.data;

        // Aapka Custom Response with Branding
        res.status(200).json({
            status: true,
            developer: "DEVELOPER AKASHHACKER",
            result: result
        });

    } catch (error) {
        res.status(500).send("API Error: Worker response nahi de raha.");
    }
};
