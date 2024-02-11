const getData = async (url, method, elementId, onSuccess) => {
    const response = await fetch(url, {
        method: method
    })

    const data = await response.json()

    if (response.status === 200) {
        onSuccess(data, elementId)
    } else {
        console.erorr('Bad request')
    }
}

const asTable = (data, tableId) => {
    tableId.get
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

const deleteProduct = async (productId) => {
    await fetch(`http://localhost:3000/products/${productId}`, {method: 'DELETE'})
    getData('http://localhost:3000/products', 'GET', shoppingTable, asTable)
}

const shoppingTable = document.getElementById('shoppingTable');

shoppingTable.getElementsByTagName('tr').forEach

getData('http://localhost:3000/products', 'GET', shoppingTable, asTable)



function addProduct() {
    const select = document.getElementById("productSelect");
    const table = document.getElementById("shoppingTable");
    const selectedOption = select.options[select.selectedIndex];
    const productInfo = selectedOption.text.split(" - ");

    if(productInfo.length > 1) {
        const row = table.insertRow(-1);
        const cellProduct = row.insertCell(0);
        const cellPrice = row.insertCell(1);
        cellProduct.innerHTML = productInfo[0];
        cellPrice.innerHTML = productInfo[1];
    }
}

function removeProduct() {
    const table = document.getElementById("shoppingTable");
    if (table.rows.length > 1) {
        table.deleteRow(-1);
    }
}

function addNewProductToList() {
    const newProductInput = document.getElementById("newProduct");
    const productPriceInput = document.getElementById("productPrice");
    const newProductName = newProductInput.value.trim();
    const productPrice = productPriceInput.value.trim();

    if (newProductName !== "" && productPrice !== "") {
        const select = document.getElementById("productSelect");
        const newOption = document.createElement("option");
        newOption.value = newProductName;
        newOption.text = `${newProductName} - ${productPrice} zł`;
        select.appendChild(newOption);

        newProductInput.value = "";
        productPriceInput.value = "";
    } else {
        alert("Proszę wpisać nazwę produktu i cenę.");
    }
}
