const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/PersonModel')
app.use(cors())
app.use(express.static('build'))
app.use(express.json())



let persons =[
    {id:1,name:"Arto Hellas",number:"040-123456"},
    {id:2,name:"Ada Lovelace",number:"39-44-5323523"},
    {id:3,name:"Dan Abramov",number:"12-43-234345"},
    {id:4,name:"Mary Poppendic",number:"39-23-6423122"}
]

/* morgan('tiny')
morgan(':method :url :status :res[content-lenth] - :response-time ms') */
app.use(morgan((tokens,req,res)=>{
    return[
        tokens.method(req,res),
        tokens.url(req,res),
        tokens.status(req,res),
        tokens.res(req,res,'content-length'), '-',
        tokens['response-time'](req,res),'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))
/* morgan.token('body',function(req,res){return req.headers['content-type']}) */




app.get('/',(request,response)=>{
    response.send('<h1>Hello world</h1>')
})

app.get('/api/persons',(request,response)=>{
    Person.find({}).then(persons=>{
        response.json(persons.map(person=>person.toJSON()))
    })
})

app.get('/info',(request,response)=>{
    Person.find({}).then(persons=>{
        response.send(`<div>Phone book has info for ${persons.length} people</div><p>${new Date().toString()}</p>`)
    })
})

app.get('/api/persons/:id',(request,response)=>{
    Person.findById(request.params.id).then(person=>{
        response.json(person)
    })
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

   const person=new Person({
    id:generateId(),
    name:body.name,
    number:body.number
   })

   person.save()
   .then(savedPerson => savedPerson.toJSON())
   .then(savedAndFormattedPerson => {
     response.json(savedAndFormattedPerson)
   })
   .catch(error => console.log(error))
})

const PORT = 3002
app.listen(PORT ,()=>{

    console.log(`server running on port ${PORT}`)
})