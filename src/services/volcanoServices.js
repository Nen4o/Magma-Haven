const Volcano = require('../models/Volcano');

const createVolcano = (volcanoData) => {
    return Volcano.create(volcanoData);
}

const getAllVolcanos = () => {
    return Volcano.find();
}

const getOneVolcanoById = (volcanoId) => {
    return Volcano.findById(volcanoId);
}

const getVolcanoByIdAndUpdate = (volcanoId, updateData) => {
    return Volcano.findByIdAndUpdate(volcanoId, updateData, { runValidators: true });
}

const deleteVolcanoById = (volcanoId) => {
    return Volcano.findByIdAndDelete(volcanoId);
}


module.exports = {
    createVolcano,
    getAllVolcanos,
    getOneVolcanoById,
    getVolcanoByIdAndUpdate,
    deleteVolcanoById
}