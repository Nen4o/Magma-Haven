const mongoose = require('mongoose');
const User = require('./User');

const volcanoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    elevation: {
        type: Number,
        required: true,
    },
    lastEruption: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    typeVolcano: {
        type: String,
        required: true,
        enum: ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Startovolcanoes', 'Shield']
    },
    description: {
        type: String,
        required: true,
    },
    voteList: {
        ref: 'User',
    },
    owner: {
        type: Schema.Types.ObjectId,
    }
})

const Volcano = mongoose.model('Volcano', volcanoSchema);

module.exports = Volcano;