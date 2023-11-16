import { renderTransaction } from "./Render.js"
import { uptdateTotalBalance } from "./TotalBalance.js"

export async function fetchTransaction() {
  const response = await fetch('http://localhost:3000/transactions')
  const newResponse = await response.json()

  newResponse.forEach(transaction => {
    renderTransaction(transaction)
  })

  uptdateTotalBalance()
}