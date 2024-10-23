import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { User } from './pages/User'
import { Blog } from './pages/Blog'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/user" Component={User} />
          <Route path="/blog" Component={Blog} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
