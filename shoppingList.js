const getData = async (url, method, elementId, onSuccess) => {
    const response = await fetch(url, {
        method: method
    })

    const data = await response.json()

    if (Array.isArray(data)) {
        if (response.status === 200) {
            onSuccess(data, elementId)
        } else {
            console.error('ERROR')
        }
    }
}

const deleteProduct = async (productId) => {
    await fetch(`http://localhost:3000/products/${productId}`, { method: 'DELETE' })
}

const asTable = (data, tableId) => {
    data.forEach((product) => {
        const tableRow = document.createElement('tr')

        if (!product.id || !product.name || !product.price) {
            return
        }
        const id = document.createElement('td')
        id.textContent = product.id
        tableRow.appendChild(id)

        const name = document.createElement('td')
        name.textContent = product.name
        tableRow.appendChild(name)

        const price = document.createElement('td')
        price.textContent = product.price
        tableRow.appendChild(price)

        const deleteField = document.createElement('td')
        const deleteButton = document.createElement('button')
        deleteButton.textContent = "Usuń Produkt"
        deleteButton.onclick = () => deleteProduct(product.id)
        deleteField.appendChild(deleteButton)
        tableRow.appendChild(deleteField)

        tableId.appendChild(tableRow)
    })
}

const sendRequest = async (url, method, body, onSuccess) => {
    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body)
    })

    const data = await response.json()

    if (response.status === 201) {
        onSuccess(data)
    } else {
        console.error('ERROR')
    }
}

// ----------------------------------------------------------------------------------

const shoppingTable = document.getElementById('shoppingTable');
getData('http://localhost:3000/products', 'GET', shoppingTable, asTable)

const newProductForm = document.getElementById('new-product-form');

newProductForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const shopingTable = document.getElementById('shoppingTable')
    const id = JSON.stringify(shopingTable.rows.length)

    const nameInput = document.getElementById('name-input')
    const priceInput = document.getElementById('price-input')

    if (nameInput.value !== '' && priceInput.value !== '') {
        sendRequest(
            'http://localhost:3000/products',
            'POST',
            { id: id, name: nameInput.value, price: priceInput.value },
            (data) => {
                console.log(data);
            })
    }
})
