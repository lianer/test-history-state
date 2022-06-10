import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './layouts/App/App';
import Home from './views/Home/Home';
import List from './views/List/List';
import Detail from './views/Detail/Detail';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
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
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
