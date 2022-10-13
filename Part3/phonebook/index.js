const express = require('express')
const app = express()

app.use(express.json())

let persons =[
    {id:1,name:"Arto Hellas",number:"040-123456"},
    {id:2,name:"Ada Lovelace",number:"39-44-5323523"},
    {id:3,name:"Dan Abramov",number:"12-43-234345"},
    {id:4,name:"Mary Poppendic",number:"39-23-6423122"}
]

app.get('/',(request,response)=>{
    response.send('<h1>Hello world</h1>')
})

app.get('/info',(request,response)=>{
    response.send(`<div>Phone book has info for ${persons.length} people</div><p>${new Date().toString()}</p>`)
})

app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person=>person.id === id)
    if(person){
        response.json(person)
    }else{
        response.status(404).end
    }
})

app.delete('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    const person = persons.filter(person=> person.id !== id)
    console.log("he sido borrado")
    response.status(204).end()
})

const generateId = () =>{
    const maxId = persons.length > 0
    ? Math.max(...persons.map(person => person.id))
    : 0
    return maxId + 1
}


app.post('/api/persons',(request,response)=>{
    const body = request.body

    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'missing name or number'
        })
    }else if(persons.find((person)=>person.name === body.name)){
        return response.status(400).json({
            error:'name is alredy exist'
        })
    }

   const person={
    id:generateId(),
    name:body.name,
    number:body.number
   }

   persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`server running on port ${PORT}`)