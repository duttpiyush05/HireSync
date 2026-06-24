const mongoose =require('mongoose')

const reviewRatingSchema = mongoose.Schema({
  contract : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'contracts'
  },
  reviewee : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'contracts'
  },
  reviewer : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'contracts'
  },
  rating : {
    type : Number
  },
  review : {
    type : String
  }
},{timestamps : true})

module.exports = mongoose.model('review_ratings', reviewRatingSchema)