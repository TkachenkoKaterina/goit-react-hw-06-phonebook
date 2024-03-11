import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getContactFormData } from 'store/selectors';
import { resetFormData, updateFormData } from 'store/contactFormSlice';

const ContactForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const formData = useSelector(getContactFormData);

  const handleChange = e => {
    dispatch(updateFormData({ [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
    dispatch(resetFormData());
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
        // value={name}
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
        // value={number}
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
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
