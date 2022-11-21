import React,{ useState } from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'



const LoginForm = ({ login,notify }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username,password })
      login(user)
      notify({
        message:`${user.name} logged in`,
        type:'success'
      })
    } catch (error) {
      notify({
        message:'Wrong name or password',
        type:'error'
      })
    }
  }


  return (
    <div>
      <p>Login Form</p>
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
  )
}
LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
}
export default LoginForm