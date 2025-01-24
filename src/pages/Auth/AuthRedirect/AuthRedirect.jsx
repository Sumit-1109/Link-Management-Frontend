import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function AuthRedirect() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [navigate]);


  return (
    <div>
      ...Loading
    </div>
  )
}

export default AuthRedirect
