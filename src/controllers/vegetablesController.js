const Vegetables = require('../models/Vegetables');

const getDictionary = async (req, res) => {
    try {
        const vegetables = await Vegetables.find().select("_id name scientific_name famili image consumable_part")

        return res.status(200).json({ error: false, message: "Dictionaries fetched successfully", data: vegetables })
    } catch (error) {
        return res.status(500).json({ error: true, msg: 'Something went wrong, try again later' })
    }
}

const postDictionary = async (req, res) => {
    const {
        name,
        scientific_name,
        famili,
        consumable_part,
        image,
        origin,
        brief_desc,
    } = req.body;
    
    try {
        const vegetables = new Vegetables({
            name: name,
            scientific_name: scientific_name,
            famili: famili,
            consumable_part: consumable_part,
            image: image,
            origin: origin,
            brief_desc: brief_desc,
        })
        vegetables.save();
        return res.status(200).json({ error: false, msg: 'Succes added data',  vegetables})
    } catch (err) {
        return res.status(500).json({ error: true, msg: 'Something went wrong, try again later' })
    }
}

const getDictionaryDetails = async (req, res) => {
    const vegetablesId = req.params.id;
    try {
        const vegetables = await Vegetables.findOne({ _id : vegetablesId });

        if(!vegetables){
            return res.status(500).json({ error: false, message: 'Data not found!' })
        }
        return res.status(200).json({ error: false, message: "Dictionary details fetched successfully", data: vegetables })
    } catch (error) {
        return res.status(500).json({ error: true, message: 'Something went wrong, try again later or check the id that have been passed' })
    }
}

module.exports = {
    getDictionary,
    postDictionary,
    getDictionaryDetails,
}