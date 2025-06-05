import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		age: { type: Number, required: true },
		email: { type: String, required: true, unique: true },
		isSubscribed: { type: Boolean, default: false },
		passwordHash: { type: String, required: true },
		movieTimes: [
			{
				id: { type: String, required: true },
				currentTime: { type: Number, required: true },
			},
		],
	},
	{ timestamps: true }
)

export default mongoose.model('User', userSchema)
