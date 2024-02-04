function addProduct() {
    const select = document.getElementById("productSelect");
    const table = document.getElementById("shoppingList");
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
    const table = document.getElementById("shoppingList");
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
