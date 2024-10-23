import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Blog } from './pages/Blog'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/user" Component={Signup} />
          <Route path="/blog" Component={Blog} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
