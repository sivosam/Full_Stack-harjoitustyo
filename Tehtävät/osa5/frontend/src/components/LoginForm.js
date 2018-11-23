import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
  return (
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        Username:
      <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange} />
      </div>
      <div>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange} />
      </div>
      <button type="submit">Login</button>
    </form>
  </div >
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm