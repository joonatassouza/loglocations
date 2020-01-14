const Location = require('../models/Location');

module.exports = {
    async index(req, res) {
        try {
            const locations = await Location.find().sort('-createdAt');

            return res.json(locations);
        } catch (e) {
            console.log('error grave allLogs');
            console.log(e.message);
            return res.status(500).json(e.message)
        }
    },

    async create(req, res) {
        try {
            let location = JSON.parse(req.query.locations);

            if (location) {
                const locationDb = await Location.findOne({ timestamp: location.timestamp });

                if (!locationDb) {
                    location = await Location.create(location);
                }

                req.io.emit('location', location);
            }

            return res.json(location);
        } catch (e) {
            console.log('error grave log');
            console.log(e.message);
            return res.status(500).json(e.message)
        }
    },

    async delete(req, res) {
        try {
            await Location.remove({});

            req.io.emit('clearlocation', true);

            return res.json({ ok: true });
        } catch (e) {
            console.log('error grave clearlog');
            console.log(e.message);
            return res.status(500).json(e.message)
        }
    }
};