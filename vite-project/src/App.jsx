import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import PhoneBook from './page/PhoneBook.jsx';

function App() {
  return (
    <Router>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<PhoneBook />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
