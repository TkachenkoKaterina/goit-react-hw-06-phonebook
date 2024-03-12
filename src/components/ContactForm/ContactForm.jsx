import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import { addContact } from 'store/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'store/selectors';
import { nanoid } from '@reduxjs/toolkit';

const ContactForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'number') {
      setNumber(e.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isDuplicate = contacts.some(
      existingContact =>
        existingContact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${name} is already in contacts!`);
    } else {
      dispatch(addContact({ id: nanoid(), name, number }));
      setName('');
      setNumber('');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.input} htmlFor="name">
        Name
      </label>
      <input
        className={css.form}
        id="name"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        required
      />

      <label className={css.label} htmlFor="tel">
        Number
      </label>
      <input
        className={css.input}
        id="tel"
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        required
      />

      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ContactForm;
