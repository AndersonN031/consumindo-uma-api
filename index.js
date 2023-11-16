import { fetchTransaction } from "./src/Fetch.js"
import { renderTransaction } from "./src/Render.js"
import { uptdateTotalBalance } from "./src/TotalBalance.js"

document.addEventListener('DOMContentLoaded', () => {
  fetchTransaction()
})

const form = document.querySelector('form')

form.addEventListener('submit', async (ev) => {
  ev.preventDefault()

  const transactionData = {
    name: document.getElementById('name').value,
    value: document.getElementById('value').value
  }

  const response = await fetch('http://localhost:3000/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transactionData)
  })

  const savedTransaction = await response.json()
  renderTransaction(savedTransaction)
  uptdateTotalBalance()
  form.reset()

  console.log(savedTransaction)
})

