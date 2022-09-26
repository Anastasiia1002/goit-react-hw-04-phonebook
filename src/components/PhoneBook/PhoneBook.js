import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

function PhoneBook() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) || [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    contacts.some(e => e.name.toLowerCase() === name.toLowerCase())
      ? alert(`${name} is already in contacts`)
      : setContacts([contact, ...contacts]);
  };

  const handleFilterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const filterContacts = () => {
    const filterLow = filter.toLowerCase().trim();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filterLow)
    );
  };

  const delContact = id => {
    setContacts(contacts.filter(el => el.id !== id));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList filtedContacts={filterContacts()} delContact={delContact} />
    </div>
  );
}

export default PhoneBook;
