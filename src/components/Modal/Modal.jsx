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
import modalClose from "../../assets/modalClose.png";

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
  deleteUser,
  showToast,
}) {
  const [isClosing, setIsClosing] = useState(false);

  const modalRef = useRef(null);
  const expirationInputRef = useRef(null);

  const navigate = useNavigate();
  const [isEditingExpiration, setIsEditingExpiration] = useState(false);
  const [isExpirationEnabled, setIsExpirationEnabled] = useState(false);

  const [linkInputDetails, setLinkInputDetails] = useState({
    originalURL: "",
    expirationDate: "",
    remarks: "",
    formattedExpirationDate: "",
    isExpiration: isExpirationEnabled,
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "expirationDate") {
      const formattedValue = dayjs(value).format("MMM DD, YYYY, hh:mm A");

      setLinkInputDetails((prevDetails) => ({
        ...prevDetails,
        expirationDate: value,
        formattedExpirationDate: formattedValue,
        isExpiration: !!value,
      }));

      setIsExpirationEnabled(!!value);
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

      if (res.status === 200) {
        const linkDetails = data.linkDetails;

        setLinkInputDetails({
          originalURL: linkDetails.originalURL,
          remarks: linkDetails.remarks,
          expirationDate: linkDetails.expirationDate || "",
          formattedExpirationDate: linkDetails.expirationDate
            ? dayjs(linkDetails.expirationDate).format("MMM DD, YYYY, hh:mm A")
            : "",
        });

        setIsExpirationEnabled(!!linkDetails.expirationDate);
      } else {
        showToast(data.message);
      }
    } catch (err) {
      console.log(err);
      showToast("Something's Fishy");
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
        setLinkInputDetails({
          originalURL: "",
          expirationDate: "",
          remarks: "",
          formattedExpirationDate: "",
          isExpiration: isExpirationEnabled,
        });
  
      };
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setShowModal, setEditModal, setDeleteModal]);

  const handleExpirationClick = () => {
    setIsEditingExpiration(true);
    setTimeout(() => {
      if (expirationInputRef.current) {
        expirationInputRef.current.focus();
        expirationInputRef.current.showPicker?.();
      }
    }, 0);
  };

  const handleExpirationBlur = () => {
    setIsEditingExpiration(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await shorten(linkInputDetails, token);

      if (res.status === 201) {
        const data = await res.json();
        showToast(data.message);

        setLinkInputDetails({
          originalURL: "",
          expirationDate: "",
          remarks: "",
          formattedExpirationDate: "",
        });

        setLastUpdated(Date.now());
        setIsClosing(true);
        setShowModal(false);
        setIsExpirationEnabled(false);
      } else {
        const data = await res.json();
        if (data.field) {
          setFieldErrors((prev) => ({
            ...prev,
            [data.field]: data.message,
          }));
        } else {
          showToast(data.message);
        }
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

      if (res.status === 200) {
        const data = await res.json();
        const message = data.message;
        showToast(message);

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
        setIsExpirationEnabled(false);
      } else {
        const data = await res.json();
        if (data.field) {
          setFieldErrors((prev) => ({
            ...prev,
            [data.field]: data.message,
          }));
        } else {
          showToast(data.message);
        }
      }
    } catch (err) {
      console.error(err);
    }
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

        setShortURLID("");
        setDeleteModal(false);
        setLastUpdated(Date.now());
        setIsClosing(true);
        setShowModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelDelete = async (e) => {
    e.preventDefault();
    setIsClosing(true);
      setTimeout(() => {
        setDeleteModal(false);
        setShortURLID("");
      setShowModal(false);
      setDeleteUser(false);
      })
 
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setEditModal(false);
      setDeleteModal(false);
      setShortURLID("");
      setLinkInputDetails({
        originalURL: "",
        expirationDate: "",
        remarks: "",
        formattedExpirationDate: "",
        isExpiration: false,
      }, 300);
    }); 
  };
  

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await deleteUserDetails(token);
      const data = await res.json();

      if (res.status === 200) {
        showToast(data.message);
        localStorage.removeItem("token");
        setDeleteModal(false);
        setIsClosing(true);
        setShowModal(false);
        setDeleteUser(false);
        navigate("/login");
      } else {
        showToast(data.message);
      }
    } catch (err) {
      showToast(err);
    }
  };

  return (
    <>
      {deleteModal ? (
        <div>
          <div className={`deleteModalContainer`}>
            <div ref={modalRef} className={`deleteModal-modal-box`}>

              <div className="deletemodal-close" onClick={handleCancelDelete}>
                <img src={modalClose} alt="" />
              </div>

              <div className="deleModal-are-you-sure">
                {deleteUser ? (
                  <p> Are you sure, you want to delete the account ? </p>
                ) : (
                  <p>Are you sure, you want to remove it ?</p>
                )}
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
                      fieldErrors.originalURL ? "input-error" : ""
                    }`}
                  >
                    <input
                      type="text"
                      placeholder="https://web.abc.com/"
                      name="originalURL"
                      id="originalURL"
                      value={linkInputDetails.originalURL}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="modalerror">
                    <p>{fieldErrors.originalURL}</p>
                  </div>
                </div>

                <div className="urlRemarks">
                  <p className="modalInputs-heading">
                    Remarks <span>*</span>
                  </p>
                  <textarea
                    className={`modalUrlRemarks ${
                      fieldErrors.remarks ? "input-error" : ""
                    }`}
                    name="remarks"
                    id="remarks"
                    placeholder="Add remarks"
                    value={linkInputDetails.remarks}
                    onChange={handleChange}
                  ></textarea>
                  <div className="modalerror">
                    <p>{fieldErrors.remarks}</p>
                  </div>
                </div>

                <div className="linkExpiration">
                  <div className="linkExpirationTitle">
                    <p className="modalInputs-heading">Link Expiration</p>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={isExpirationEnabled}
                        onChange={() => {
                          setIsExpirationEnabled((prev) => {
                            const newExpirationEnabled = !prev;

                            setLinkInputDetails((prevDetails) => ({
                              ...prevDetails,
                              isExpiration: newExpirationEnabled,
                              expirationDate: newExpirationEnabled
                                ? prevDetails.expirationDate
                                : "",
                              formattedExpirationDate: newExpirationEnabled
                                ? prevDetails.formattedExpirationDate
                                : "",
                            }));

                            setFieldErrors((prev) => ({
                              ...prev,
                              expirationDate: "",
                            }));

                            return newExpirationEnabled;
                          });
                        }}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div
                    className={`expirationDateInputBoxContainer ${
                      fieldErrors.expirationDate ? "input-error" : ""
                    }`}
                  >
                    {isEditingExpiration ? (
                      <input
                        ref={expirationInputRef}
                        type="datetime-local"
                        id="expirationDate"
                        className={`createEditModal-expirationDate-input ${
                          !isExpirationEnabled ? "expiration-date-disabled" : ""
                        }`}
                        value={linkInputDetails.expirationDate}
                        onChange={handleChange}
                        onBlur={handleExpirationBlur}
                        disabled={!isExpirationEnabled}
                      />
                    ) : (
                      <div
                        className={`formattedInputBox-expirationDate-Container ${
                          !isExpirationEnabled ? "expiration-date-disabled" : ""
                        }`}
                        onClick={(e) => {
                          if(!isExpirationEnabled){
                            e.stopPropagation();
                          } else {
                            handleExpirationClick();
                          }
                        }}
                      >
                        <input
                          type="text"
                          placeholder="dd-mm-yyyy -:-"
                          readOnly
                          value={linkInputDetails.formattedExpirationDate}
                          className={`createEditModal-formattedExpirationDate ${!isExpirationEnabled ? "expiration-date-disabled" : ""}`}
                          disabled={!isExpirationEnabled}
                        />
                        <button
                          type="button"
                          className="calendarIconButton"
                          onClick={(e) => {
                            if(!isExpirationEnabled) {
                              e.stopPropagation();
                            } else {
                              handleExpirationClick();
                            }
                          }}
                        >
                          <img src={calenderIcon} alt="calender" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="modalerror">
                    <p>{fieldErrors.expirationDate}</p>
                  </div>
                </div>
              </div>

              <div className="modalFooter">
                <div className="modalFooterButton">
                  <button
                    className="modalCreateEdit-CancelButton"
                    onClick={(e) => {
                      e.preventDefault();
                      setLinkInputDetails({
                        originalURL: "",
                        expirationDate: "",
                        remarks: "",
                        formattedExpirationDate: "",
                      });
                      setIsExpirationEnabled(false);
                    }}
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
  setDeleteUser: PropTypes.func,
  showToast: PropTypes.func,
};
