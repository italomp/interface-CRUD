let createButton = document.getElementsByName("create button")[0];
let updateButton = document.getElementsByName("update button")[0]; 
let searchButton = document.getElementsByName("search button")[0];
let deleteButton = document.getElementsByName("delete button")[0];

/**
 * Esse trecho de código adiciona um evento ao elemento 'createButton'.
 * 
 * evento: click
 * 
 * callback: função que cria um newUser a partir dos dados do formulário,
 * envia uma request do tipo post e altera o elemento 'resultArea' de 
 * acordo com o resultado da response
 */
createButton.addEventListener("click", function(){
    let productName, productDescription, productPrice, newProduct;
    let form = document.getElementsByClassName("formContainer")[0];
    let createProductUrl, optRequest;
    let resultArea = document.getElementsByClassName("resultArea")[0];

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
    newProduct = {name: productName,                 
                  description: productDescription,
                  price: productPrice };
    createProductUrl = "http://localhost:8080/api/v1/product/";
    optRequest = {method: "POST",
                  headers: {"Content-type": "application/json"},
                  body: JSON.stringify(newProduct)};
    fetch(createProductUrl, optRequest)
    .then(resp => addContentAndStyleInResultArea(resultArea, resp));
});

/**
 * Essa é uma função auxiliar que adiciona conteúdo e estilo ao
 * elemento 'resultArea' de acordo com a response recebida
 * 
 * @param {resultArea} - elemento no qual o conteúdo e o estilo
 * serão inseridos
 * 
 * @param {response} - response recebida do servidor
 */
function addContentAndStyleInResultArea(resultArea, response){
    if(response.status == 200){
        resultArea.innerHTML = "<h3> Product Was Created Successful! </h3>";
        resultArea.style.backgroundColor = "#4bb543";
        resultArea.style.color = "#1f4a1c";
    }
    else{
        // nao consegui provocar o erro no servidor
    }
}