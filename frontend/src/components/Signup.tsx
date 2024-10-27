import { useState } from 'react'
import LabelledInputBox from './LabelledInputBox'
import { SignupParams } from '@mohdanas/common-medium/dist/user-types'
import AuthHeading from './AuthHeading'

const Signup = () => {
  const [signupParams, setSignupParams] = useState<SignupParams>({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })

  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center h-screen flex-col">
        <AuthHeading type="signup" />

        <LabelledInputBox
          label="Username"
          placeholder="Enter your username"
          type="text"
          onChange={(e) => {
            setSignupParams({ ...signupParams, username: e.target.value })
          }}
        />

        <LabelledInputBox
          label="Email"
          placeholder="Enter your email"
          type="email"
          onChange={(e) => {
            setSignupParams({ ...signupParams, email: e.target.value })
          }}
        />

        <LabelledInputBox
          label="Password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => {
            setSignupParams({ ...signupParams, password: e.target.value })
          }}
        />

        <LabelledInputBox
          label="First name"
          placeholder="Enter your first name"
          type="text"
          onChange={(e) => {
            setSignupParams({ ...signupParams, firstName: e.target.value })
          }}
        />

        <LabelledInputBox
          label="Last name"
          placeholder="Enter your last name"
          type="text"
          onChange={(e) => {
            setSignupParams({ ...signupParams, lastName: e.target.value })
          }}
        />

        <div className="w-full flex justify-center mt-5 bg-black text-white p-2 rounded-md hover:cursor-pointer">
          <button
            onClick={() => {
              console.log(signupParams)
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signup
