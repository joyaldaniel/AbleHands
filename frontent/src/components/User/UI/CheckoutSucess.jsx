import React from 'react'
import { useNavigate } from 'react-router-dom'

function CheckoutSucess() {
  const navigate = useNavigate()
  return (
   
    <div>
      <h2> Back To Voluentere Listing page</h2>
      <button onClick={ navigate('/VoluenteerListing')}>Back to home</button>
    </div>
  )
}

export default CheckoutSucess
