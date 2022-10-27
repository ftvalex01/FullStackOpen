const mongoose = require('mongoose')



if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://ftvalex:${password}@redone.rkdssxs.mongodb.net/phonebook`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person',personSchema)

mongoose
  .connect(url)
if(process.argv.length > 4){
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save()
    .then(() => {
      console.log(`añadido ${person.name} number:${person.number} to phonebook`)
      mongoose.connection.close()
    })
    .catch((error) => console.log(error))
}else{
  console.log('Phonebook:')
  Person.find({})
    .then((persons) => {
      persons.map((person) => {
        console.log(person.name,person.number)
      })
      mongoose.connection.close()
    })
    .catch((error) => console.log(error))
}