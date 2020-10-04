let buttonUserRegistry = document.getElementById("buttonUserRegistry");
let buttonUserLogin = document.getElementById("buttonUserLogin");
let buttonCreateProduct = document.getElementById("buttonCreateProduct");
let buttonReadProduct = document.getElementById("buttonReadProduct");
let buttonUpdateProduct = document.getElementById("buttonUpdateProduct");
let buttonDeleteProduct = document.getElementById("buttonDeleteProduct");
let result = document.getElementById("result");

/**
 * Esse trecho de código adiciona um evento ao elemento
 * buttonUserRegistry.
 * 
 * evento: click
 * 
 * callback: função que coleta dados do novo usuario no form com 
 * id "userRegistry" e envia esses dados para p servidor através 
 * de uma requisição POT.
 * Esses daados compõe um novo usuário que será cadastrado no 
 * servidor
 */
buttonUserRegistry.addEventListener("click", function(){
    let form = document.getElementById("userRegistry");
    let inputName, inputLogin, inputPassword;
    let newUser, registerUrl, optRequest;
    for(e of form){
        if(e.name == "inputName"){
            inputName = e.value;
        }
        else if(e.name == "inputLogin"){
            inputLogin = e.value;
        }
        else if(e.name == "inputPassword"){
            inputPassword = e.value;
        }
    }
    newUser = {"name": inputName, 
               "login": inputLogin, 
               "password": inputPassword};
    registerUrl = "http://localhost:8080/api/v1/user/";
    optRequest = {method: "post",
                  headers: {"Content-type": "application/json"},
                  body: JSON.stringify(newUser)};
    fetch(registerUrl,optRequest)
    .then(resp => result.innerText = resp.status);
});

/**
 * Esse trecho de código adiciona um evento ao elemento 
 * "buttonUserLogin".
 * 
 * evento: click
 * 
 * callback: função que coleta dados do usuário que vai
 * efetuar login (esses dados estão no form que usa o
 * id "userLogin") e envia uma requisição POST para o
 * servidor.
 * E ainda, armaena o token recebido do servido no
 * localStorage.
 */
buttonUserLogin.addEventListener("click", function(){
    let form = document.getElementById("userLogin");
    let inputLogin, inputPassword;
    let user, loginUrl, optRequest;
    for(e of form){
        if(e.name == "inputLogin"){
            inputLogin = e.value;
        }
        else if(e.name == "inputPassword"){
            inputPassword = e.value;
        }
    }
    user = {"login": inputLogin, 
            "password": inputPassword};
    loginUrl = "http://localhost:8080/api/v1/auth/login";
    optRequest = {method: "post",
                  headers: {"Content-type": "application/json"},
                  body: JSON.stringify(user)};
    fetch(loginUrl, optRequest)
    .then(resp => resp.json())
    .then(tokenObject => window.localStorage.setItem("token", tokenObject.token))
    .then(result.innerText = "Login realizado com sucesso!");
});

buttonCreateProduct.addEventListener("click", async function(){
    let form = document.getElementById("createProduct");
    let inputName, inputDescription, inputPrice;
    let newProduct, createProductUrl, optRequest, token;
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
    createProductUrl = "http://localhost:8080/api/v1/product/private/";
    token = await window.localStorage.getItem("token");
    optRequest = {method: "post",
                  headers: {"Content-type":"application/json",
                            "Authorization":"Bearer " + token,
                            "Referrer-Policy": "unsafe-url"}, //browser enviar origem para qualquer endereço. Inclusive endereços não confiáveis.
                  credentials: "include",
                  body: JSON.stringify(newProduct)};
    if(token == undefined){
       console.log("token == undefined");
    }
    else if (token == Promise){
        console.log("token == undefined");
    }
    else{
        console.log(token);
    }
    fetch(createProductUrl, optRequest)
    .then(resp => {result.innerText = resp.status;});
});


/*
let inputName;
let inputLogin;
let inputPassword;
let inputDescription;
let inputPrice;
let inputProductID;
function inputCollector(){

}
for(e of form){
    if(e.name == "inputName"){
        inputName = e.value;
    }
    else if(e.name == "inputLogin"){
        inputLogin = e.value;
    }
    else if(e.name == "inputPassword"){
        inputPassword = e.value;
    }
    else if(e.name == "inputDescription"){
        inputDescription = e.value;
    }
    else if(e.name == "inputPrice"){
        inputPrice = e.value;
    }
    else if(e.name == "inputProductID"){
        inputProductID = e.value;
    }
}
*/
