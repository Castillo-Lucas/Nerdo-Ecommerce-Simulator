//Principales Variables
const resumenBox = document.querySelector('#resumenBox');
const listadoCarrito1 = document.querySelector('#listadoCarrito');
const resumenTotal = document.querySelector('#resumenTotal');
const carrito2 = document.querySelector('#carrito');
let totResumen;

cargarEventListeners();

carrito2.addEventListener('click', eliminarProducto)


arregloCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];
resumenHTML();

//Funcion para eliminar productos por producto
function eliminarProducto(e){
    
    
    //Se asegura que el usuario precione la tecla borrar(x)
    if(e.target.classList.contains('buttonModalCancel') || e.target.classList.contains('vaciarCarrito')){

        //Se obtiene el ID del producto en carrito
        //const prodID = e.target.getAttribute('data-id');

        //Se hace un filtro del arreglo del carrito exeptuando al producto que se decidio eliminar
        //arregloCarrito = arregloCarrito.filter(prod => prod.id !== prodID);
        resumenHTML();        
    }
}

//Se imprime el HTML del carrito
/*function carritoHTML(){

    //Se limpia el HTML para que no haya duplicados
    limpiarHTMLCarrito();

    //Se crea el HTML en el carrito
    arregloCarrito.forEach((prod) => {

        const fila = document.createElement('div');
        fila.className = ('row m-0 p-0 d-flex justify-content-center align-items-center py-3 border-bottom');
        fila.innerHTML = 
        `<div class=" col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <img src="${prod.img}"
            class="card-img-top modalImg" alt="...">
        </div>
        <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 p-0 px-1 modalDetail">${prod.name}</div>
        <div class="col-4 col-sm-2 col-md-2 col-lg-2 col-xl-3 modalPrice">${prod.price}</div>
        <div class="col-2 col-sm-1 col-md-1 col-lg-1 col-xl-1 p-0">
            <button type="button" class="btn buttonModalCancel" data-id="${prod.id}">X</button>
        </div>

        <div class="col-lg-10 d-flex justify-content-center modalDetail">Cantidad: ${prod.cantidad}</div>`

         listadoCarrito.appendChild(fila)
         totalResumen()
        
    })    
    
    guardarProdEnStorage();
    resumenHTML()
}*/

//Se imprime el HTML del resumen
function resumenHTML(){

    //Se limpia el HTML para que no haya duplicados
    limpiarHTMLResumen();

    //Se crea el HTML en el carrito
    arregloCarrito.forEach((prod) => {

        const fila = document.createElement('div');
        fila.className = ('row m-0 p-0 d-flex justify-content-center align-items-center py-3');
        fila.innerHTML = 
        `<!-- Imagen -->
            <div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-3 d-flex justify-content-center justify-content-sm-end">
                <img src="${prod.img}"
                class="card-img-top cartImg" alt="...">
            </div>
            <!-- Detalle Productos -->
            <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 p-0 px-1 cartDetail">${prod.name}</div>
            <!-- Precio-->
            <div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-3 cartPrice">${prod.price}</div>
            <div class="col-lg-10 d-flex justify-content-center modalDetail border-bottom p-2">Cantidad: ${prod.cantidad}</div>`

        resumenBox.appendChild(fila)

              
    })   

    guardarProdEnStorage();

    totalResumen();  
}

//Se imprime el total de la compra en Resumen
function totalResumen(){

    //Se manda a limpiar el HTML del total de la compra en resumen
    limpiarTotalHTMLResumen();

    //Se obtiene el total de compra
    let totCarrito1 = arregloCarrito.map((c) => parseInt(c.price.slice(1)));
    totResumen = totCarrito1.reduce((a, b) => a + b, 0); 
    let envio = 3000
    let totalConEnvio = totResumen + envio;
    
    //Se imprime el HTML
    const tot = document.createElement('div');
    tot.className = ('col-12 p-3');
    tot.innerHTML = 
    `<div class="row">
        <div class="col-6 d-flex justify-content-start mb-1">
             <div id="aclaracion" class="form-text">Subtotal</div>
        </div>

        <div class="col-6 d-flex justify-content-end mb-1">
            <div id="aclaracion" class="form-text">$${totResumen}</div>
        </div>

        <div class="col-6 d-flex justify-content-start mb-3">
            <div id="aclaracion" class="form-text">Envio</div>
         </div>
        <div class="col-6 d-flex justify-content-end mb-3">
            <div id="aclaracion" class="form-text">$${envio}</div>
        </div>

        <div class="col-6 d-flex justify-content-start">
            <h5 class="h4Indentif">Total</h5>
        </div>

        <div class="col-6 d-flex justify-content-end">
             <h5 class="h4Indentif">$${totalConEnvio}</h5>
        </div>
    </div>`

    resumenTotal.appendChild(tot)   
    alPrincipio();
    
}

//Se guardan los productos del carrito en el localStorge
function guardarProdEnStorage(){
    localStorage.setItem('carrito', JSON.stringify(arregloCarrito));
}

//Se limpia el HTML del carrito para que no haya duplicados
/*function limpiarHTMLCarrito(){
   
    while(listadoCarrito1.firstChild){
        listadoCarrito1.removeChild(listadoCarrito1.firstChild)        
    }
}*/

//Se limpia el HTML de los productos del resumen para que no haya duplicados
function limpiarHTMLResumen(){
   
    while(resumenBox.firstChild){
        resumenBox.removeChild(resumenBox.firstChild)        
    }
}

//Se limpia el HTML del total de la compra en resumen
function limpiarTotalHTMLResumen(){
   
    while(resumenTotal.firstChild){
        resumenTotal.removeChild(resumenTotal.firstChild)        
    }
}

//Se vuelve al principio en caso de que el carrito este en cero
function alPrincipio(){
    if(totResumen === 0){
        window.location.href = "index.html";
    }
}
