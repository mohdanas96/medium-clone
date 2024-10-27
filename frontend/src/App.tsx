import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { SignUpPage } from './pages/Signup.page'
import { Home } from './pages/Home.page'
import SignInPage from './pages/Signin.page'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" Component={SignUpPage} />
          <Route path="/blog" Component={Home} />
          <Route path="/signin" Component={SignInPage} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
