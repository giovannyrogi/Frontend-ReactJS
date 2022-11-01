import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

  //state untuk menampung data user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  //untuk validasi
  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  // useEffect untuk menghandel user yang telah berhasil login 
  // tidak bisa kembali ke halaman login atau register lagi sblm logout
  useEffect(() => {

    if (localStorage.getItem('token')) {
      navigate('/homepage')
    }

  }, [])

  //fungsi untuk menghendel pendaftaran user
  const registerHandler = async (e) => {
    e.preventDefault();

    //membuat variabel formData untuk menampung seluruh data user yang ada di state menjadi 1 form
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);

    //menggunakan axios untuk konek ke backend dengan API dan mengirim data user ke database
    await axios.post("http://127.0.0.1:8000/api/auth/register", formData)
      .then(() => {
        navigate("/");
      }).catch((error) => {
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
                    <h4 className="text-center">Register</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={registerHandler}>
                      <div className="mb-3">
                        <label className="form-label">Nama Lengkap</label>
                        <input type="text" className="form-control" id="name" value={name}
                          onChange={(event) => setName(event.target.value)} placeholder="Nama Lengkap Anda . . ." />
                        {
                          validation.name && (
                            <small className="text-danger">
                              {validation.name[0]}
                            </small>
                          )
                        }
                      </div>
                      <div className="mb-3">
                        <label className="form-label"> Alamat Email</label>
                        <input type="text" className="form-control" id="email" value={email}
                          onChange={(event) => setEmail(event.target.value)} placeholder="nama@gmail.com" />
                        {
                          validation.email && (
                            <small className="text-danger">
                              {validation.email[0]}
                            </small>
                          )
                        }
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Kata Sandi</label>
                        <input type="password" className="form-control" id="password" value={password}
                          onChange={(event) => setPassword(event.target.value)} placeholder="******" />
                        {
                          validation.password && (
                            <small className="text-danger">
                              {validation.password[0]}
                            </small>
                          )
                        }
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Konfirmasi Kata Sandi</label>
                        <input type="password" className="form-control" id="password_confirmation" value={passwordConfirmation}
                          onChange={(event) => setPasswordConfirmation(event.target.value)} placeholder="******" />
                      </div>
                      <div className="text-end">
                        <Link to="/" className="btn btn-link" style={{ textDecoration: "none", }}>Sudah punya akun?</Link>
                        <button className="btn btn-primary" type="submit" style={{ paddingLeft: '30px', paddingRight: '30px', fontWeight: 'bold' }}>Daftar</button>
                      </div>
                    </form>
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

export default Register;