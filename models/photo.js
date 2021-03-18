const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  img: {type: String, required: [true, 'Add the picture'] }
});

module.exports = mongoose.model('Photo', photoSchema);
