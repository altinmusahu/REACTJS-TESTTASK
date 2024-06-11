import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


export default function AddContact() {

  const navigate=useNavigate();

  const [emails, setEmails] = useState(['']);
  const [phoneNumbers, setPhoneNumbers] = useState(['']);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");


  const handleAddEmail = () => {
    if (emails.length < 4) {
      setEmails([...emails, '']);
    }
  };

  const handleAddPhoneNumber = () => {
    if (phoneNumbers.length < 4) {
      setPhoneNumbers([...phoneNumbers, '']);
    }
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handlePhoneNumberChange = (index, value) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = value;
    setPhoneNumbers(newPhoneNumbers);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
        axios.post('http://localhost:4000/register',{
          name,
          lastname,
          address,
          city,
          country,
          emails,
          phoneNumbers
        }).then(result => {
          console.log(result); // Log successful response

          if(result.data.message === "created") {
              navigate('/')
          }else{return;}
      })
      .catch(err => console.log(err))
    }


  return (
    <div className="container mx-auto p-4 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-0">Register new contact</h1>
      </div>
      <form className="mt-8" onSubmit={handleSubmit}>
        <label className="block mb-1 text-base font-medium text-gray-900">Name:</label>
        <input 
          value={name} 
          required 
          type="text"
          placeholder="Enter the Name"
          className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-xs dark:placeholder-gray-500" 
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mb-1 mt-3 text-base font-medium text-gray-900">Lastname:</label>
        <input 
          value={lastname} 
          required 
          type="text" 
          placeholder="Enter Lastname" 
          className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-xs dark:placeholder-gray-500"
          onChange={(e) => setLastname(e.target.value)} 
        />

        <label className="block mb-1 mt-3 text-base font-medium text-gray-900">Address:</label>
        <input 
          value={address} 
          required 
          type="text" 
          placeholder="Enter Address" 
          className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-xs dark:placeholder-gray-500"
          onChange={(e) => setAddress(e.target.value)}
        />

        <label className="block mb-1 mt-3 text-base font-medium text-gray-900">City:</label>
        <input 
          value={city} 
          required 
          type="text" 
          placeholder="Enter City" 
          className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-xs dark:placeholder-gray-500" 
          onChange={(e) => setCity(e.target.value)}
        />

        <label className="block mb-1 mt-3 text-base font-medium text-gray-900">Country:</label>
        <input 
          value={country} 
          required 
          type="text" 
          placeholder="Enter Country" 
          className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-xs dark:placeholder-gray-500" 
          onChange={(e) => setCountry(e.target.value)}
        />

        <label className="block mb-1 mt-3 text-base font-medium text-gray-900">Email:</label>
        {emails.map((email, index) => (
          <div key={index} className="flex items-center mb-2">
            <input 
              type="text" 
              value={email}
              onChange={(e) => handleEmailChange(index, e.target.value)}
              placeholder="Enter Email" 
              className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-xs dark:placeholder-gray-500" 
              required
            />
            {index === emails.length - 1 && emails.length < 4 && (
              <button 
                type="button" 
                onClick={handleAddEmail} 
                className="ml-2 bg-blue-600 text-white px-2 py-1 rounded">Add</button>
            )}
          </div>
        ))}

        <label className="block mb-1 mt-3 text-base font-medium text-gray-900">Number:</label>
        {phoneNumbers.map((phoneNumber, index) => (
          <div key={index} className="flex items-center mb-2">
            <input 
              type="text" 
              value={phoneNumber}
              onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
              placeholder="Enter Number" 
              className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-xs dark:placeholder-gray-500" 
              required 
            />
            {index === phoneNumbers.length - 1 && phoneNumbers.length < 4 && (
              <button 
                type="button" 
                onClick={handleAddPhoneNumber} 
                className="ml-2 bg-blue-600 text-white px-2 py-1 rounded">Add</button>
            )}
          </div>
        ))}

        <button className="bg-blue-600 hover:bg-blue-800 mt-4 text-white py-1 px-2 rounded">Save</button>
      </form>
    </div>
  );
}
