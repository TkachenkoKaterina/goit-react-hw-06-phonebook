import React from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import css from './App.module.css';

export const App = () => {
  return (
    <div className={css.container}>
      <h1 className={css.titleFirst}>Phonebook</h1>
      <ContactForm />
      <h2 className={css.titleFSecond}>Contacts</h2>
      <ContactList />
    </div>
  );
};
