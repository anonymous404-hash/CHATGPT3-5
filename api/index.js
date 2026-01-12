const axios = require('axios');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const { prompt } = req.query;

    if (!prompt) {
        return res.status(400).json({
            status: false,
            message: "Prompt missing! Example: ?prompt=hello",
            developer: "DEVELOPER AKASHHACKER"
        });
    }

    try {
        const response = await axios.get(`https://gpt-3-5.apis-bj-devs.workers.dev/?prompt=${encodeURIComponent(prompt)}`);
        
        // Yahan fix kiya hai: Sirf 'reply' wala text nikal rahe hain
        // Agar response.data.reply hai toh wo, nahi toh pura response.data
        const cleanReply = response.data.reply || (response.data.result ? response.data.result.reply : response.data);

        res.status(200).json({
            status: true,
            developer: "DEVELOPER AKASHHACKER",
            result: cleanReply
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Server error ya Worker down hai.",
            developer: "DEVELOPER AKASHHACKER"
        });
    }
};
