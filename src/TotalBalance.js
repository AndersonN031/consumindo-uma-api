const totalBalanceElement = document.getElementById('saldo-total')

export async function uptdateTotalBalance() {
  const response = await fetch('http://localhost:3000/transactions');
  const transactions = await response.json();

  const saldoTotal = transactions.reduce((total, transaction) => {
    return total + parseFloat(transaction.value)
  }, 0);

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  if (!isNaN(saldoTotal)) {
    totalBalanceElement.textContent = `Saldo Total: ${formatter.format(saldoTotal)}`
    if (saldoTotal < 0) {
      totalBalanceElement.classList.add('negative-balance')
    } else {
      totalBalanceElement.classList.add('positive-balance')
    }
  } else {
    totalBalanceElement.textContent = 'Saldo Total: Error'
  }

}
