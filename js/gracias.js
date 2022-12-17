document.addEventListener('DOMContentLoaded', ()=>{ 
           
    const detalles = document.querySelector('#detalles');
    const seguiNavegando = document.querySelector('#seguiNavegando');

    //Primero, se trae la info del formulario anterior(identificacion) y se muestra la primera card que ahora es mas pequeña
    let identificacion = JSON.parse( localStorage.getItem('identificacion') ) || {};
    let envio = JSON.parse( localStorage.getItem('envio') ) || {};
    let carrito = JSON.parse( localStorage.getItem('carrito') ) || {};
    let pago = JSON.parse( localStorage.getItem('pago') ) || {};

    //Se obtiene el total de la compra
    let precioTotProd = carrito.map((c) => parseInt(c.price.slice(1)));  
    let totCompra = precioTotProd.reduce((a, b) => a + b, 0) + 3000;

    //Se crea un nmumero aleatoreo y se lo asigna al numero de orden de compra
    var min = 1000;
    var max = 10000000;    
    var numOrden = Math.floor(Math.random()*(max-min+1000)+min);
    
    //Se crea el HTML para el resumen
    let datalleDiv = document.createElement('DIV');
    datalleDiv.classList.add('row');
    datalleDiv.innerHTML = 
        `<div class="col-12 mb-3">
            <h5>Detalle de la compra</h5>
            <p class="parrafoGracias">El total de tu compra es de $${totCompra} financiado en ${pago.coutas} cuotas de $${pago.totCtas}</p>
            <p class="parrafoGracias">Orden #${numOrden}</p>
            <p class="parrafoGracias">Vendido y entregado por NERDO</p>
        </div>

        <div class="col-12 mb-3">
            <h5>Entrega</h5>
            <p class="parrafoGracias">Dentro de los proxima 7 días habiles</p>
            <p class="parrafoGracias">Domicilio: ${envio.calle}, ${envio.pisoDepto}, Barrio ${envio.barrio}, CP ${envio.CP}, ${envio.ciudad}, ${envio.provincia}.</p>
        </div>

        <div class="col-12">
            <h5>Tus Datos</h5>
            <p class="parrafoGracias">${identificacion.nombre} ${identificacion.apellido}</p>
            <p class="parrafoGracias">DNI ${identificacion.DNI}</p>
            <p class="parrafoGracias">${identificacion.telefono}</p>
            <p class="parrafoGracias">${identificacion.email}</p>
        </div>`;

        detalles.appendChild(datalleDiv)
   

    detalles.addEventListener('click', ()=>{
        console.log('funciona detalles')
    })

    //Se crea el unico evento de la pagina
    seguiNavegando.addEventListener('click', mostrarSpinner)

    //Funcion para mostrar Spinner y redirigir al index
    function mostrarSpinner(event){
        event.preventDefault();

        seguiNavegando.classList.add('d-none') 
        spinner.classList.remove('d-none') 
        
        localStorage.clear();

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
        
    }
    
})