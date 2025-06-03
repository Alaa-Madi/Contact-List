const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/contacts.json');

// قراءة البيانات
const getContacts = (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  res.json(data);
};

// إضافة جهة اتصال
const createContact = (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  const newContact = { id: Date.now().toString(), ...req.body };
  data.push(newContact);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(201).json(newContact);
};

// تعديل جهة اتصال
const updateContact = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  let data = JSON.parse(fs.readFileSync(filePath));

  const index = data.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  data[index] = { ...data[index], ...updatedData };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json(data[index]);
};

// حذف جهة اتصال
const deleteContact = (req, res) => {
  const { id } = req.params;
  let data = JSON.parse(fs.readFileSync(filePath));
  data = data.filter((contact) => contact.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json({ message: 'Contact deleted' });
};

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
