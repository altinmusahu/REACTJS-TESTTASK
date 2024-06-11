import axios from "axios";
import { useEffect, useState } from "react";

export default function Table() {
  const [contacts, setContacts] = useState([]);

  const [editedContact, setEditedContact] = useState({
    name: "",
    lastname: "",
    address: "",
    city: "",
    country: "",
    emails: "",
    phoneNumbers: "",
});
const [isUpdating, setIsUpdating] = useState(false);

const [contact, setContact] = useState();

  useEffect(() => {
    axios.get(`http://localhost:4000/fetchcontacts`)
      .then((response) => {
        setContacts(response.data.contacts)
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  function checkEmails(contact) {
    if (Array.isArray(contact.emails) && contact.emails.length > 1) {
      return (
        <span>
          {contact.emails.map((email, index) => (
            <span key={index}>
              {index > 0 && <br />}
              {email}
            </span>
          ))}
        </span>
      );
    } else {
      return <span>{contact.emails}</span>;
    }
  }

  function checkNumbers(contact) {
    if (Array.isArray(contact.phoneNumbers) && contact.phoneNumbers.length > 1) {
      return (
        <span>
          {contact.phoneNumbers.map((numbers, index) => (
            <span key={index}>
              {index > 0 && <br />}
              {numbers}
            </span>
          ))}
        </span>
      );
    } else {
      return <span>{contact.phoneNumbers}</span>;
    }
  }

  const handleDelete = async (contactId) => {
    try {
        await axios.delete(`http://localhost:4000/deletecontact/${contactId}`);
        
        setContacts(contacts.filter(contact => contact._id !== contactId));
        console.log("Contact deleted successfully");
    } catch (error) {
        console.error("Error deleting Contact:", error);
    }
};

const handleEdit = async(contactId) => {
  const request=await axios.get(`http://localhost:4000/onecontact/${contactId}`)
  setContact(request.data)
  setEditedContact(request.data)
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setEditedContact(prevState => ({
      ...prevState,
      [name]: value
  }));
};

const handleEditSubmit = async (e) => {
  e.preventDefault();
  try {
      const response = await axios.put(`http://localhost:4000/edit/${contact._id}`, editedContact);
      console.log("Contact updated:", response.data);
      const clientsResponse = await axios.get(`http://localhost:4000/fetchcontacts`);
      setContacts(clientsResponse.data.contacts);
      setIsUpdating(false);

  } catch (error) {
      console.error("Error updating client:", error);
  }
};

  return (
  <div>
    <div className="container mx-auto p-4 mt-12">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border py-2 px-4 border-b border-gray-300">Name</th>
            <th className="border py-2 px-4 border-b border-gray-300">Last Name</th>
            <th className="border py-2 px-4 border-b border-gray-300">Address</th>
            <th className="border py-2 px-4 border-b border-gray-300">City</th>
            <th className="border py-2 px-4 border-b border-gray-300">Country</th>
            <th className="border py-2 px-4 border-b border-gray-300">Email</th>
            <th className="border py-2 px-4 border-b border-gray-300">Phone Number</th>
            <th className="border py-2 px-4 border-b border-gray-300">Edit</th>
            <th className="border py-2 px-4 border-b border-gray-300">Delete</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact._id}>
              <td className="border py-2 px-4 border-b border-gray-300 text-center">{contact.name}</td>
              <td className="border py-2 px-4 border-b border-gray-300 text-center">{contact.lastname}</td>
              <td className="border py-2 px-4 border-b border-gray-300 text-center">{contact.address}</td>
              <td className="border py-2 px-4 border-b border-gray-300 text-center">{contact.city}</td>
              <td className="border py-2 px-4 border-b border-gray-300 text-center">{contact.country}</td>
              <td className="border py-2 px-4 border-b border-gray-300 text-center">{checkEmails(contact)}</td>
              <td className="border py-2 px-4 border-b border-gray-300 text-center">{checkNumbers(contact)}</td>
              <td className="border py-2 px-4 border-b border-gray-300 text-center">
                <button onClick={() => {setIsUpdating(true);handleEdit(contact._id)}} className="bg-green-700 text-white px-4 py-1 rounded">Edit</button>
              </td>
              <td className="border py-2 px-4 border-b border-gray-300 text-center">
                <button onClick={() => handleDelete(contact._id)} className="bg-red-600 text-white px-4 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {isUpdating && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            {/* Add your edit form here */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Admin</h3>
                                        <div className="mt-2">
                                            {/* Your edit form components go here */}
                                            <form onSubmit={handleEditSubmit}>

                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                                <input type="text" name="name" id="name" className="mt-1 p-2 border border-gray-300 rounded-md" defaultValue={editedContact.name} onChange={handleInputChange} />

                                                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mt-4">Lastname</label>
                                                <input type="text" name="lastname" id="lastname" className="mt-1 p-2 border border-gray-300 rounded-md" defaultValue={editedContact.lastname} onChange={handleInputChange}/>

                                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                                <input type="text" name="address" id="address" className="mt-1 p-2 border border-gray-300 rounded-md" defaultValue={editedContact.address} onChange={handleInputChange} />

                                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                                <input type="text" name="city" id="city" className="mt-1 p-2 border border-gray-300 rounded-md" defaultValue={editedContact.city} onChange={handleInputChange} />

                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                                <input type="text" name="country" id="country" className="mt-1 p-2 border border-gray-300 rounded-md" defaultValue={editedContact.country} onChange={handleInputChange} />

                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Emails</label>
                                                <input type="text" name="email" id="email" className="mt-1 p-2 border border-gray-300 rounded-md" defaultValue={editedContact.emails} onChange={handleInputChange} />

                                                <label htmlFor="phoneNumbers" className="block text-sm font-medium text-gray-700">Numbers</label>
                                                <input type="text" name="phoneNumbers" id="phoneNumbers" className="mt-1 p-2 border border-gray-300 rounded-md" defaultValue={editedContact.phoneNumbers} onChange={handleInputChange} />
                                                <div className="mt-4">
                                                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Save</button>
                                                    <button type="button" onClick={() => setIsUpdating(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded ml-2">Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

  </div>
  );
}
