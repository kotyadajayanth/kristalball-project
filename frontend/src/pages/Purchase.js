import { useState } from 'react'
import API from '../services/api'

function Purchase() {
  const [assetId, setAssetId] = useState('')
  const [base, setBase] = useState('')
  const [quantity, setQuantity] = useState(0)

  const handleSubmit = async () => {
    await API.post('/api/purchase', { assetId, base, quantity })
    alert('Purchase Added')
  }

  return (
  <div>
    <h2>Purchase</h2>

    <div className="card">
      <input placeholder="Asset" onChange={(e) => setAssetId(e.target.value)} />
      <input placeholder="Base" onChange={(e) => setBase(e.target.value)} />
      <input type="number" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  </div>
)
}

export default Purchase