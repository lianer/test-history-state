import React from 'react';
import { Outlet } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../../views/Home/Home';
import List from '../../views/List/List';
import Detail from '../../views/Detail/Detail';

const App: React.FC = () => {
  const basename = process.env.REACT_APP_BASENAME || '/';

  return (
    <div
      style={{
        maxWidth: 720,
        minHeight: '100vh',
        margin: '0 auto',
        background: '#fff',
      }}
    >
      <BrowserRouter basename={basename}>
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
