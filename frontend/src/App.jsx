import ContactForm from './ContactForm'
import API from './api'
import './App.css';
import { useEffect, useState } from 'react';
import ContactList from './ContactList';

const App = () => {

  const [contacts, setContacts] = useState([])

  const [edit,setEdit] = useState(null)

  console.log('Contacts state:', contacts);
  console.log(edit)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get('/');
        setContacts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const addContact = async (contact) => {
    try {
      const response = await API.post('/', contact);
      console.log('Contact added:', response.data);

      // refresh list after adding
      const res = await API.get('/');
      setContacts(res.data);

    } catch (error) {
      console.error('Error adding contact:', error);
    }
  }


  const deleteContact = async (id) => {
    try {
      await API.delete(`/${id}`);
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  } 

  return (
    <>
      <ContactForm onSubmit={addContact} />
      <ContactList contacts={contacts} onDelete={deleteContact}  onEdit={setEdit}  />
    </>
  )
}

export default App