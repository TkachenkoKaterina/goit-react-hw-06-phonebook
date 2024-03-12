import React from 'react';
import ContactItem from 'components/ContactItem/ContactItem';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from 'store/contactsSlice';
import { getContacts, getFilter } from 'store/selectors';
import Filter from 'components/Filter/Filter';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  const handleFilter = e => {
    dispatch(updateFilter(e.target.value));
  };

  return (
    <div>
      <Filter value={filter} onChange={handleFilter} />
      <ul className={css.ul}>
        {filteredContacts.map(contact => {
          return <ContactItem key={contact.id} contact={contact} />;
        })}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  onDeleteContact: PropTypes.func,
};

export default ContactList;
