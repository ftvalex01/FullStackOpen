import { useEffect, useState } from "react";
import { Filter } from "./component/Filter";
import { Notification } from "./component/Notification";
import { PersonForm } from "./component/PersonForm";
import { Persons } from "./component/Persons";
import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const updatePerson = persons.find(
      (person) => person.name.toLowerCase() === personObject.name.toLowerCase()
    );

    if (updatePerson && updatePerson.number === newNumber) {
      alert(`${newName} is already added to phonebook`);
    } else if (updatePerson && updatePerson.number !== newNumber) {
      const confirm = window.confirm(
        `${updatePerson.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirm) {
        const updatedPerson = { ...updatePerson, number: newNumber };
        personService
          .userUpdate(updatePerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatePerson.id ? person : response.data
              )
            );
            setMsg(`Updated number to ${response.data.name}`);
            setTimeout(() => {
              setMsg(null);
            }, 6000);
          })
          .catch((error) => {
            setMsg(
              `Information of ${updatedPerson.name} has already been removed from server.`
            );
            //After 3 sec, msg to null and reload the page
            setTimeout(() => {
              setMsg(null);

              window.location.reload();
            }, 6000);
          });
      }
    } else if (personObject.name === "") {
      setMsg(`please insert correct name`);
      setTimeout(() => {
        setMsg(null);

        window.location.reload();
      }, 6000);
    } else {
      personService
        .create(personObject)
        .then((response) => {
          console.log(response);
          setPersons(persons.concat(response.data));
          setMsg(`Added ${response.data.name} succesfully`);
          setTimeout(() => {
            setMsg(null);
          }, 6000);
        })
        .catch((error) => {
          console.log(error);
          setMsg(`An unexpected error happened.`);
          setTimeout(() => {
            setMsg(null);
          }, 6000);
        });
    }

  };

  const handleInputSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    const filteredPersons = () =>
      persons.filter((person) =>
        person.name.toLowerCase().match(search.toLowerCase())
      );
    setPersons(filteredPersons);
  };

  const handleClickDelete = (id) => {
    const personDelete = persons.find((person) => person.id === id);
    const confirm = window.confirm(`Are you sure delete ${personDelete.name}?`);

    if (confirm) {
      personService.userDelete(id);
      setMsg(`${personDelete.name} was succesfully deleted`);
      setTimeout(() => {
        setMsg(null);
      }, 3000);
      setPersons(persons.filter((person) => person.id !== personDelete.id));
    }
  };


  const handleInputName = (event) => {
    event.preventDefault();

    const name = event.target.value;
    setNewName(name);
  };
  const handleInputPhone = (event) => {
    event.preventDefault();
    const number = event.target.value;
    setNewNumber(number);
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={msg} />
      <div>
        <Filter value={search} onChange={handleInputSearch} />
      </div>

      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleInputName={handleInputName}
        handleInputPhone={handleInputPhone}
      />
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.map((element) => (
            <Persons person={element} handleClickDelete={handleClickDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
