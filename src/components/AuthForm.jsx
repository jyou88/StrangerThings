import React, { useState } from 'react';
import { authenticateUser } from '../api/auth';
import { Link } from 'react-router-dom';

const AuthForm = ({ name, buttonName }) => {
  const [loginErrors, setLoginErrors] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formName = event.target.name;
    const username = event.target.username.value;
    const password = event.target.password.value;
    if (!username || !password || password.length < 6) {
      const errorMessage = 'Either no input or password too short'
      console.log(errorMessage);
      setLoginErrors([errorMessage])
      return;
    }
    authenticateUser(username, password, formName);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='text' name='password' />
        </div>
        <button>{buttonName}</button>
      </form>
      {name === 'login' ? (
        <p>
          Not a user yet? <Link to='/signup'>Sign Up Here</Link>!
        </p>
      ) : (
        <p>
          Already have an account? <Link to='/login'>Login Here</Link>!
        </p>
      )}
      {loginErrors.map((message, index) => {
        return (<p key={index} >{message}</p>)
      }

      )}
    </div>
  );
};

export const LoginAuth = () => { return (<AuthForm name={'login'} buttonName={'Login'} />) };
export const SignupAuth = () => { return (<AuthForm name={'register'} buttonName={'Register'} />) };