import "./Modal.css";

import close from "../../assets/close.png";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { shorten } from "../../services/link";

function Modal({ setShowModal }) {

  const [isClosing, setIsClosing] = useState(false);
  const [token, setToken] = useState('');

  const [linkCreationDetails, setLinkCreationDetails] = useState({
    originalURL: '',
    expirationDate: '',
    remarks: ''
  })

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setLinkCreationDetails({
      ...linkCreationDetails,
      [e.target.id] : e.target.value
    });

    setFieldErrors({
      ...fieldErrors,
      [e.target.id] : ''
    })
  };


    const handleSubmit = async (e) =>{

      e.preventDefault();

      try{
        const res = await shorten(linkCreationDetails, token);
        const data = await res.json();

        if(res.status === 201) {
          const message = data.message;
          console.log(message);

          setLinkCreationDetails({
            originalURL: '',
            expirationDate: '',
            remarks: ''
          });

          setShowModal(false);
          setIsClosing(true);

        } else {
          const {field, message} = data;
          setFieldErrors((prev) => ({
            ...prev,
            [field]: message
          }));
        }

      } catch(err){
        console.error(err);
      }
    }


  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
    }, 300);
  };

  return (
    <div className={`modalContainer ${isClosing ? "slideOut" : ""}`}>
      <div className={`modalBox ${isClosing ? "slideOut" : ""}`}>
        <form onSubmit={handleSubmit} className="modalForm">
          <div className="modalHeader">
            <p>New Link</p>
            <img onClick={handleCloseModal} src={close} alt="cross" />
          </div>

          <div className="modalBody">
            <div className="destinationUrl">
              <p>
                Destination Url <span>*</span>
              </p>
              <div className="urlInputBox">
              <input
                type="text"
                placeholder="https://web.abc.com/"
                name="destination"
                id="originalURL"
                value={linkCreationDetails.originalURL}
                onChange={handleChange}
              />
              </div>
              <div className="modalerror">
                <p>Invalid URL</p>
              </div>
            </div>

            <div className="urlRemarks">
              <p>Remarks <span>*</span></p>
              <textarea
                name="remarks"
                id="remarks"
                placeholder="Add remarks"
                value={linkCreationDetails.remarks}
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
              <input type="date" id="expirationDate" value={linkCreationDetails.expirationDate} onChange={handleChange} />
            </div>
          </div>

          <div className="modalFooter">
            <div className="modalFooterButton">
              <button>Clear</button>
            </div>

            <div className="modalFooterButton">
              <button type="submit" className="modalCreateNewButton">Create new</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
};
