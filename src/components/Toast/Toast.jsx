import PropTypes from 'prop-types';
import './Toast.css';

function Toast({message, onClose}) {
  return (
    <div className='toast'>
      <div className="toast-content">
        {message}
        <span className='toast-close' onClick={onClose}>&times;</span>
      </div>
    </div>
  )
}

export default Toast;

Toast.propTypes = {
    message: PropTypes.string,
    onClose: PropTypes.func
}
