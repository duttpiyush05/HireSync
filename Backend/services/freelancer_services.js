const freelancerModel = require('../models/fl_model')

module.exports.createFreelancer = async ({
  firstname, lastname, email, password, contactno, gender
})=>
{
  if(!firstname || !email || !password || !contactno || !gender)
  {
    throw new Error("All Fields are Required")
  }

  const freelancer = freelancerModel.create({
    fullname : {
      firstname,
      lastname
    },
    email,
    password,
    contactno,
    gender
  })

  return freelancer
}