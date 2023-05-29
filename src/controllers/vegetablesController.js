const Vegetables = require('../models/Vegetables');

const getDictionary = async (req, res) => {
    try {
        const vegetables = await Vegetables.find({})
        return res.status(200).json({ success: true, nbHits: vegetables.length, vegetables })
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'Something went wrong, try again later' })
    }
}

const postDictionary = async (req, res) => {
    const {
        name,
        scientific_name,
        famili,
        consumeable_part,
        origin,
        information,
    } = req.body;
    
    try {
        const vegetables = new Vegetables({
            name: name,
            scientific_name: scientific_name,
            famili: famili,
            consumeable_part: consumeable_part,
            origin: origin,
            information: information,
        })
        vegetables.save();
        return res.status(200).json({ success: true, msg: 'Succes added data',  vegetables})
    } catch (err) {
        return res.status(500).json({ success: false, msg: 'Something went wrong, try again later' })
    }
}

module.exports = {
    getDictionary,
    postDictionary,
}