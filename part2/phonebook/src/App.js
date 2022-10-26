import { useState, useEffect } from 'react'
import service from './service/persons' 


const SuccessNotification = ({message}) => {
  const style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: '1px solid',
    padding: '10px'
  }

  if (message === null) {
    return null
  } else {
    return( 
    <div style={style}>
      {message}
    </div>
    )
  }
}

const ErrorNotification = ({message}) => {
  const style = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: '1px solid',
    padding: '10px'
  }
  if (message === null) {
    return null
  } else {
    return( 
    <div style={style}>
      {message}
    </div>
    )
  }
}


const Filter = ({handleFilter, pattern}) => {
  return (
    <div>
      filter shown with <input onChange={handleFilter} value={pattern} />
    </div>);
}

const PersonForm = ({handleSubmit, handleNameChange, handleNumberChange, newName, newNumber}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

const Persons = ({personsToShow, handleClick}) => {

  return (
    <ul>
      {personsToShow.map(person => 
      <li key={person.name}>
        {person.name} {person.number} &nbsp;
        <button onClick={() => handleClick(person.id, person.name)}>
        delete
        </button>
      </li>)}
    </ul>
  );
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [pattern, setPattern] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    service
    .getAll()
    .then(response =>{ 
      setPersons(response)
      setSuccessMessage('Get phonebook successfully!')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    })
  }, []);
  console.log('render', persons.length, 'people')

  const handleClick = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      service
      .deletePerson(id)
      .then(() => {
        setSuccessMessage(`Delete ${name} successfully!`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setTimeout(() => window.location.reload(), 3000)
      })
      .catch(error => {
        setErrorMessage('Fail to delete!!')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setTimeout(() => window.location.reload(), 3000)
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some(person => person.name === newName)){
      const person = persons.find(person => person.name === newName)
      if(window.confirm(
        `${newName} is already in the phonebook!   
        Would you like to replace the old number ${person.number} with the new number ${newNumber}?`)){
        const changedPerson = {...person, number: newNumber}
        service
        .update(person.id, changedPerson)
        .then(response => {
          setPersons(persons.map(p => p.id !== response.id ? p : response));
          setSuccessMessage(`${response.name}'s number is updated!`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Fail to update!`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }

    } else {
      const newPersonObj = {name: newName, number: newNumber};
      service
      .create(newPersonObj)
      .then(response => {
        setSuccessMessage(`${response.name}'s number is created!`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setPersons(persons.concat(response));
        setNewName('');
        setNewNumber('');
        setPattern('');
      })
      .catch(error => {
        setErrorMessage(`Fail to create!`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFilter = (e) => {
    setPattern(e.target.value.toLowerCase());
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().startsWith(pattern));

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter handleFilter={handleFilter} pattern={pattern}/>
      <h2>Add a new</h2>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleClick={handleClick} />
    </div>
  )
}

export default App