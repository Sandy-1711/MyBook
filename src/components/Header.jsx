import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
const Header = () => {
    const history=useLocation();
    const path=history.pathname.substring(1);
    // console.log(path);
    return (
        <div className='header'>
            <div className='logo'>
                <h1>MyBook</h1>
            </div>
            <div className='links'>
                <ul>
                    <li><Link to="/"><HomeIcon style={{color:path==='' ? '#5e80e3':'#efe8de'}} className='icons'/><span style={{color:path==='' ? '#5e80e3':'#efe8de'}}>Home</span></Link></li>
                    <li><Link to="/search"><SearchIcon style={{color:path==='search' ? '#5e80e3':'#efe8de'}} className='icons'/><span style={{color:path==='search' ? '#5e80e3':'#efe8de'}}>Search</span></Link></li>
                    <li><Link to="/followers"><GroupIcon style={{color:path==='followers' ? '#5e80e3':'#efe8de'}} className='icons'/><span style={{color:path==='followers' ? '#5e80e3':'#efe8de'}}>Followers</span></Link></li>
                    <li><Link to="/following"><GroupsIcon style={{color:path==='following' ? '#5e80e3':'#efe8de'}} className='icons'/><span style={{color:path==='following' ? '#5e80e3':'#efe8de'}}>Following</span></Link></li>
                    <li><Link to="/profile"><PermIdentityIcon style={{color:path==='profile' ? '#5e80e3':'#efe8de'}} className='icons'/><span style={{color:path==='profile' ? '#5e80e3':'#efe8de'}}>Profile</span></Link></li>
                    <li><Link to="/login"><LogoutIcon className='icons'/><span>Logout</span></Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Header