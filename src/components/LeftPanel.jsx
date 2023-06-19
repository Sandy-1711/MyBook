import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../context/AuthContext';
const LeftPanel = (props) => {
    const {user}=useContext(AuthContext);
    console.log(user);
    return (
        <div className='rightPanel'>
            <div className='profileArea'>
                <div className='profileImage'>
                    <Avatar alt={user.username} src={props.src} />
                </div>
                <div className='profileInfo'>
                    <h1>{props.username}</h1>
                    <div className='followArea'>
                        <p><button>{user.numfollowers}<span>Followers</span></button></p>
                        <p><button>{user.numfollowing}<span>Following</span></button></p>
                    </div>
                </div>
                <div className='bio'>
                    <h1>Bio</h1>
                    <p>{props.bio}</p>
                </div>
            </div>
        </div>
    )
}
export default LeftPanel