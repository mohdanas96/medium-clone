import Auth from '../components/Auth'
import Quote from '../components/Quote'

export const Signup = () => {
  return (
    <div className="grid md:grid-cols-2">
      <Auth />
      <Quote />
    </div>
  )
}
