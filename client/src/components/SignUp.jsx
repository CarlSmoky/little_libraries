import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { authContext } from '../providers/AuthProvider';


export default function SignUp() {
  const navigate = useNavigate();
  const { setUserInfo } = useContext(authContext);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    phone_number: "",
    email: "",
    password: "",
    password_confirmation: ""
  });


  const { first_name, last_name, phone_number, email,password, password_confirmation } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmitClick = (e) => {
        e.preventDefault();
        if(password === password_confirmation) {
          console.log("handle submit clicked", formData)
          const newUser = {...formData };
          delete newUser.password_confirmation;
          save(newUser);
        } else {
            console.log('Passwords do not match');
        }
  }


  function save(newUser) {

    const endpoints = {
      "SIGNUP": "http://localhost:3001/api/signup"
    }

    axios.post(endpoints.SIGNUP, newUser)
      .then(response => {
        console.log("Our Response:", response.data);
        console.log("I'm the callback from the put call");
        if (typeof window !== 'undefined') {
          localStorage.setItem("token", response.data.token);
        }
        const { id, firstName, lastName, email, auth } = response.data;
        setUserInfo(id, firstName, lastName, email, auth);
        navigate('/')
      });
    }


  return (
<section className="vh-100 bg-image" >
  {/* <div className="mask d-flex align-items-center h-100 gradient-custom-3"> */}
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" >
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>

              <form>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example1cg">First Name</label>
                  <input
                    type="text"
                    // id="form3Example1cg"
                    className="form-control form-control-lg"
                    onChange={onChange}
                    placeholder='First name'
                    name='first_name'
                    value={first_name}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example2cg">Last Name</label>
                  <input
                    type="text"
                    // id="form3Example2cg"
                    className="form-control form-control-lg"
                    onChange={onChange}
                    placeholder='Last name'
                    name='last_name'
                    value={last_name}
                    required
                  />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3cg">email</label>
                  <input
                    type="text"
                    // id="form3Example3cg"
                    className="form-control form-control-lg"
                    onChange={onChange}
                    placeholder='email'
                    name='email'
                    value={email}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label input-field" htmlFor="form3Example4cg">Password</label>
                  <input
                    type="password"
                    // id="form3Example4cg" className="form-control form-control-lg"
                    onChange={onChange}
                    placeholder='Password'
                    name='password'
                    value={password}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label input-field" htmlFor="form3Example4cdg">Repeat your password</label>
                  <input
                    type="password"
                    // id="form3Example4cdg" className="form-control form-control-lg"
                    onChange={onChange}
                    placeholder='Password_confirmation'
                    name='password_confirmation'
                    value={password_confirmation}
                    required
                  />
                </div>


                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                    onClick={handleSubmitClick}
                    >Register</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!" className="fw-bold text-body"><u>Login here</u></a></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  {/* </div> */}
</section>
  )
}


//         {/* <carsouel /> put flex position on the carousel */}
//         {/* https://react-bootstrap.github.io/forms/validation/ */}
