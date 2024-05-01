import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ComboBox from './ComboBox';
import Dashboard from './Components/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignInSide from './Pages/SignInSide';
import AdminDashboard from './Pages/AdminDashboard';

function App() {
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [isAssetAdministrator, setIsAssetAdministrator] = useState(localStorage.getItem('isAssetAdministrator') === 'true');
  const [worksAt, setWorksAt] = useState("");

  useEffect(() => {
    localStorage.setItem('isAuthenticated', authenticated);
  }, [authenticated]);

  useEffect(() => {
    if (authenticated && worksAt === "Asset Administrator") {
      setIsAssetAdministrator(true);
    } else {
      setIsAssetAdministrator(false);
    }
  }, [authenticated, worksAt]);


  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={authenticated ? (isAssetAdministrator ? <Navigate to="/assetAdministrator" /> : <Dashboard titlePlace={worksAt} setAuthenticated={setAuthenticated} />) : <Navigate to="/signin" />}
          />
          <Route
            path="/assetAdministrator"
            element={isAssetAdministrator ? <AdminDashboard titlePlace={worksAt} setAuthenticated={setAuthenticated} setIsAssetAdministrator={setIsAssetAdministrator} /> : <Navigate to="/" />}
          />
          <Route
            path="/signin"
            element={!authenticated ? <SignInSide setAuthenticated={setAuthenticated} setWorksAt={setWorksAt} /> : <Navigate to="/" />}
          />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
