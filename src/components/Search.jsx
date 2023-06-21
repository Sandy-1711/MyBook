import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Header from './Header';
import { Avatar, Button } from '@mui/material'

const Search = () => {
  var [loading, setLoading] = useState(false);
  var [show, setShow] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  var [data, setData] = useState({});
  var [search, setSearch] = useState('');
  function handleChange(e) {
    setSearch(e.target.value);
  }
  async function searchUser() {
    setLoading(true);
    await fetch('https://mybookapi.sandeepsingh126.repl.co/api/user/' + user._id + '/' + search, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': 'Bearer ' + user.token,
      }
    }).then(function (response) {
      if (response.status === 200) {
        setShow(true);
      }
      else{
        alert('No user found');
      }
      return response.json();
    }).then(function (json) {
      setData(json)
      setLoading(false);
      return json;
    }).catch(function (err) {
      console.log(err);
    })
  }



  function handleClick(e) {
    e.preventDefault();
    searchUser();
  }

  async function unfollow() {
    await fetch('https://mybookapi.sandeepsingh126.repl.co/api/user/' + user._id + '/unfollow/' + data.username, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': 'Bearer ' + user.token,
      }
    }).then(function (response) {
      if (response.status === 204) {
        // console.log(response.status);
        searchUser();
        document.querySelector('.followunfollow').setAttribute('disabled',false);

      }
      return response.json();
    }).then(function (json) {

      return json;
    }).catch(function (err) {
      console.log(err);
    })
  }

  async function follow() {
    await fetch('https://mybookapi.sandeepsingh126.repl.co/api/user/' + user._id + '/follow/' + data.username, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': 'Bearer ' + user.token,
      }
    }).then(function (response) {
      if (response.status === 201) {
        searchUser();
        document.querySelector('.followunfollow').setAttribute('disabled',false);

      }
      return response.json();
    }).then(function (json) {
      // console.log(json);
      return json;
    }).catch(function (err) {
      console.log(err);
    })
  }


  function handleFollow() {
    document.querySelector('.followunfollow').setAttribute('disabled',true);
    if (!data.isFollower) {
      follow();
    }
    else if (data.isFollower) {
      unfollow();
    }
  }







  return (
    <>
      <Header />
      <div className='contentArea'>
        <div className='searchPage'>
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
          <div className='searchBarArea'>
            <input placeholder='Search user' onChange={handleChange} value={search} name='userSearch' id='userSearch' className='searchBar' />
            <button style={{ borderRadius: '50%' }} onClick={handleClick}><SearchIcon /></button>
          </div>



          {!loading && show && <div className='profilePage'>
            <div className='profile'>
              <Avatar src={data.profilePicture} alt={data.username} />
              <div className='profileDataArea'>
                <div className='profileData'>
                  <p>{data.username}</p>
                  {/* {console.log(data.isFollower)} */}
                  {data.isFollower === 2 && null}
                  {data.isFollower === true && <Button className='followunfollow' onClick={handleFollow} variant="contained">Unfollow</Button>}
                  {data.isFollower === false && <Button className='followunfollow' onClick={handleFollow} variant="contained">Follow</Button>}

                </div>
                <div className='numData'>
                  <p><span>{data.numposts}</span> posts</p>
                  <p><span>{data.numfollowers}</span> <a href="/followers">followers</a></p>
                  <p><span>{data.numfollowing}</span> <a href='/following'>following</a></p>
                </div>
                <div className='bio'>
                  <p>{data.bio}</p>
                </div>
              </div>
            </div>

            <div className='listofposts'>


              {data.username && data.posts.map((item, index) => (
                <div key={index}>
                  <img
                    src={`${item.image}`}
                    srcSet={`${item.image}`}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
              ))
              }

              {data.numposts === 0 && <div className='notfound'><h1>No Posts Found</h1></div>}


            </div>
          </div>}
        </div>
      </div>
    </>
  );
}

export default Search