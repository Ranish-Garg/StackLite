import React from 'react'
import "./App.css" ;
import Button from './components/button';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home';

function App() {

   const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    // {
    //   path: "/login",
    //   element: <><Navbar /><Login /></>
    // },
  ])


  return (
   <>
   <nav>
    <div className='logo'>LOGO</div>
    <div className="links">
      <ul>
      <li>Home</li>
      <li>Browse Questions</li>
      <li>Ask Questions</li> 
    </ul>
    </div>
    
    <div className="auth">
      <div className="signup"><Button text="Register" color="#ED6A5A"/></div>
      <div className="signin"><Button text="Login" color= "black"/></div>
    </div>
   </nav>

   <main>
     <RouterProvider router={router} />
   </main>

   <footer>
    <div className="footer">
  <p>© {new Date().getFullYear()} Q&A Community. All rights reserved.</p>
</div>
   </footer>

   </>
  )
}

export default App