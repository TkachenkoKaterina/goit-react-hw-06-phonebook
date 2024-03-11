// import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'store/selectors';
import { addContact, deleteContact, updateFilter } from 'store/contactsSlice';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const handleFilter = e => {
    dispatch(updateFilter(e.target.value));
  };

  const handleSubmit = contact => {
    const { name } = contact;

    const isDuplicate = contacts.some(
      existingContact =>
        existingContact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${name} is already in contacts!`);
    } else {
      dispatch(addContact({ id: nanoid(), ...contact }));
    }
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className={css.container}>
      <h1 className={css.titleFirst}>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <h2 className={css.titleFSecond}>Contacts</h2>
      <Filter value={filter} onChange={handleFilter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
};
