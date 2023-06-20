import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom';
const AllUsers = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    var [loading, setLoading] = useState(false);
    var [users, setUsers] = useState([]);
    const navigate=useNavigate();
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
    }, [])
    return (
        <div>
            {
                !user.isAdmin && function(){
                    alert("Not an admin, redirecting to homepage");
                    navigate('/');
                }
            }
            {
                user.isAdmin &&
                <div>


                    <Header />
                    <div className='contentArea'>
                        {loading && <section class="dots-container">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </section>}
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