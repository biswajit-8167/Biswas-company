const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: {
		type: String,
		enum: ['admin', 'accountant', 'student'],
		required: true
	},
	profilePicture: { type: String, default: "" },
	assignedBatches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }],
	batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
	payments: [{
		paymentDate: { type: Date, default: Date.now },
		amount: { type: Number, required: true },
		image: { type: String, required: true },
		status: {
			type: String,
			enum: ['pending', 'approved', 'rejected'],
			default: 'pending'
		},
	}],
	dueAmount: { type: Number, default: 0 },
});


const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;