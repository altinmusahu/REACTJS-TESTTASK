
export default function Table() {
  // Sample data for demonstration
  const contacts = [
    {
      id: 1,
      name: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'New York',
      country: 'USA',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
    },
    {
      id: 2,
      name: 'Jane',
      lastName: 'Smith',
      address: '456 Maple Ave',
      city: 'Los Angeles',
      country: 'USA',
      email: 'jane.smith@example.com',
      phoneNumber: '987-654-3210',
    },
  ];

  return (
    <div className="container mx-auto p-4">
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
            <tr key={contact.id} >
              <td className="border py-2 px-4 border-b border-gray-300 text-center">{contact.name}</td>
              <td className="border py-2 px-4 border-b border-gray-300 text-center">{contact.lastName}</td>
              <td className="border py-2 px-4 border-b border-gray-300 text-center">{contact.address}</td>
              <td className="border py-2 px-4 border-b border-gray-300 text-center">{contact.city}</td>
              <td className="border py-2 px-4 border-b border-gray-300 text-center">{contact.country}</td>
              <td className="border py-2 px-4 border-b border-gray-300 text-center">{contact.email}</td>
              <td className="border py-2 px-4 border-b border-gray-300 text-center">{contact.phoneNumber}</td>

              <td className="border py-2 px-4 border-b border-gray-300 text-center ">
                <button className="bg-green-700 text-white px-4 py-1 rounded">Edit</button>
              </td>
              <td className="border py-2 px-4 border-b border-gray-300 text-center ">
                <button className="bg-red-600 text-white px-4 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
