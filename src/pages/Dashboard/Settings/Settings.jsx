import { useEffect, useState } from "react";
import "./Settings.css";
import PropTypes from "prop-types";
import { getUserDetails, modifyUserDetails } from "../../../services/auth";
import { useNavigate } from "react-router-dom";

function Settings({
  setShowModal,
  setDeleteModal,
  setDeleteUser
}) {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {

      const token = localStorage.getItem('token');

      if (!token) {
        console.error("No token found. Please login.");
        return;
      }

      try {
        const res = await getUserDetails(token); 

        if (res.status === 200) {

          const data = await res.json();
          console.log(data);
          console.log(data.user);
          console.log(data.user.name);

          setUserDetails(data.user);

        } else {
          console.error("Failed to fetch user details.");
        }
      } catch (err) {
        console.error("Error fetching user details:", err.message);
      } 
    };

    getUserData();
  }, []);
    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await modifyUserDetails(userDetails, token);

      if (res.status === 200) {
        const data = await res.json();

        if(data.emailChanged) {
          localStorage.removeItem("token");
          navigate('/login');
        } else{
        setUserDetails(data.userDetails);
        }
        
      } else {
        console.error("The universe does not want you to !!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = () => {
    setDeleteModal(true);
    setShowModal(true);
    setDeleteUser(true);
  };

  return (
    <div className="settingsPage-container">
      <div className="settingsPage-modifyUserBox">
        <form onSubmit={handleSubmit} className="settingsPage-modifyUser-form">
          <div className="settingsPage-modal-inputBox-container">
          <div className="settingsPage-modifyUser-Input settingsPage-modifyUser-nameInput">
            <p>Name</p>

            <div className="settingsPage-modifyUser-InputBox settingsPage-modifyUser-nameInputBox">
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="settingsPage-modifyUser-Input settingsPage-modifyUser-emailIdInput">
            <p>Email id</p>

            <div className="settingsPage-modifyUser-InputBox settingsPage-modifyUser-emailIdInputBox">
              <input
                type="text"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="settingsPage-modifyUser-Input settingsPage-modifyUser-mobileInput">
            <p>Mobile no.</p>

            <div className="settingsPage-modifyUser-InputBox settingsPage-modifyUser-mobileInputBox">
              <input
                type="text"
                name="mobile"
                value={userDetails.mobile}
                onChange={handleChange}
              />
            </div>
          </div>
          </div>

          <div className="settingsPage-modifyUser-buttonsBox">
            <div className="settingsPage-modifyUser-buttons">
              <button className="settingsPage-modifyUser-saveButtons" type="submit">Save Changes</button>
            </div>

            <div className="settingsPage-modifyUser-buttons">
              <button className="settingsPage-modifyUser-deleteButtons" type="button" onClick={deleteUser}>
                Delete User
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;

Settings.propTypes = {
  setDeleteModal: PropTypes.func,
  setShowModal: PropTypes.func,
  setDeleteUser: PropTypes.func,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string,
    firstName: PropTypes.string,
    initials: PropTypes.string,
  }),
  setUser: PropTypes.func,
};
