export function renderTransaction(transactionData) {
  const transaction = document.createElement('transaction')
  transaction.classList.add('article')
  transaction.id = `transaction-${transactionData.id}`

  const namePerson = document.createElement('h3')
  namePerson.classList.add('transaction-name')
  namePerson.textContent = transactionData.name

  const valueTransaction = document.createElement('div')
  valueTransaction.classList.add('transaction-value')

  const numericValue = parseFloat(transactionData.value);
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  valueTransaction.textContent = `${formatter.format(numericValue)} `;

  if (numericValue < 0) {
    valueTransaction.classList.add('negative-value')
  } else {
    valueTransaction.classList.add('positive-value')
  }

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remover';
  removeButton.id = 'removeButton'
  removeButton.addEventListener('click', async () => {
    await fetch(`http://localhost:3000/transactions/${transactionData.id}`, {
      method: 'DELETE'
    });
    transaction.remove();
  });

  const editButton = document.createElement('button');
  editButton.textContent = 'Editar';
  editButton.id = 'editButton'
  editButton.addEventListener('click', () => {
    // Preencha os campos de entrada com os valores da transação para edição
    document.getElementById('name').value = transactionData.name;
    document.getElementById('value').value = transactionData.value;

    // Defina uma função de callback para o botão "Salvar" que envia uma solicitação PUT
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Salvar';
    saveButton.addEventListener('click', async () => {
      const editedTransactionData = {
        name: document.getElementById('name').value,
        value: document.getElementById('value').value
      };

      // Envie uma solicitação PUT para atualizar a transação
      const response = await fetch(`http://localhost:3000/transactions/${transactionData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedTransactionData)
      });

      const updatedTransaction = await response.json();

      // Atualize os valores na exibição
      transactionData.name = updatedTransaction.name;
      transactionData.value = updatedTransaction.value;

      // Atualize os campos de exibição
      namePerson.textContent = transactionData.name
      const updatedNumericValue = parseFloat(transactionData.value);
      valueTransaction.textContent = `${formatter.format(updatedNumericValue)} `;

      // Remova o botão "Salvar"
      saveButton.remove();
    });

    // Adicione o botão "Salvar" aos campos de edição
    transaction.append(namePerson, valueTransaction, removeButton, editButton, saveButton);
  });

  transaction.append(namePerson, valueTransaction, removeButton, editButton)
  document.querySelector('#transactions').appendChild(transaction)
}