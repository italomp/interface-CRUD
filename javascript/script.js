const firstElement = 0;
const secondElement = 1;
const thirdElement = 2;
const fourthElement = 3;
let createButton = document.getElementsByName("create button")[firstElement];
let updateButton = document.getElementsByName("update button")[firstElement]; 
let searchButton = document.getElementsByName("search button")[firstElement];
let deleteButton = document.getElementsByName("delete button")[firstElement];

//AUXILIARY FUNCTIONS

function addSuccessMessageIntoElement(element, msg){
    element.innerHTML = msg;
    element.style.backgroundColor = "#4bb543";
    element.style.color = "#1f4a1c";
}

async function addFailMessageIntoElement(element, resp){
    let err = await resp.json();
    element.innerHTML = "<h3>" + err.message + "</h3>";
    element.style.backgroundColor = "#ff1a1a";
    element.style.color = "white";
}

async function addProductIntoElement(resp, element){
    product = await resp.json();
    let name = product.name;
    let description = product.description;
    let price = product.price;
    
    element.innerHTML = "<p>" + 
                        "<strong>" + "Name: " + "</strong>" + name + "<br>" +
                        "<strong>" + "Description: " + "</strong>" + description + "<br>" +
                        "<strong>" + "Price: " + "</strong>" + price + 
                        "<p>";
    element.style.backgroundColor = "white";
    element.style.color = "black";
}

function collectFormData(form, productName, productDescription, 
                         productPrice){
    for(input of form){
        if(input.name == "product name"){
            productName = input.value;
        }
        else if (input.name == "product description"){
            productDescription = input.value;
        }
        else if(input.name == "product price"){
            productPrice == input.value;
        }
    }
}

function collectFormData(form, productID, productName, productDescription, 
                         productPrice){        
    for(input of form){
        if(input.name == "product id"){
            productID = input.value;
        }
        else if(input.name == "product name"){
            productName = input.value;
        }
        else if (input.name == "product description"){
            productDescription = input.value;
        }
        else if(input.name == "product price"){
            productPrice == input.value;
        }
    }
}

function createProduct(productName, productDescription, productPrice){
    return {name: productName, 
            description: productDescription, 
            prince: productPrice};
}

function createProduct(ID, productName, productDescription, productPrice){
    return {id: ID,
            name: productName, 
            description: productDescription, 
            prince: productPrice};
}



//EVENTS

/**
 * Esse trecho de código adiciona um evento ao elemento 'createButton'.
 * 
 * Evento: Click.
 * 
 * Callback: Função que cria um newUser a partir dos dados do formulário,
 * envia uma request do tipo post e altera o elemento 'resultArea' de 
 * acordo com o resultado da response.
 */
createButton.addEventListener("click", function(){
    let productName, productDescription, productPrice, newProduct;
    let form = document.getElementsByClassName("formContainer")[firstElement];
    let createProductUrl, optRequest;
    let resultArea = document.getElementsByClassName("resultArea")[firstElement];

    collectFormData(form, productName, productDescription, productPrice);
    newProduct = createProduct(productName, productDescription, productPrice);

    createProductUrl = "http://localhost:8080/api/v1/product/";
    optRequest = {method: "POST",
                  headers: {"Content-type": "application/json"},
                  body: JSON.stringify(newProduct)};

    fetch(createProductUrl, optRequest)
    .then(resp => {
        if(resp.ok){
            addSuccessMessageIntoElement(resultArea, 
                "<h3> Product Was Created Successful! </h3>");
        }
        else{
            addFailMessageIntoElement(resultArea, resp);
        }
    })
    .catch(err => console.log("Erro de rede"))});



/**
 * Esse trecho de código adiciona um evento ao elemento 'updateButton'.
 * 
 * Evento: click
 * 
 * Callback: Função cria um produto atualizado a partir de dados do form
 */
updateButton.addEventListener("click", function(){
    let productID, productName, productDescription, productPrice, updatedProduct;
    let form = document.getElementsByClassName("formContainer")[secondElement];
    let updateProductUrl, optRequest;
    let resultArea = document.getElementsByClassName("resultArea")[secondElement];

    collectFormData(form, productID, productName, productDescription, productPrice);
    updatedProduct = createProduct(productID, productName, productDescription, productPrice);

    updateProductUrl = "http://localhost:8080/api/v1/product/";
    optRequest = {method: "PUT",
                  headers: {"Content-type": "application/json"},
                  body: JSON.stringify(updatedProduct)};
    fetch(updateProductUrl, optRequest)
    .then(resp => {
        if(resp.ok){
            addSuccessMessageIntoElement(resultArea, 
                "<h3> Product Was Updated Successful! </h3>");
        }
        else{
            addFailMessageIntoElement(resultArea, resp);
        }
    })
    .catch(err => console.log("Erro de rede"));
});


searchButton.addEventListener("click", function(){
    let form = document.getElementsByClassName("formContainer")[thirdElement];
    let productID = form[firstElement].value;
    let resultArea = document.getElementsByClassName("resultArea")[thirdElement];
    let searchProductUrl = "http://localhost:8080/api/v1/product/" + productID;
    fetch(searchProductUrl)
    .then(resp => {
        if(resp.ok){
            addProductIntoElement(resp, resultArea);
        }
        else{
            addFailMessageIntoElement(resultArea, resp);
        }
    });
});


deleteButton.addEventListener("click", function(){
    let form = document.getElementsByClassName("formContainer")[fourthElement];
    let productID = form[firstElement].value;
    let resultArea = document.getElementsByClassName("resultArea")[fourthElement];
    let searchProductUrl = "http://localhost:8080/api/v1/product/" + productID;
    let optRequest = {method: "DELETE"};
    fetch(searchProductUrl, optRequest)
    .then(resp => {
        if(resp.ok){
            addSuccessMessageIntoElement(resultArea, 
                "<h3> Product Was Deleted Successful! </h3>");
        }
        else{
            addFailMessageIntoElement(resultArea, resp);
        }
    });
});