import React from 'react'
import Header from './Header'

const Home = () => {
  return (
    <>
    <Header/>
      <div className='contentArea'>

        <div className='homepage'>
          <div className='homepageContent'>
            <h1>Hello there!</h1>
            <p>Welcome to MyBook, a full stack replica of <span>Instagram</span>.</p>
            <p>Feel free to dive into various sections of the application.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home