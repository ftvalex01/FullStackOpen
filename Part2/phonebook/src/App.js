import { useState } from "react";
import { Filter } from "./component/Filter";
import { PersonForm } from "./component/PersonForm";
import { Persons } from "./component/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas",id:0 },
    { name: "Oblack",id:1 },
    { name: "Penelope",id:2 }
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone,setNewPhone] = useState('');
  const [search,setSearch] = useState('')

  const handleInputName = (event) => {
    event.preventDefault();
    const name = event.target.value
    setNewName(name);
  };
  const handleInputPhone = (event) => {
    event.preventDefault();
    const phone = event.target.value
    setNewPhone(phone);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1,
    };
 
    if(persons.find((person)=>person.name === personObject.name)){
      alert(`${newName} is already added to phonebook`)
    }else if(newName === ""){
      alert("please entry a name")
    }else{
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewPhone('')
    }
  };

  
  const handleInputSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value)
    const filteredPersons = () => persons.filter(person => person.name.toLowerCase().match(search.toLowerCase()))
    setPersons(filteredPersons)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter value={search} onChange={handleInputSearch}/>
      </div>

      <h2>Add a new</h2>
      <PersonForm 
      handleSubmit={handleSubmit} 
      newName={newName} 
      newPhone={newPhone} 
      handleInputName={handleInputName} 
      handleInputPhone={handleInputPhone}

      />
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  );
};

export default App;
