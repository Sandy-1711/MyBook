import React, { useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
const UpdateProfile = (props) => {
    var [options, setOptions] = useState(true);
    var [changeUsername, setChangeUsername] = useState(false);
    var [changeBio, setChangeBio] = useState(false);
    var [changeProfilePicture, setChangeProfilePicture] = useState(false);
    var [data, setData] = useState();
    const user = JSON.parse(localStorage.getItem('user'));
    async function update(obj) {
        props.setLoading(true);
        await fetch('https://mybookapi.sandeepsingh126.repl.co/api/user/' + user._id + '/profile/update', {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
                'token': 'Bearer ' + user.token
            }
        }).then(async function (response) {
            // console.log(response);
            props.setLoading(false);
            props.setUpdateProfile();
            await props.fetch(obj);
            await props.fetchProfile();
            // navigate('/profile');
            return response.json();
        }).then(function (json) {
            return json;
        }).catch(function (err) {
            console.log(err);
        })
    }

    function handleClick(e) {
        e.preventDefault();
        var obj;
        if (changeUsername) {
            obj = { username: data };
            update(obj);
        }
        if (changeBio) {
            obj = { bio: data };
            update(obj);
        }
        if (changeProfilePicture) {
            var newprofilephoto = "";
            const reader = new FileReader();
            const file = document.querySelector("input[type=file]").files[0];
            if (file) {

                reader.readAsDataURL(file);
                reader.onloadend = async () => {
                    newprofilephoto = reader.result;
                    obj={profilePicture:newprofilephoto};
                    update(obj);
                }
            }

        }

    }
    function handleOptions() {
        setOptions(!options);
    }

    function handleChange(e) {
        setData(e.target.value);
        // console.log(data);
    }

    return (
        <div className='updateProfile'>
            <h2>Update Profile</h2>

            {options && <div className='options1'>
                <ul>
                    <li onClick={function () {
                        setChangeUsername(true);
                        handleOptions();
                    }}>Change Username</li>
                    <li onClick={function () {
                        setChangeBio(true);
                        handleOptions();
                    }}>Change Bio</li>
                    <li onClick={function () {
                        setChangeProfilePicture(true);
                        handleOptions();
                    }}>Change Profile Photo</li>
                </ul>
            </div>}
            {!options && <form>
                {changeUsername && <input onChange={handleChange} value={data} type='text' placeholder="Set new username" name='username' required />}
                {changeBio && <input onChange={handleChange} value={data} type='text' placeholder="Set new bio" name='bio' required />}
                {changeProfilePicture && <input type='file' name='profilePicture' required />}
                <button onClick={handleClick}>Update</button>
            </form>}
            <div className='shutOff' ><CancelIcon onClick={function(){
                props.setUpdateProfile(false);
            }} /></div>
        </div>
    )
}

export default UpdateProfile