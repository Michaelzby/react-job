import React from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    {/* 打开界面的时候 就会有user job all job的state了 相当于用redux实现一个information container */}
    {/* store的切片 */}
    <App tab='home' />
  </Provider>
);
