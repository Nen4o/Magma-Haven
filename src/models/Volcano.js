const mongoose = require('mongoose');
const User = require('./User');

const volcanoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
    },
    location: {
        type: String,
        required: true,
        minLength: 3,
    },
    elevation: {
        type: Number,
        required: true,
        min: 0
    },
    lastEruption: {
        type: Number,
        required: true,
        min: 0,
        max: 2024,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?:\/\//,
    },
    typeVolcano: {
        type: String,
        required: true,
        enum: ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Startovolcanoes', 'Shield']
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
    },
    voteList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Volcano = mongoose.model('Volcano', volcanoSchema);

module.exports = Volcano;