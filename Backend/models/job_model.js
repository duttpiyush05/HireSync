const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  title : {
    type : String,
    required: true,
    minlength : [5, "Title must be atleast of 5 character"]
  },
  category : {
    type: String,
    enum : ['Web Development', 'Mobile Development','UI/UX Design','Graphic Design','Content Writing','Digital Marketing','AI/ML','Web Development','DevOps','Cybersecurity'],
    required:true,
  },
  description : {
    type : String,
    required:true,
    minlength : [10, "Description must be clear"]
  },

  skills : {
    type : [String],
    required : true
  },

  budget : {
    type: {
      type: String,
      require : true,
      enum : ['fixed', 'hourly']
    },
    minbudget : {
      type : String,
      required:true,
    },
    maxbudget : {
      type : String,
      required:true,
    },
    duration : {
      type : String,
      required:true,
      enum : ['1-3 Months','3-6 Months','8-12 Months','1 Year+']
    },
    xplevel : {
      type : String,
      required:true,
      enum : ['Entry','Intermediate','Expert']
    }
  },
  client : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Client',
  }  
})

const jobModel = mongoose.model('jobModel', jobSchema)
module.exports = jobModel