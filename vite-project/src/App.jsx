import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import PhoneBook from './page/PhoneBook.jsx';
import AddContact from './page/AddContact.jsx';

import { ContactProvider } from './storage/Contact.jsx';

function App() {
  return (
    <ContactProvider>
      <Router>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<PhoneBook />} />
            <Route path="/addcontact" element={<AddContact />} />
          </Routes>
        </main>
      </Router>
    </ContactProvider>
  );
}

export default App;
