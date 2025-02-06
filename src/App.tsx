import { Route, BrowserRouter, Routes } from 'react-router-dom';
import React from 'react';
import UserPage from './pages/User';
import HomePage from './pages/Home';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/user-lookup" element={ <UserPage /> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;