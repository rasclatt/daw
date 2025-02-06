import { Route, BrowserRouter, Routes } from 'react-router-dom';
import React from 'react';
import publicRoutes from './routes/public';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        { publicRoutes.map((route, i) => (
          <Route key={ i } path={ route.path } element={ route.element } />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;