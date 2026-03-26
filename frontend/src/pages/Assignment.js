import { useState } from 'react'
import API from '../services/api'

function Assignment() {
  const [assetId, setAssetId] = useState('')
  const [base, setBase] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [type, setType] = useState('assigned')

  const handleSubmit = async () => {
    await API.post('/api/assignment', { assetId, base, quantity, type })
    alert('Done')
  }

  return (
    <div>
      <h2>Assignment</h2>
      <div className="card">
        <input placeholder="Asset" onChange={(e) => setAssetId(e.target.value)} />
        <input placeholder="Base" onChange={(e) => setBase(e.target.value)} />
        <input type="number" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />
        <select onChange={(e) => setType(e.target.value)}>
          <option value="assigned">Assigned</option>
          <option value="expended">Expended</option>
        </select>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default Assignment