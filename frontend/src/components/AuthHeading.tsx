import { Link } from 'react-router-dom'

const AuthHeading = ({ type }: { type: 'signin' | 'signup' }) => {
  const paddingStyle = '0px 40px 0px 40px'

  return (
    <div
      className="flex flex-col items-center"
      style={{ padding: paddingStyle }}
    >
      <h1 className="font-bold text-4xl mb-3">
        {type === 'signin' ? 'Sign In' : 'Sign Up'}
      </h1>
      <p className="mb-5">
        {type === 'signin'
          ? `Doesn't have an account`
          : 'Already have an account?'}
        <Link
          className="underline text-slate-600 ml-1"
          to={type === 'signin' ? '/signup' : '/signin'}
        >
          {type === 'signin' ? 'Sign Up' : 'Sign In'}
        </Link>
      </p>
    </div>
  )
}

export default AuthHeading
