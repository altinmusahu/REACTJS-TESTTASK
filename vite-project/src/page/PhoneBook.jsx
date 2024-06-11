import AddContactBtn from '../components/AddContactBtn';
import Table from '../components/Table';

export default function PhoneBook() {
  return (
    <div className="container mx-auto p-4 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Contacts</h1>
        <AddContactBtn />
      </div>
      <div className="overflow-x-auto">
        <Table />
      </div>
    </div>
  );
}
