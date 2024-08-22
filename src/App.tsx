import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './pages';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import Users from "./pages/Users"
import { Provider } from 'react-redux';
import { store } from './state';
import { CssBaseline } from '@mui/material';
function App() {
  return (
    
   <div className="App">
    <CssBaseline/>
    <Provider store={store}>
      <Routes/>
    </Provider>
    </div>
  );
}

export default App;
