import { useState } from 'react'
import API from '../services/api'

function Transfer() {
  const [assetId, setAssetId] = useState('')
  const [fromBase, setFromBase] = useState('')
  const [toBase, setToBase] = useState('')
  const [quantity, setQuantity] = useState(0)

  const handleSubmit = async () => {
    await API.post('/api/transfer', { assetId, fromBase, toBase, quantity })
    alert('Transfer Done')
  }

  return (
    <div>
      <h2>Transfer</h2>
      <div className="card">
        <input placeholder="Asset" onChange={(e) => setAssetId(e.target.value)} />
        <input placeholder="From Base" onChange={(e) => setFromBase(e.target.value)} />
        <input placeholder="To Base" onChange={(e) => setToBase(e.target.value)} />
        <input type="number" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default Transfer