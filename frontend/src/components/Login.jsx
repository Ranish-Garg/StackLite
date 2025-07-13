import React from "react";
import "./Login.css";
import { Link,useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [canseepassword, setcanseepassword] = useState(false);
   const [username , setusername] = useState("")
   const [password,setpassword] = useState("")
   const navigate = useNavigate();
 
   const handlelogin = async(e)=>
   {
      e.preventDefault();
   
    const logindata = 
    {
      username,
      password
    }
   try {
      const response = await axios.post(
         "http://localhost:3000/api/v1/users/login", 
        logindata,
         { 
           withCredentials: true, 
         }
       );
    
       console.log(response);
       navigate("/")
   } catch (error) {
    console.log(error.message)
   }
   }


  return (
    <>
      <div className="form-wrapper">
        <form className="form">
          <div className="flex-column">
            <label>Username</label>
          </div>
          <div className="inputForm">
            <img src="../../public/user-round.svg" alt="" />
            <input
              type="text"
              className="input"
              placeholder="Enter your Username"
               value={username}
              onChange={(e)=>
              {
                setusername(e.target.value)
              }
              }
            />
          </div>

          <div className="flex-column">
            <label>Password</label>
          </div>
          <div className="inputForm">
            <svg
              height={20}
              viewBox="-64 0 512 512"
              width={20}
              xmlns="http://www.w3.org/2000/svg"
            
            >
              <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
              <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
            </svg>
            <input
              type= {canseepassword ? "text" : "password"}
              className="input"
              placeholder="Enter your Password"
               value={password}
              onChange={(e)=>
              {
                setpassword(e.target.value)
              }
              }
            />
            {/* can see password or not  */}

            {
              canseepassword ? (<svg
              className="cursorpointer lucide lucide-eye-off-icon lucide-eye-off"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={()=>
              {
                setcanseepassword(!canseepassword)
              }
              }

            >
              <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
              <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
              <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
              <path d="m2 2 20 20" />
            </svg>):
             (<svg xmlns="http://www.w3.org/2000/svg"
               width="24" 
               height="24" 
               viewBox="0 0 24 24" 
               fill="none" 
               stroke="black" 
               stroke-width="2" 
               stroke-linecap="round" 
               stroke-linejoin="round" 
               className="cursorpointer lucide lucide-eye-icon lucide-eye"
                 onClick={()=>
              {
                setcanseepassword(!canseepassword)
              }
              }

               ><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>)
            }
            
           
            

          </div>

          <button 
          className="button-submit"
          onClick={handlelogin}
          >Login</button>
          <p className="p">
            Don't have an account?{" "}
            <Link to="/Register">
              <span className="span">Register</span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
