import Quote from '../components/Quote'
import SignIn from '../components/Signin'

const SignInPage = () => {
  return (
    <div className="grid md:grid-cols-2">
      <SignIn />
      <Quote />
    </div>
  )
}

export default SignInPage
