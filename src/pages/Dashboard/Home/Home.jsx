import "./Home.css";

import Leftbar from "../../../components/LeftBar/Leftbar";
import Navbar from "../../../components/NavBar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal/Modal";
import PropTypes from "prop-types";
import { useEffect } from "react";

function Home({
  setShowModal,
  showModal,
  editModal,
  setEditModal,
  deleteModal,
  setDeleteModal,
  shortURLID,
  setShortURLID,
  setLastUpdated,
  setDeleteUser,
  deleteUser,
  setSearchQuery,
  showToast,
  nameLastUpdated
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="homePage">

      <div className="homePage-LeftBar">
      <Leftbar />
      </div>

      <div className="rightBody">
        <Navbar setShowModal={setShowModal} setSearchQuery={setSearchQuery} nameLastUpdated={nameLastUpdated} setEditModal={setEditModal} setShortURLID={setShortURLID} />

      <div className="leftBar-movileView">
      <Leftbar />
      </div>

        <div className="homeBody">
          <Outlet />
        </div>
      </div>

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          editModal={editModal}
          setEditModal={setEditModal}
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          shortURLID={shortURLID}
          setShortURLID={setShortURLID}
          setLastUpdated={setLastUpdated}
          deleteUser={deleteUser}
          setDeleteUser={setDeleteUser}
          showToast={showToast}
        />
      )}
    </div>
  );
}

export default Home;

Home.propTypes = {
  setEditModal: PropTypes.func,
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
  editModal: PropTypes.bool,
  deleteModal: PropTypes.bool,
  setDeleteModal: PropTypes.func,
  shortURLID: PropTypes.string,
  setShortURLID: PropTypes.func,
  setLastUpdated: PropTypes.func,
  deleteUser: PropTypes.bool,
  setDeleteUser: PropTypes.func,
  setSearchQuery: PropTypes.func,
  showToast: PropTypes.func,
  nameLastUpdated: PropTypes.number
};
