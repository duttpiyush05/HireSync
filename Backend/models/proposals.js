const mongoose = require('mongoose')

const proposalSchema = new mongoose.Schema({
  coverLetter: {
    type: String,
    required: true,
    minlength: [10, "Enter sufficient information"]
  },
  portfolio: {
    filename: String,
    fileType: String
  },
  askingAmt :{
    type: Number, 
    required : true,
  },
  estCompletion: {
    type: String,
    enum: ['Less than 1 month', '1 - 3 months', '3 - 6 months', '6 - 9 months', 'More than 1 year']
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jobmodel',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clients',
    required: true
  },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'freelancers',
    required: true
  },
  platformFee: {
    type: String,
    required: true
  },
  receivingAmt: {
    type: String,
    required: true
  },
  status : {
    type : String,
    enum : ['pending', 'accepted', 'rejected','in_progress'],
    default: 'pending'
  }
}, {timestamps : true}
);

const Proposal = mongoose.model('proposals', proposalSchema);
module.exports = Proposal;