import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler =(e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const login = async () => {
    console.log("Logged in", formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
  
    if (responseData && responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else if (responseData && responseData.console && responseData.console.errors) {
      alert(responseData.console.errors);
    } else {
      alert("An error occurred during login.");
    }
  };
  

  const signup = async () => {
    console.log("Signed up", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
  
    if (responseData && responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else if (responseData && responseData.console && responseData.console.errors) {
      alert(responseData.console.errors);
    } else {
      alert("An error occurred during signup.");
    }
  };
  

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up"? <input name="username" value={formData.username} onChange={changeHandler} type= "text" placeholder='Your Name'/>: <></>}
          <input name="email" value={formData.email} onChange={changeHandler} type= "email" placeholder='Your email address'/>
          <input name ="password" value={formData.password} onChange={changeHandler} type= "password" placeholder='Your password'/>
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"?<p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState("Login")}}>Login Here</span> </p>
        :<p className='loginsignup-login'>Create an account? <span onClick={()=>{setState("Sign Up")}}>SignUp Here</span> </p>} 
        <div className="loginsignup-agree">
          <input type="checkbox" name ='' id=''/>
          <p>By continuing, I agree to the terms of use and privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup;
