import { useState, useEffect } from "react";

import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./styles.css";

import { Bloglist } from "./components/Bloglist";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    blogService.getAll().then((initialBlog) => {
      setBlogs(initialBlog);
    });
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const logout = () => {
    window.localStorage.clear();
    window.location.reload();
  };
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
 

  if (user === null) {
    return (
      <div>
        <Notification
          message={errorMessage || successMessage}
          type={errorMessage ? "error" : "success"}
        />
        <h2>Log in to Application</h2>
        <div>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Notification
        message={errorMessage || successMessage}
        type={errorMessage ? "error" : "success"}
      />
      <p>
        {user.name} is logged in<button onClick={() => logout()}>logout</button>
      </p>
      <h2>blogs</h2>
    

      <Bloglist></Bloglist>
        </div>
        
  );
};

export default App;

