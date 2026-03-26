import { useState } from 'react'
import API from '../services/api'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const res = await API.post('/api/auth/login', { email, password })
    localStorage.setItem('token', res.data.token)
    window.location.href = '/dashboard'
  }

  return (
    <div className="card">
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login