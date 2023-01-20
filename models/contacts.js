const fs = require('fs/promises')
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname,"/contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    // console.table(JSON.parse(response))
     return JSON.parse(contacts);    
  } catch (error) {
    console.error("listContacts", error);
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.filter((item) => String(item.id) === String(contactId));
    // console.log("getContactById",contact);
    return contact;
  } catch (error) {
    console.error("getContactById", error);
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const ListAfterDelete = contacts.filter(item => item.id !==contactId)
    // console.table(ListAfterDelete);
    await fs.writeFile(contactsPath, JSON.stringify(ListAfterDelete));
    return contactId;
  } catch (error) {
    console.error("removeContact", error);
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const contact = {
      id: uuidv4(),
      ...body
    }
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contact;
  } catch (error) {
    console.error("addContact", error);
  }
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((el, idx, array) => array[idx] === contactId)
  if (index === -1) {
    console.log("Element not found");
    return null;
  }
  contacts[index] = {...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return true;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}