import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './pages';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import Users from "./pages/Users"
function App() {
  return (
   <div className="App">
      <Routes/>
    </div>
  );
}

export default App;
