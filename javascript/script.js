let buttonCreateProduct = document.getElementById("buttonCreateProduct");
let buttonReadProduct = document.getElementById("buttonReadProduct");
let buttonUpdateProduct = document.getElementById("buttonUpdateProduct");
let buttonDeleteProduct = document.getElementById("buttonDeleteProduct");
let result = document.getElementById("result");

/**
 * Esse trecho de código adiciona um evento ao elemento 'buttonCreateProduct'.
 * 
 * evento: click.
 * 
 * callback: função que cria um novo produto a partir dos dados inseridos no form,
 * envia uma request do tipo post para o servidor e insere o http status da response
 * no elemento 'result'.
 */
buttonCreateProduct.addEventListener("click", function(){
    let form = document.getElementById("createProduct");
    let inputName, inputDescription, inputPrice;
    let newProduct, createProductUrl, optRequest;
    for(e of form){
        if(e.name == "inputName"){
            inputName = e.value;
        }
        else if(e.name == "inputDescription"){
            inputDescription = e.value;
        }
        else if(e.name == "inputPrice"){
            inputPrice = e.value;
        }
    }
    newProduct = {"name": inputName, 
                  "description": inputDescription, 
                  "price": inputPrice};
    createProductUrl = "http://localhost:8080/api/v1/product/";
    optRequest = {method: "POST",
                  headers: {"Content-type":"application/json"},
                  body: JSON.stringify(newProduct)};
    fetch(createProductUrl, optRequest)
    .then(resp => {result.innerText = resp.status;});
});

/**
 * Esse trecho de código adiciona um evento ao elemento 'buttonReadProduct'.
 * 
 * evento: click.
 * 
 * calback: função que extrai o inputProductID do form, faz a requisição do tipo get,
 * converte o objeto json retornado numa string json e adiciona essa string ao
 * elemento 'result'.
 */
buttonReadProduct.addEventListener("click", function(){
    let form = document.getElementById("readProduct");
    let indexInputProductID = 0;
    let inputProductID = form[indexInputProductID].value;
    let readProductUrl = "http://localhost:8080/api/v1/product/" + inputProductID;
    fetch(readProductUrl)
    .then(resp => resp.json())
    .then(json => result.innerText = JSON.stringify(json));
});

/**
 * Esse trecho de código adiciona um evento ao elemento 'buttonUpdateProduct'.
 * 
 * evento: click
 * 
 * callback: Função que cria a nova versão do produto que será atualizado, a partir
 * dos inputs fornecidos no form; enviar uma requisição do tipo PUT para o servidor e
 * e insere o http status da response no elemento 'result'.
 */
buttonUpdateProduct.addEventListener("click", function(){
    let form = document.getElementById("updateProduct");
    let inputProductID, inputName, inputDescription, inputPrice;
    let product, createProductUrl, optRequest;
    for(e of form){
        if(e.name == "inputProductID"){
            inputProductID = e.value;
        }
        else if(e.name == "inputName"){
            inputName = e.value;
        }
        else if(e.name == "inputDescription"){
            inputDescription = e.value;
        }
        else if(e.name == "inputPrice"){
            inputPrice = e.value;
        }
    }
    product = {"id": inputProductID,
                  "name": inputName, 
                  "description": inputDescription, 
                  "price": inputPrice};
    createProductUrl = "http://localhost:8080/api/v1/product/";
    optRequest = {method: "PUT",
                  headers: {"Content-type":"application/json"},
                  body: JSON.stringify(product)};
    fetch(createProductUrl, optRequest)
    .then(resp => {result.innerText = resp.status;});
});

/**
 * Esse trecho de código adiciona o um evento ao elemento 'buttonDeleteProduct'.
 * 
 * evento: click.
 * 
 * callback: Função que pega o inputProductID do form e envia uma requisição do
 * tipo delete para o servidor e adiciona o http status da resposta no elemento
 * 'result'.
 */
buttonDeleteProduct.addEventListener("click", function(){
    let form = document.getElementById("deleteProduct");
    let indexInputProductID = 0;
    let inputProductID = form[indexInputProductID].value;
    optRequest = {method: "DELETE",
                  headers: {"Content-type":"application/json"},};
    let deleteProductUrl = "http://localhost:8080/api/v1/product/" + inputProductID;
    fetch(deleteProductUrl, optRequest)
    .then(resp => {result.innerText = resp.status;});

});

