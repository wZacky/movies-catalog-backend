import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  catalog: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    }
  ]
})

export default mongoose.model('User', userSchema);