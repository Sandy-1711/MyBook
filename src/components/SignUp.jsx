import React, { useState } from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    var [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    var [loading, setLoading] = useState(false);
    var [created, setCreated] = useState(false);
    var [image, setImage] = useState(null);
    const navigate=useNavigate();
    async function postForm(profpic) {
        setLoading(true);
        await fetch('https://mybookapi.sandeepsingh126.repl.co/api/auth/signup', {
            method: 'POST',
            mode: 'cors',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: formData.username,
                email: formData.email,
                profilePicture: profpic,
                password: formData.password
            })
        }).then(function (response) {
            // console.log(response);
            if (response.status === 201) {
                setCreated(true);
            }
            setLoading(false);
            return response.json();
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
        var profilePic = "";
        const reader = new FileReader();
        const file = document.querySelector("input[type=file]").files[0];
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                profilePic = reader.result;
                postForm(profilePic);

            }
        }
        setFormData({
            username: "",
            password: "",
            email: "",
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
                <p>SignUp</p>
                <form>
                    <input onChange={handleChange} value={formData.username} type="text" name='username' placeholder="Username" />
                    <input onChange={handleChange} value={formData.email} type="email" name='email' placeholder="Email" />
                    <input onChange={handleChange} value={formData.password} type="password" name='password' placeholder="Password" />
                    <label htmlFor="profilePic">
                        Upload Profile Image
                        <AccountBoxIcon />
                        <span>{image}</span>
                        <input id='profilePic' onChange={function (e) { setImage(e.target.value.substring(12)) }} type="file" name='profilePic' />
                    </label>
                    <button onClick={handleClick}>SignUp</button>
                    {created && <h2 style={{ color: 'red',textAlign:'center' }}>Account Created</h2>}
                    <p>Already a user? <a onClick={function(){
                        navigate('/login')
                    }}>Login</a></p>
                </form>
            </div>}
        </div>

    )
}

export default SignUp