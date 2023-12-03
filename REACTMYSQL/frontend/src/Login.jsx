import React, {useState} from "react";
import { Link,useNavigate } from 'react-router-dom'
import axios from "axios"


function Login(){
    const [values,setValues] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate()
    const handleSubmit=(event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/login', values)
        .then(res => {
            if(res.data.Status === "Success"){
                navigate('/')
            } else {
                alert(res.data.Error);
            }
        })
        .then(err => console.log(err));
    }
    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100 vw-100'>
            <div className="bg-white p-3 rounded w-50 h-50">
                <h2>Sign-In</h2>
                {/* <form onSubmit={handleSubmit}> esto lo escribimos cuando queremos desencadenar una accion, en este caso "onChange"  */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email'
                        onChange={e => setValues({...values, email: e.target.value})} className="form-control rounded-0" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password'
                        onChange={e => setValues({...values, password: e.target.value})} className="form-control rounded-0" />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                    <p>You are agree to out terms and policies</p>
                    <Link to="/register" className="btn btn-default border w-300 bg-light rounded-0 text-decoration-none">Create Account</Link>
                </form> 
            </div>
        </div>
    )
}

export default Login