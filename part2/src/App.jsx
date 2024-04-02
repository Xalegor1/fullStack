import Note from "./components/Note";
import Course from "./components/Course";
import { useState, useEffect } from "react";
import shortid from "shortid";
import axios from "axios";
import noteService from './services/notes'
import Person from "./components/Person";
import personService from "./services/persons";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

// const App = () => {
//   const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "123456789" }]);
//   const [newName, setNewName] = useState("");
//   const [newNumber, setNewNumber] = useState(""); // Добавлено новое состояние для номера
//   const [searchTerm, setSearchTerm] = useState("");
//   const [errorMessage, setErrorMessage] = useState(null)

//   useEffect(() => {
//     personService
//       .getAll()
//       .then(initialPersons => {
//         setPersons(initialPersons);
//       })
//   }, [])

//   const addPerson = (event) => {
//     event.preventDefault();

//     const isNameExists = persons.some((per) => per.name === newName);
//     if (isNameExists) {
//       alert(`${newName} is already added to phonebook`);
//     } else {
//       const personObject = {
//         name: newName,
//         number: newNumber 
//       };

//       personService
//         .create(personObject)
//         .then(returnedPerson => {
//           setPersons(persons.concat(returnedPerson));
//           setNewName("");
//           setNewNumber(""); 
//           setErrorMessage(`Added ${newName}`);
//           setTimeout(() => {
//              setErrorMessage(null);
//           }, 2000);
//         })
        
//     }
//   };

//   const handleName = (event) => {
//     setNewName(event.target.value);
//   };

//   const handleNumber = (event) => { 
//     setNewNumber(event.target.value);
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const deletePerson = (id, name) => {
//     if (window.confirm(`Delete ${name}?`)) {
//       personService
//         .remove(id)
//         .then(() => {
//           setPersons(persons.filter(per => per.id !== id))
//         })
//         .catch(error => {
//           console.error("error deleting person: ", error)
//         })
//     }
//   }

//   const filteredPersons = persons.filter((person) =>
//     person.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <Notification message={errorMessage} />
//       <h2>Search</h2>
//       <div>
//         Filter by name: <input value={searchTerm} onChange={handleSearch} />
//       </div>
//       <h2>Phonebook</h2>
//       <form onSubmit={addPerson}>
//         <div>
//           name: <input value={newName} onChange={handleName} />
//         </div>
//         <div>
//           number: <input value={newNumber} onChange={handleNumber} /> 
//         </div>
//         <div>
//           <button type="submit">add</button>
//         </div>
//       </form>
//       <h2>Numbers</h2>
//       <div>
//         {filteredPersons.map((per) => (
//           <p key={shortid.generate()} className="persons">
//             {per.name}: <strong>{per.number}</strong>
//             <button onClick={() => deletePerson(per.id, per.name)}>Delete</button>
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// };



const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
  
    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form> 
    </div>
  )
}

export default App
          
