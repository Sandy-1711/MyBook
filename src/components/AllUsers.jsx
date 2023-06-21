import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom';
const AllUsers = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    var [loading, setLoading] = useState(false);
    var [users, setUsers] = useState([]);
    const navigate = useNavigate();
    async function fetchData() {
        setLoading(true);
        await fetch('https://mybookapi.sandeepsingh126.repl.co/api/user/' + user._id + '/finduser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': 'Bearer ' + user.token,
            }
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            // console.log(json);
            setUsers(json);
            setLoading(false);
            return json;
        }).catch(function (err) {
            console.log(err);
        })
    }
    useEffect(function () {
        fetchData()
        if (!user.isAdmin) {
            alert("Not an admin, redirecting to home page");
            navigate('/');
        }
    }, [])
    return (
        <div>
            {
                user.isAdmin &&
                <div>


                    <Header />
                    <div className='contentArea'>
                        {loading && <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
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
                        </div>}
                        {!loading && <div className='followersPage'>
                            <h1>All Users</h1>
                            <div className='followers'>
                                <h1>{users.length} Users</h1>
                                {
                                    users[0] &&
                                    users.map(function (element) {
                                        return <div key={element._id} className='follower'>
                                            <Avatar src={element.profilePicture} alt={element.username} />
                                            <p>{element.username}</p>
                                        </div>
                                    })
                                }

                            </div>

                        </div>}
                    </div>

                </div>
            }
        </div>
    )
}

export default AllUsers