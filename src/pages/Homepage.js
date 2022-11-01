import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {

  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  // mengambil token yang ada di local storage browser
  const token = localStorage.getItem("token");

  // mengambil data user
  const getUserData = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await axios.post('http://127.0.0.1:8000/api/auth/me')
      .then((response) => {
        setCurrentUser(response.data);
      })
  }

  useEffect(() => {
    if (!token) {
      navigate('/');
    }

    getUserData();
  }, [])

  const handleLogout = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await axios.post('http://127.0.0.1:8000/api/auth/me')
      .then(() => {
        localStorage.removeItem('token');

        navigate('/');
      })
  }

  return (
    <div>
      <div className="container">
        <div className="d-flex align-items-center" style={{ height: "100vh" }}>
          <div style={{ width: "100%" }}>
            <div className="row justify-content-center">
              <div className="col-md-6 ">
                <div className="card">
                  <div className="card-header text-center">
                    <h5>Selamat datang <span style={{color:'crimson'}}>{currentUser.name}</span></h5>
                  </div>
                  <div className="card-body">
                    <h5>Projek Sistem Login</h5>
                    <div className="text-end">
                      <button className="btn btn-danger" onClick={handleLogout}>Keluar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage;