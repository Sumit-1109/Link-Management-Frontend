import "./Modal.css";

import close from "../../assets/close.png";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getLinkDetails, shorten, updateLinks } from "../../services/link";

function Modal({
  setShowModal,
  editModal,
  setEditModal,
  deleteModal,
  // setDeleteModal,
  setShortURLID,
  shortURLID,
  setLastUpdated
}) {
  const [isClosing, setIsClosing] = useState(false);

  const [linkInputDetails, setLinkInputDetails] = useState({
    originalURL: "",
    expirationDate: "",
    remarks: "",
  });


  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setLinkInputDetails({
      ...linkInputDetails,
      [e.target.id]: e.target.value,
    });

    setFieldErrors({
      ...fieldErrors,
      [e.target.id]: "",
    });
  };


  const fetchLinkDetails = async (shortURLID, token) => {

      try{
        const res = await getLinkDetails(shortURLID, token);
        const data = await res.json();
        const linkDetails = data.linkDetails;
        console.log(linkDetails);
        console.log(data);
        setLinkInputDetails({
          originalURL: linkDetails.originalURL,
          remarks: linkDetails.remarks,
          expirationDate: linkDetails.expirationDate
        })
      } catch (err) {
        console.log(err);
      }
  }

  useEffect(() => {

    const token = localStorage.getItem("token");

    console.log(shortURLID);

    if(editModal && shortURLID && token) {
      fetchLinkDetails(shortURLID, token);
    };

  }, []);

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

        setIsClosing(true);
        setEditModal(false);
        setShortURLID('');
        setLastUpdated(Date.now());
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

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
    }, 300);
  };

  return (
    <>
      {deleteModal 
      ?
      <div>

      </div>
      :
      <div className={`modalContainer ${isClosing ? "slideOut" : ""}`}>
      <div className={`modalBox ${isClosing ? "slideOut" : ""}`}>
        <form onSubmit={editModal ? handleEdit : handleSubmit} className="modalForm">
          <div className="modalHeader">
            <p>{editModal ? "Edit" : "New"} Link</p>
            <img onClick={handleCloseModal} src={close} alt="cross" />
          </div>

          <div className="modalBody">
            <div className="destinationUrl">
              <p>
                Destination Url <span>*</span>
              </p>
              <div className={`urlInputBox ${editModal ? "readOnly-originalURL-input-modal" : ''} `}>
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
                <p>Invalid URL</p>
              </div>
            </div>

            <div className="urlRemarks">
              <p>
                Remarks <span>*</span>
              </p>
              <textarea
                name="remarks"
                id="remarks"
                placeholder="Add remarks"
                value={linkInputDetails.remarks}
                onChange={handleChange}
              ></textarea>
              <div className="modalerror">
                <p>Remarks cannot be empty</p>
              </div>
            </div>

            <div className="linkExpiration">
              <div className="linkExpirationTitle">
                <p>Link Expiration</p>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
              <input
                type="date"
                id="expirationDate"
                value={linkInputDetails.expirationDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modalFooter">
            <div className="modalFooterButton">
              <button>Clear</button>
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
      }
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
  setLastUpdated: PropTypes.number
};
