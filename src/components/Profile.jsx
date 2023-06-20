import { Avatar } from '@mui/material'
import React, { useState } from 'react';
import Header from './Header';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateProfile from './UpdateProfile';
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
// import CommentIcon from '@mui/icons-material/Comment';
const Profile = () => {
  var user = JSON.parse(localStorage.getItem('user'));
  var [loading, setLoading] = useState(false);
  var [userProfile, setUserProfile] = useState(fetchProfile);
  var [options, setOptions] = useState(false);
  var [post, setPost] = useState(false);
  var [updateProfile, setUpdateProfile] = useState(false);
  var [caption, setCaption] = useState(null);
  var [selectedImage, setSelectedimage] = useState();
  var [showSelectedImage, setShowSelectedImage] = useState(false);
  // var [showComment,setShowComment]=useState(false);
  const navigate = useNavigate();
  console.log(userProfile);

  async function fetchProfile() {

    setLoading(true);
    user = await JSON.parse(localStorage.getItem('user'));
    await fetch('https://mybookapi.sandeepsingh126.repl.co/api/user/' + user._id + '/' + user.username + '', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': 'Bearer ' + user.token
      }
    }).then(function (response) {
      
      return response.json();
    }).then(function (json) {

      setUserProfile(json);
      setLoading(false);
      return json;

    }).catch(function (err) {
      console.log(err);
    })
  }

  async function postForm(postImage) {
    setLoading(true);
    const postData = { image: postImage, caption: caption };
    // console.log(postData);
    await fetch('https://mybookapi.sandeepsingh126.repl.co/api/user/' + user._id + '/newpost', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': 'Bearer ' + user.token
      },
      body: JSON.stringify(postData)
    }).then(function (response) {
      setLoading(false);
      return response.json();
    }).then(function (json) {
      fetchProfile();
      return json;
    }).catch(function (err) {
      console.log(err);
    })

  }

  function handleMenu() {
    setPost(true);
    setOptions(false);
  }
  function handleChange(e) {
    setCaption(e.target.value)
  }

  function handleClick(e) {
    e.preventDefault();
    var postImage = "";
    const reader = new FileReader();
    const file = document.querySelector("input[type=file]").files[0];
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        postImage = reader.result;
        postForm(postImage);

      }
    }
    setCaption("");
    setPost(false);

  }
  function handleUpdateProfile() {
    setUpdateProfile(true);
    setOptions(false);
  }

  async function fetchAfterUpdate(newusername) {
    
    var { username, ...others } = user;
    var obj = { username: newusername.username, ...others };
    localStorage.setItem('user', JSON.stringify(obj));
    // navigate('/profile');
  }
  async function deletePost() {
    setLoading(true);
    await fetch('https://mybookapi.sandeepsingh126.repl.co/api/user/' + user._id + '/removePost/' + selectedImage.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': 'Bearer ' + user.token
      }
    }).then(async function (response) {
      setShowSelectedImage(false);
      await fetchProfile();
      setLoading(false);
      return response.json();
    }).then(function (json) {
      return json;
    }).catch(function (err) {
      console.log(err);
    })
  }
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
        {!loading && <div className='profilePage'>
          <div className='profile'>
            <Avatar src={userProfile.profilePicture} alt={userProfile.profilePicture} />
            <div className='profileDataArea'>
              <div className='profileData'>
                <p>{userProfile.username}</p>
                <button onClick={function () {
                  setOptions(!options)
                }}><MoreHorizIcon /></button>
                {options && <div className='options'>
                  <ul>
                    <li onClick={handleMenu}>Add Posts</li>
                    <li onClick={handleUpdateProfile}>Update Profile</li>
                    <li onClick={function () {
                      navigate('/login')
                    }}>Log Out</li>
                  </ul>
                </div>}



              </div>

              {post && <div className='addPost'>
                <h1>Create Post</h1>
                <form>
                  <input type='file' name='image' />
                  <input onChange={handleChange} type='text' placeholder='caption' name='caption' />
                  <button onClick={handleClick}>Upload</button>
                </form>
                <div className='shutOff'><CancelIcon onClick={function () {
                  setPost(false);
                }} /></div>
              </div>}


              {updateProfile && <UpdateProfile fetch={fetchAfterUpdate} fetchProfile={fetchProfile} setUpdateProfile={setUpdateProfile} setLoading={setLoading} />}

              <div className='numData'>
                <p><span>{userProfile.numposts}</span> posts</p>
                <p><span>{userProfile.numfollowers}</span> <a href="/followers"><p>followers</p></a></p>
                <p><span>{userProfile.numfollowing}</span> <a href='/following'><p>following</p></a></p>
              </div>
              <div className='bio'>
                <p>{userProfile.bio}</p>
              </div>
            </div>
          </div>
          {userProfile.username &&
            <div className='listofposts'>
              {userProfile.posts.map((item) => (
                <div className='postimage' onClick={function () {
                  setShowSelectedImage(true);
                  setSelectedimage({ img: item.image, caption: item.caption, id: item._id, title: item.title });
                  console.log(selectedImage);
                }} key={item._id} caption={item.caption}>
                  <img
                    src={`${item.image}`}
                    srcSet={`${item.image}`}
                    alt={item._id}
                    loading="lazy"
                  />
                </div>
              ))}

            </div>
          }
          {showSelectedImage && <div className='post'>
            <img
              src={selectedImage.img}
              alt={selectedImage.title}
            />
            <h2>Caption: {selectedImage.caption}</h2>
            <div className='shutOff'><CancelIcon onClick={function () {
              setShowSelectedImage(false);
            }} /></div>
            <div className='deletePost'>
              <DeleteIcon onClick={deletePost} />
            </div>
            {/* <div className='likecomment'>
              <ThumbUpAltIcon />
              <CommentIcon onClick={function(){
                setShowComment(true);
              }} />
            </div> */}

          </div>}

          {userProfile.numposts === 0 &&
            <div className='notfound'><h1>No Posts Found</h1></div>
          }
        </div>
        }
      </div>
    </>
  )
}

export default Profile