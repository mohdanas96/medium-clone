import Signup from '../components/Signup'
import Quote from '../components/Quote'

export const SignUpPage = () => {
  return (
    <div className="grid md:grid-cols-2">
      <Signup />
      <Quote />
    </div>
  )
}
