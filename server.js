const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
require('dotenv').config();

const PORT = 3000;
const accessToken = process.env.DELHIVERY_TOKEN;

// Enable CORS for development
app.use(cors({
    origin: "*",
    methods: ['GET']
}));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Endpoint to fetch order details
app.get('/api/track/:awb', cors(), async (req, res) => {
    console.log(req.params.awb);
    const awbNumber = req.params.awb;
    console.log(awbNumber);
    // facility-order-tracking-c6vgh2265-harshs-projects-eceafdcd.vercel.app
    const url = `https://track.delhivery.com/api/v1/packages/json/?waybill=${awbNumber}`;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        console.log("first")
        condole.log("the second part is also solved.....Please check")
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Delhivery API' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
