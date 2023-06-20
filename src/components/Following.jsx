import React, {  useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import Header from './Header'

const Following = () => {
  // const { user } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('user'));

  var [following, setFollowing] = useState([]);
  var [loading, setLoading] = useState(false);
  async function fetchData() {
    setLoading(true);
    await fetch('https://mybookapi.sandeepsingh126.repl.co/api/user/' + user._id + '/following', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': 'Bearer ' + user.token,
      }
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      setFollowing(json);
      setLoading(false);
      return json;
    }).catch(function (err) {
      console.log(err);
    })


  }
  useEffect(function () {
    fetchData();
  }, [])
  return (
    <>
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
          <h1>Following</h1>
          <div className='followers'>
          <h1>{following.length} Following</h1>
            {user.numfollowing !== 0 && following.map(function (element) {
              return <div className='follower' key={element._id}>
                <Avatar src={element.profilePic} alt={element.username} />
                <p>{element.username}</p>
              </div>
            })}
          </div>
        </div>}

      </div>
    </>
  )
}

export default Following