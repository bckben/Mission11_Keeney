import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import Cart from './components/Cart';
import AdminBooks from './pages/AdminBooks';

function App() {
  return (
    <Router>
      <div>
        {/* Optional: Add a nav bar here if you want */}
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/adminbooks" element={<AdminBooks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
