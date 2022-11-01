import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  //state untuk menampung data user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //untuk validasi
  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  // useEffect untuk menghandel user yang telah berhasil login 
  // tidak bisa kembali ke halaman login atau register lagi sblm logout
  useEffect(() => {
    
    if(localStorage.getItem('token')){
      navigate('/homepage')
    }
  
  }, [])
  

  //fungsi untuk menghendel pendaftaran user
  const loginHandler = async (e) => {
    e.preventDefault();

    //membuat variabel formData untuk menampung seluruh data user yang ada di state menjadi 1 form
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    //menggunakan axios untuk konek ke backend dengan API dan mengirim data user ke database
    await axios.post("http://127.0.0.1:8000/api/auth/login", formData)
      .then((response) => {

        //mengirin token login user ke local storage browser
        console.log(response.data.access_token);
        localStorage.setItem('token', response.data.access_token);

        //mengarahkan user ke homepage setelah berhasil login
        navigate("/homepage");

      }).catch((error) => {
        console.log(error.response.data);
        setValidation(error.response.data);
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
                  <div className="card-header">
                    <h4 className="text-center">Login</h4>
                  </div>
                  <div className="card-body">
                    {
                      validation.error && (
                        <div className="alert alert-danger" role="alert">
                          {validation.error}
                        </div>
                      )
                    }
                    <form onSubmit={loginHandler}>
                      <div className='mb-3'>
                        <label className='form-label'>Alamat Email</label>
                        <input type='text' className='form-control' id='email' value={email}
                          onChange={(event) => setEmail(event.target.value)} placeholder='nama@gmail.com' />
                        {
                          validation.email && (
                            <small className="text-danger">
                              {validation.email[0]}
                            </small>
                          )
                        }
                      </div>
                      <div className='mb-3'>
                        <label className='form-label'>Kata Sandi</label>
                        <input type='password' className='form-control' id='password' value={password}
                          onChange={(event) => setPassword(event.target.value)} placeholder='******' />
                        {
                          validation.password && (
                            <small className="text-danger">
                              {validation.password[0]}
                            </small>
                          )
                        }
                      </div>
                      <div className="text-end">
                        <Link to="/register" className="btn btn-link" style={{textDecoration: "none"}}>Buat akun baru</Link>
                        <button type='submit' className='btn btn-primary' style={{paddingLeft:'30px', paddingRight:'30px', fontWeight:'bold'}}>Masuk</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Login;