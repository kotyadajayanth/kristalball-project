import { useEffect, useState } from 'react'
import API from '../services/api'

function Dashboard() {
  const [data, setData] = useState({})

  useEffect(() => {
    API.get('/api/dashboard?base=BaseB&assetId=AK47')
      .then(res => setData(res.data))
  }, [])

  return (
  <div>
    <h2>Dashboard</h2>

    <div className="grid">
      <div className="card">Opening: {data.opening}</div>
      <div className="card">Purchases: {data.purchases}</div>
      <div className="card">Transfer In: {data.transferIn}</div>
      <div className="card">Transfer Out: {data.transferOut}</div>
      <div className="card">Assigned: {data.assigned}</div>
      <div className="card">Expended: {data.expended}</div>
      <div className="card">Net Movement: {data.netMovement}</div>
      <div className="card">Closing: {data.closing}</div>
    </div>
  </div>
)
}

export default Dashboard