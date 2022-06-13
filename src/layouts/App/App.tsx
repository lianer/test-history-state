import React from 'react';
import { Outlet } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from '../../views/Home/Home';
import List from '../../views/List/List';
import Detail from '../../views/Detail/Detail';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/cache">
              <Route path="/cache/list" element={<List />} />
              <Route path="/cache/detail" element={<Detail />} />
            </Route>
            <Route path="/nocache">
              <Route path="/nocache/list" element={<List />} />
              <Route path="/nocache/detail" element={<Detail />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Outlet />
    </div>
  );
};

export default App;
