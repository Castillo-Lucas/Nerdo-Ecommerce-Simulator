//Principales Variables
const productSection1 = document.querySelector('#productSection');
const botonCarrito = document.querySelector('#botonCarrito');
const carrito = document.querySelector('#carrito');
const listadoCarrito = document.querySelector('#listadoCarrito');
const vaciarCaritoBtn = document.querySelector('#vaciarCarito');
const contador = document.querySelector('#contador');
const carritoTotal = document.querySelector('#carritoTotal');
const cerrarModal = document.querySelector('#cerrarModal');
let totalprodEnCarrito;
let arregloCarrito = [];


cargarEventListeners();
//Principales Listeners
function cargarEventListeners(){  
       
    //Agregar Productos al Carrito
    productSection1.addEventListener('click', agregarProducto);

    //Eliminar producto por producto del Carrito
    carrito.addEventListener('click', eliminarProducto);    

    //Eliminar todos los productos de una sola vez del carrito
    vaciarCaritoBtn.addEventListener('click', ()=>{
        arregloCarrito = [];
        limpiarHTMLCarrito();
        carritoHTML();
    })    
}     

//Se inicia contador de carrito en Cero
crearContador();  

//Se lee el JSON que se almaceno en LocalStorage para modificar el contador
arregloCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];         
carritoHTML();  

//----------------------------------------- Funciones para el carrito --------------------------------------------------------------------------
//Funcion para determinar que se seleccione correctamente el boton "Agregar al carrito" y asi obtener los datos de la card
function agregarProducto(e){
    
    //Se asegura que el usuario presione el boton "Agregar Carrito" y se accede a todo el div.
    if(e.target.classList.contains('btnCard')){
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProductos(productoSeleccionado);
    } 
       
}

//Funcion para eliminar productos por producto
function eliminarProducto(e){
    
    //Se asegura que el usuario precione la tecla borrar(x)
    if(e.target.classList.contains('buttonModalCancel')){

        //Se obtiene el ID del producto en carrito
        const prodID = e.target.getAttribute('data-id');

        //Se hace un filtro del arreglo del carrito exeptuando al producto que se decidio eliminar
        arregloCarrito = arregloCarrito.filter(prod => prod.id !== prodID);

        //Se vuelve a imprimar el HTML del carrito
        carritoHTML();
    }

    //Se actualiza contador
    crearContador();
}

//Se leen los datos de la card, se agregan objetos al array del carrito y se manda a crear el contador del carrito
function leerDatosProductos(datos){

    //Se leen los datos de la card y se crea objeto con info de productos Seleccionado
    const datosProd = {
        img: datos.querySelector('img').src,
        name: datos.querySelector('p').textContent,
        price: datos.querySelector('h4').textContent,
        id: datos.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Se comprueba si el producto seleccionado ya existe en el carrito
    const exite = arregloCarrito.some( product => product.id === datosProd.id);

    if(exite){
        const prod = arregloCarrito.map( p => {
            if( p.id === datosProd.id ) {                
                //Se actualiza cantidad de productos en carrito
                let cantidad = parseInt(p.cantidad);
                cantidad++
                p.cantidad =  cantidad;

                //Se actualiza precio de productos
                let precio= datosProd.price;
                const precioSinSimbolo = parseInt(precio.slice(1));                   
                let total = precioSinSimbolo * cantidad;
                p.price = "$" + total
                return p;
            } else {
                return p;
            }
        })
        //Se agregan los productos al arreglo del carrito
       arregloCarrito = [...prod];
    } else {
        //Se agregan los productos al arreglo del carrito
        arregloCarrito = [...arregloCarrito, datosProd];
    } 
    
    //Se llama a imprimir el HTML del carrito
    carritoHTML();
    
    //Se llama a  crear el contador de carrito
    crearContador();   
}

//Se crea el contador del carrito
function crearContador(){
    let prodEnCarrito = arregloCarrito.map((c) => c.cantidad);
    totalprodEnCarrito = prodEnCarrito.reduce((a, b) => a + b, 0);

    //Se bloquea el carrito en caso de que el contador este en cero
    bloquearCarrito();    

    //Se llama a imprimir el HTML del contador
    contadorHTML() 
}

//Se bloquea el carrito en caso de que el contador este en cero
function bloquearCarrito(){
    
    if(totalprodEnCarrito === 0){
        botonCarrito.classList.add('anularCarrito')
        cerrarModal.click();
    } else{
        botonCarrito.classList.remove('anularCarrito')
    }
}

//Se imprime el HTML del contador
function contadorHTML(){    
    const cont = document.createElement('span');
    cont.classList = ('cont position-absolute badge rounded-pill bg-danger');
    cont.innerHTML = totalprodEnCarrito;
    contador.appendChild(cont)
    
}

//Se imprime el HTML del carrito
function carritoHTML(){

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
        
    })

    //Se manda a imprimir el total de la compra en el carrito
    totalCarrito();

    guardarProdEnStorage();
}

//Se imprime el total de la compra en el carrito
function totalCarrito(){

    //Se manda a limpiar el HTML del total de la compra en carrito
    limpiarTotalHTMLCarrito();


    //Se obtiene el total de compra
    let totCarrito = arregloCarrito.map((c) => parseInt(c.price.slice(1)));
    let totCart = totCarrito.reduce((a, b) => a + b, 0); 
    
    //Se imprime el HTML
    const tot = document.createElement('div');
    tot.className = ('row m-0 p-0 d-flex justify-content-end align-items-center');
    tot.innerHTML = 
    `<div class="col-1  totalModal ">Total:</div>
    <div class="col-11  totalPriceModal ">$${totCart}</div>`

    carritoTotal.appendChild(tot)   
    
}

//Se guardan los productos del carrito en el localStorge
function guardarProdEnStorage(){
    localStorage.setItem('carrito', JSON.stringify(arregloCarrito));
}

//Se limpia el HTML del carrito para que no haya duplicados
function limpiarHTMLCarrito(){
   
    while(listadoCarrito.firstChild){
        listadoCarrito.removeChild(listadoCarrito.firstChild)        
    }

    //Se vuelve contador a Cero
    crearContador();
}

//Se limpia el HTML del total de la compra en carrito
function limpiarTotalHTMLCarrito(){
   
    while(carritoTotal.firstChild){
        carritoTotal.removeChild(carritoTotal.firstChild)        
    }
}