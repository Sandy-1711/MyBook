import React, {  useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import Header from './Header'
const Followers = () => {
  // const { user } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('user'));
  var [followers, setFollowers] = useState([]);
  var [loading, setLoading] = useState(false);
  async function fetchData() {
    setLoading(true);
    await fetch('https://mybookapi.sandeepsingh126.repl.co/api/user/' + user._id + '/followers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': 'Bearer ' + user.token,
      }
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      setFollowers(json);
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
    <>
      <Header />
      <div className='contentArea'>
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
        {!loading && <div className='followersPage'>
          <h1>Followers</h1>
          <div className='followers'>
            <h1>{followers.length} Followers</h1>
            {
              user.numfollowers !== 0 &&
              followers.map(function (element) {
                return <div key={element._id} className='follower'>
                  <Avatar src={element.profilePic} alt={element.username} />
                  <p>{element.username}</p>
                </div>
              })
            }

          </div>

        </div>}
      </div>
    </>
  )
}

export default Followers