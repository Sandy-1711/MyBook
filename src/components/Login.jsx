import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    localStorage.removeItem('user');
    const navigate = useNavigate();
    const { updateUser } = useContext(AuthContext);
    var [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    var [loading, setloading] = useState(false);
    async function postForm() {
        setloading(true);
        await fetch('https://mybookapi.sandeepsingh126.repl.co/api/auth/login', {
            method: 'POST',
            mode: 'cors',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }).then(function (response) {
            setloading(false);
            if (response.status === 200) {
                navigate('/')
            }
            return response.json();

        }).then(function (json) {
            updateUser(json);

        }).catch(function (err) {
            console.log(err);
        })


    }
    function handleChange(e) {
        var { name, value } = e.target;
        setFormData(function (prev) {
            return { ...prev, [name]: value }
        })
    }
    function handleClick(e) {
        e.preventDefault();
        postForm(formData);

        setFormData({
            username: "",
            password: ""
        })
    }
    return (
        <div className='loginPage'>

            {loading && <section class="dots-container">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </section>}

            {!loading && <div className='loginCard'>
                <p>Login</p>
                <form>
                    <input required onChange={handleChange} value={formData.username} name='username' type="text" placeholder="Username" />
                    <input required onChange={handleChange} name='password' value={formData.password} type="password" placeholder="Password" />
                    <button onClick={handleClick}>Login</button>
                    <p>Not registered yet? <a onClick={function(){
                        navigate('/signup')
                    }}>Register</a></p>
                </form>
            </div>}
        </div>

    )
}

export default Login