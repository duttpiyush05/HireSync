const clientModel = require('../models/client_model')

module.exports.createClient = async ({
  firstname, lastname, email, password, contactno, gender
}) =>
{
  if(!firstname || !email || !password || !contactno || !gender)
  {
    throw new Error("All Fields are Required")
  }

  const client = await clientModel.create({
    fullname : {
      firstname,
      lastname
    },
    email,
    password,
    contactno,
    gender
  })

  return client
}