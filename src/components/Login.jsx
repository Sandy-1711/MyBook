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
            else {
                alert('Error signing in');
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

            {loading && <div className='loader'><div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
                            <div class="wheel"></div>
                            <div class="hamster">
                                <div class="hamster__body">
                                    <div class="hamster__head">
                                        <div class="hamster__ear"></div>
                                        <div class="hamster__eye"></div>
                                        <div class="hamster__nose"></div>
                                    </div>
                                    <div class="hamster__limb hamster__limb--fr"></div>
                                    <div class="hamster__limb hamster__limb--fl"></div>
                                    <div class="hamster__limb hamster__limb--br"></div>
                                    <div class="hamster__limb hamster__limb--bl"></div>
                                    <div class="hamster__tail"></div>
                                </div>
                            </div>
                            <div class="spoke"></div>
                        </div></div>}

            {!loading && <div className='loginCard'>
                <p>Login</p>
                <form>
                    <input required onChange={handleChange} value={formData.username} name='username' type="text" placeholder="Username" />
                    <input required onChange={handleChange} name='password' value={formData.password} type="password" placeholder="Password" />
                    <button onClick={handleClick}>Login</button>
                    <p>Not registered yet? <a onClick={function () {
                        navigate('/signup')
                    }}>Register</a></p>
                </form>
            </div>}
        </div>

    )
}

export default Login