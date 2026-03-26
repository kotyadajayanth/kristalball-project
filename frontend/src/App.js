import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Purchase from './pages/Purchase'
import Transfer from './pages/Transfer'
import Assignment from './pages/Assignment'
import './index.css'

function App() {

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <BrowserRouter>

      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/purchase">Purchase</Link>
        <Link to="/transfer">Transfer</Link>
        <Link to="/assignment">Assignment</Link>

        <button onClick={handleLogout} style={{ marginLeft: 'auto' }}>
          Logout
        </button>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/assignment" element={<Assignment />} />
        </Routes>
      </div>

    </BrowserRouter>
  )
}

export default App