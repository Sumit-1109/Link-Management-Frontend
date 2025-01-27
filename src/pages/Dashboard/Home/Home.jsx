import "./Home.css";

import Leftbar from "../../../components/LeftBar/Leftbar";
import Navbar from "../../../components/NavBar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal/Modal";
import PropTypes from "prop-types";
import { useEffect} from "react";

function Home({
  setShowModal,
  showModal,
  editModal,
  setEditModal,
  deleteModal,
  setDeleteModal,
  shortURLID,
  setShortURLID,
  setLastUpdated
}) {
  const navigate = useNavigate();


  useEffect(() => {

    const token = (localStorage.getItem("token"));

    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="homePage">
      <Leftbar />

      <div className="rightBody">
        <Navbar setShowModal={setShowModal} />

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
          setLastUpdated = {setLastUpdated}
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
  setLastUpdated :PropTypes.func
};
