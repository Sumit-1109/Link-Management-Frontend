import "./Modal.css";

import close from "../../assets/close.png";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import {
  deleteLink,
  getLinkDetails,
  shorten,
  updateLinks,
} from "../../services/link";
import dayjs from "dayjs";
import calenderIcon from "../../assets/calendar.png";
import { deleteUserDetails } from "../../services/auth";
import { useNavigate } from "react-router-dom";

function Modal({
  setShowModal,
  editModal,
  setEditModal,
  deleteModal,
  setDeleteModal,
  setShortURLID,
  shortURLID,
  setLastUpdated,
  setDeleteUser,
  deleteUser
}) {
  const [isClosing, setIsClosing] = useState(false);

  const modalRef = useRef(null);
  const expirationInputRef = useRef(null);

  const navigate = useNavigate();

  const [linkInputDetails, setLinkInputDetails] = useState({
    originalURL: "",
    expirationDate: "",
    remarks: "",
    formattedExpirationDate: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    
  });
  const [isEditingExpiration, setIsEditingExpiration] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "expirationDate") {
      const formattedValue = dayjs(value).format("MMM DD, YYYY, hh:mm A");


        setLinkInputDetails({
          ...linkInputDetails,
          expirationDate: value,
          formattedExpirationDate: formattedValue,
      })
    } else {
      setLinkInputDetails({
        ...linkInputDetails,
        [id]: value,
      });
    }

    setFieldErrors({
      ...fieldErrors,
      [id]: "",
    });
  };

  const fetchLinkDetails = async (shortURLID, token) => {
    try {
      const res = await getLinkDetails(shortURLID, token);
      const data = await res.json();
      const linkDetails = data.linkDetails;

        setLinkInputDetails({
          originalURL: linkDetails.originalURL,
          remarks: linkDetails.remarks,
          expirationDate: linkDetails.expirationDate || "",
          formattedExpirationDate: linkDetails.expirationDate
            ? dayjs(linkDetails.expirationDate).format("MMM DD, YYYY, hh:mm A")
            : "",
        });
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (editModal && shortURLID && token) {
      fetchLinkDetails(shortURLID, token);
    }
  }, [shortURLID, editModal]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsClosing(true);
        setShowModal(false);
        setEditModal(false);
        setDeleteModal(false);
        setShortURLID("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setShowModal, setEditModal, setDeleteModal]);

  const handleExpirationClick = () => {
    setIsEditingExpiration(true);
    setTimeout(() => expirationInputRef.current?.focus(), 0);
  };

  const handleExpirationBlur = () => {
    setIsEditingExpiration(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await shorten(linkInputDetails, token);
      const data = await res.json();

      if (res.status === 201) {
        const message = data.message;
        console.log(message);

        setLinkInputDetails({
          originalURL: "",
          expirationDate: "",
          remarks: "",
          formattedExpirationDate: "",
        });

        setLastUpdated(Date.now());
        setIsClosing(true);
        setShowModal(false);
      } else {
        const { field, message } = data;
        setFieldErrors((prev) => ({
          ...prev,
          [field]: message,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await updateLinks(shortURLID, linkInputDetails, token);
      const data = await res.json();

      if (res.status === 200) {
        const message = data.message;
        console.log(message);

        setLinkInputDetails({
          originalURL: "",
          expirationDate: "",
          remarks: "",
        });

        setEditModal(false);
        setShortURLID("");
        setLastUpdated(Date.now());
        setIsClosing(true);
        setShowModal(false);
      } else {
        const { field, message } = data;
        setFieldErrors((prev) => ({
          ...prev,
          [field]: message,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelCreateOrEdit = async (e) => {
    e.preventDefault();
    setEditModal(false);
    setShortURLID("");
    setIsClosing(true);
    setShowModal(false);
  };

  const handleDeleteLink = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await deleteLink(shortURLID, token);
      const data = await res.json();

      if (res.status === 200) {
        const message = data.message;
        console.log(message);
        localStorage.removeItem('token');
        setShortURLID("");
        setDeleteModal(false);
        setLastUpdated(Date.now());
        setIsClosing(true);
        setShowModal(false);
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelDelete = async (e) => {
    e.preventDefault();

    setDeleteModal(false);
    setShortURLID("");
    setIsClosing(true);
    setShowModal(false);
    setDeleteUser(false);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
    }, 300);
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try{
      const res = await deleteUserDetails(token);
      const data = await res.json();

      if(res.status === 200) {
        console.log(data.message);
        setDeleteModal(false);
        setIsClosing(true);
        setShowModal(false);
        setDeleteUser(false);

        
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {deleteModal ? (
        <div>
          <div className={`deleteModalContainer`}>
            <div ref={modalRef} className="deleteModal-modal-box">
              <div className="deleModal-are-you-sure">
                {deleteUser ? <p> Are you sure, you want to delete the account ? </p> : <p>Are you sure, you want to remove it ?</p>}
              </div>

              <div className="deleteModal-buttons-container">
                <div className="buttons">
                  <button
                    className="cancelButton-deleteModal"
                    onClick={handleCancelDelete}
                  >
                    NO
                  </button>
                </div>
                <div className="buttons">
                  <button
                    className="deleteButton-deleteModal"
                    onClick={deleteUser ? handleDeleteUser : handleDeleteLink}
                  >
                    YES
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`modalContainer ${isClosing ? "slideOut" : ""}`}>
          <div
            ref={modalRef}
            className={`modalBox ${isClosing ? "slideOut" : ""}`}
          >
            <form
              onSubmit={editModal ? handleEdit : handleSubmit}
              className="modalForm"
            >
              <div className="modalHeader">
                <p>{editModal ? "Edit" : "New"} Link</p>
                <img onClick={handleCloseModal} src={close} alt="cross" />
              </div>

              <div className="modalBody">
                <div className="destinationUrl">
                  <p className="modalInputs-heading">
                    Destination Url <span>*</span>
                  </p>
                  <div
                    className={`urlInputBox ${
                      editModal ? "readOnly-originalURL-input-modal" : ""
                    } `}
                  >
                    <input
                      type="text"
                      placeholder="https://web.abc.com/"
                      name="destination"
                      id="originalURL"
                      value={linkInputDetails.originalURL}
                      onChange={handleChange}
                      readOnly={editModal}
                    />
                  </div>
                  <div className="modalerror">
                    {/* <p>{fieldErrors}</p> */}
                  </div>
                </div>

                <div className="urlRemarks">
                  <p className="modalInputs-heading">
                    Remarks <span>*</span>
                  </p>
                  <textarea
                    className="modalUrlRemarks"
                    name="remarks"
                    id="remarks"
                    placeholder="Add remarks"
                    value={linkInputDetails.remarks}
                    onChange={handleChange}
                  ></textarea>
                  <div className="modalerror">
                    {/* <p>{fieldErrors}</p> */}
                  </div>
                </div>

                <div className="linkExpiration">
                  <div className="linkExpirationTitle">
                    <p className="modalInputs-heading">Link Expiration</p>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div
                    className="expirationDateInputBoxContainer"
                  >
                    {isEditingExpiration ? (
                        <input
                          ref={expirationInputRef}
                          type="datetime-local"
                          id="expirationDate"
                          className="createEditModal-expirationDate-input"
                          value={linkInputDetails.expirationDate}
                          onChange={handleChange}
                          onBlur={handleExpirationBlur}
                        />
                    ) : (
                      <div className="formattedInputBox-expirationDate-Container" onFocus={handleExpirationClick}>
                      <input
                        type="text"
                        placeholder="dd-mm-yyyy -:-"
                        readOnly
                        value={linkInputDetails.formattedExpirationDate}
                        className="createEditModal-formattedExpirationDate"
                      />
                      <button type="button" className="calendarIconButton" onClick={handleExpirationClick}>
                      <img src={calenderIcon} alt="calender"  />
                      </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="modalFooter">
                <div className="modalFooterButton">
                  <button
                    className="modalCreateEdit-CancelButton"
                    onClick={(e) => handleCancelCreateOrEdit(e)}
                  >
                    Clear
                  </button>
                </div>

                <div className="modalFooterButton">
                  <button type="submit" className="modalCreateNewButton">
                    {editModal ? "Save" : "Create new"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;

Modal.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
  editModal: PropTypes.bool,
  setEditModal: PropTypes.func,
  deleteModal: PropTypes.bool,
  setDeleteModal: PropTypes.func,
  shortURLID: PropTypes.string,
  setShortURLID: PropTypes.func,
  setLastUpdated: PropTypes.func,
    deleteUser: PropTypes.bool,
    setDeleteUser: PropTypes.func
};
