import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import Cart from './components/Cart';

function App() {
  return (
    <Router>
      <div>
        {/* Optional: Add a nav bar here if you want */}
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
