import React from 'react'
import { SignUp } from '../features/auth/components/SignUp'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../features/auth/authSlice'

const SignUpPage = () => {

  const user = useSelector(selectLoggedInUser);

  return (
    <div>

    {
      user && <Navigate to={"/"} replace={true}/>
    }
  
      <SignUp/>
        
    </div>
  )
}

export default SignUpPage