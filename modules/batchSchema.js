const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    batchName: { type: String, required: true },
    batchImage: { type: String, required: true },
    googleSheetLink: { type: String, required: true },
    accountant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    coursePrice: { type: Number, required: true },
  });

  const BatchModel = mongoose.model('batch', batchSchema);
module.exports = BatchModel;