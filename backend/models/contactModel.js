let contacts = [];

module.exports = {
  getAllContacts: () => contacts,
  addContact: (contact) => {
    const newContact = { id: Date.now(), ...contact };
    contacts.push(newContact);
    return newContact;
  }
};
