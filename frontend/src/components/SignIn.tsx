import { useState } from 'react'
import LabelledInputBox from './LabelledInputBox'
import { SigninParams } from '@mohdanas/common-medium/dist/user-types'
import AuthHeading from './AuthHeading'
import axios from 'axios'
import { BASE_URL } from '../../config'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [signInParams, setSignInParams] = useState<SigninParams>({
    username: '',
    password: '',
  })

  const navigate = useNavigate()

  const signInHandler = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/user/signin`,
        signInParams
      )

      const data = response.data

      console.log(data)

      localStorage.setItem('jwtKey', data.jwt)

      navigate('/')
    } catch (error) {
      console.log(error)
      alert('Sign in failed, try again.')
    }
  }
  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center h-screen flex-col">
        <AuthHeading type="signin" />

        <LabelledInputBox
          label="Username"
          placeholder="Enter your username"
          type="text"
          onChange={(e) => {
            setSignInParams({ ...signInParams, username: e.target.value })
          }}
        />

        <LabelledInputBox
          label="Password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => {
            setSignInParams({ ...signInParams, password: e.target.value })
          }}
        />

        <div className="w-full flex justify-center mt-5 bg-black text-white p-2 rounded-md hover:cursor-pointer">
          <button onClick={signInHandler}>Sign in</button>
        </div>
      </div>
    </div>
  )
}

export default SignIn
