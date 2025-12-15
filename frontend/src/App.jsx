import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import Audiences from './pages/Audiences';
import Automations from './pages/Automations';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="audiences" element={<Audiences />} />
          <Route path="automations" element={<Automations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
