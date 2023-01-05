const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  left: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Node',
  },
  right: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Node',
  },
});

module.exports = mongoose.model('Node', nodeSchema);