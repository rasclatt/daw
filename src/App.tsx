import { Route, BrowserRouter, Routes } from 'react-router-dom';
import React from 'react';
import UserPage from './pages/User';
import HomePage from './pages/Home';
import { UserProvider } from './providers/user.provider';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/user-lookup" element={ <UserProvider><UserPage /></UserProvider> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;