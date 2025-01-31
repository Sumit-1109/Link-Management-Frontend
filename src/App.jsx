import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthRedirect from "./pages/Auth/AuthRedirect/AuthRedirect";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import { useEffect, useState } from "react";
import Toast from "./components/Toast/Toast";
import Home from "./pages/Dashboard/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import LinkSection from "./pages/Dashboard/LinkSection/LinkSection";
import Analytics from "./pages/Dashboard/Analytics/Analytics";
import Settings from "./pages/Dashboard/Settings/Settings";
import PrivateRoute from "./context/PrivateRoute";

function App() {
  const [toast, setToast] = useState({
    show: false,
    message: "",
  });


  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [shortURLID, setShortURLID] = useState("");
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [nameLastUpdated, setNameLastUpdated] = useState(Date.now());
  const [deleteUser, setDeleteUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const showToast = (message) => {
    setToast({
      show: true,
      message,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
      });
    }, 5000);
  };

  const hideToast = () => {
    setToast({
      show: false,
      message: "",
    });
  };

  useEffect(() => {
    console.log(searchQuery)
  }, [searchQuery]);

  return (
        <BrowserRouter>
          {toast.show && <Toast message={toast.message} onClose={hideToast} />}

          <Routes>
            <Route path="/" element={<AuthRedirect />} />
            <Route path="/login" element={<Login showToast={showToast} />} />
            <Route path="/signup" element={<Signup showToast={showToast} />} />

            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home
                    setShowModal={setShowModal}
                    showModal={showModal}
                    editModal={editModal}
                    setEditModal={setEditModal}
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                    shortURLID={shortURLID}
                    setShortURLID={setShortURLID}
                    setLastUpdated={setLastUpdated}
                    deleteUser={deleteUser}
                    setDeleteUser={setDeleteUser}
                    setSearchQuery={setSearchQuery} 
                    showToast={showToast}
                    nameLastUpdated={nameLastUpdated}
                  />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard showToast={showToast} />} />
              <Route
                path="/home/links"
                element={
                    <LinkSection
                      setShowModal={setShowModal}
                      setEditModal={setEditModal}
                      editModal={editModal}
                      deleteModal={deleteModal}
                      setDeleteModal={setDeleteModal}
                      setShortURLID={setShortURLID}
                      lastUpdated={lastUpdated}
                      searchQuery={searchQuery} 
                      setSearchQuery={setSearchQuery} 
                      showToast={showToast}
                    />
                }
              />
              <Route
                path="/home/analytics"
                element={
                    <Analytics showToast={showToast} />
                }
              />
              <Route
                path="/home/settings"
                element={
                    <Settings
                      setDeleteModal={setDeleteModal}
                      setShowModal={setShowModal}
                      setDeleteUser={setDeleteUser}
                      showToast={showToast}
                      setNameLastUpdated={setNameLastUpdated}
                    />
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
