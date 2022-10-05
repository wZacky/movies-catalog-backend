import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

export default mongoose.model('Movie', movieSchema);