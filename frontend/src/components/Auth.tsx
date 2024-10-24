const Auth = () => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-4xl mb-3">Create an account</h1>
          <p className="mb-5">
            Already have an account?
            <span className="underline"> login</span>
          </p>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-col justify-start -20">
            <label className="mb-2" htmlFor="">
              Username
            </label>

            <input
              className="mb-1 p-2 border-2 border-slate-300 rounded-md"
              type="text"
              placeholder="Enter your username"
            />
          </div>

          <div className="flex flex-col justify-start h-20">
            <label className="mb-2" htmlFor="">
              Email
            </label>

            <input
              className="mb-2 border-2 border-slate-300 p-2 rounded-md"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col justify-start  h-20">
            <label className="mb-2 " htmlFor="">
              Password
            </label>

            <input
              className="mb-2 border-2 border-slate-300 p-2 rounded-md"
              type="password"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div className="w-full flex justify-center mt-5 bg-black text-white p-2 rounded-md hover:cursor-pointer">
          <button>Signup</button>
        </div>
      </div>
    </div>
  )
}

export default Auth
