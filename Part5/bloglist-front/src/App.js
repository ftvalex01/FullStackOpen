import React,{ useState, useEffect } from "react";
import blogService from "./services/blogs";

import { Bloglist } from "./components/Bloglist";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";

const App = () => {
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  })
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);


  const notify = (notification) => {
    setNotification(notification)
    setTimeout(()=>{
      setNotification({message:null,type:null})
    },5000)
  }

  const login = (user) => {
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
  }
  const logout = () => {
    window.localStorage.clear();
    window.location.reload();
    blogService.clearToken();
  };
  

  if (!user) {
    return (
      <div>
        <Header title="log in" notification={notification}/>
        <LoginForm login={login} notify={notify}></LoginForm>
        
      </div>
    );
  }
  return (
    <div>
     <Header title="Blogs" notification={notification} />
      <p>
        {user.name} is logged in<button onClick={() => logout()}>logout</button>
      </p>
      
    

      <Bloglist user={user} notify={notify}></Bloglist>
        </div>
        
  );
};

export default App;

