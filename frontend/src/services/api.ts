import axios from "axios";

const BASE_URL = "http://localhost:5000/contacts";

export const getContacts = () => axios.get(BASE_URL);
export const addContact = (contact) => axios.post(BASE_URL, contact);
export const updateContact = (id, contact) => axios.put(`${BASE_URL}/${id}`, contact);
export const deleteContact = (id) => axios.delete(`${BASE_URL}/${id}`);
