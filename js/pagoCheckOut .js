document.addEventListener('DOMContentLoaded', ()=>{ 
       
    const selecTC = document.querySelector('#selecTC');
    const numTC = document.querySelector('#numTC');
    const titularTC = document.querySelector('#titularTC');
    const mesVencimiento = document.querySelector('#mesVencimiento');
    const vencimientoYear = document.querySelector('#vencimientoYear');
    const CVC = document.querySelector('#CVC');
    const coutas = document.querySelector('#coutas');
    const boxCuotas = document.querySelector('#boxCuotas');
    const btnCont = document.querySelector('#btnCont');
    const spinner = document.querySelector('#spinner');
    const identifAnterior = document.querySelector('#identifAnterior');
    const envioAnterior = document.querySelector('#envioAnterior');
    const primerForm = document.querySelector('#primerForm');
    const segundoForm = document.querySelector('#segundoForm');
    let totCtas;

    //Primero, se trae la info del formulario anterior(identificacion) y se muestra la primera card que ahora es mas pequeña
    identificacion = JSON.parse( localStorage.getItem('identificacion') ) || {};
    let identifDiv = document.createElement('DIV')
    identifDiv.innerHTML = 
        `<div class="textIdentif col-12 nombreIdentif">${identificacion.nombre} ${identificacion.apellido}</div>
        <div class="textIdentif col-12 nombreIdentif">DNI ${identificacion.DNI}</div>  
        <div class="textIdentif col-12 nombreIdentif">${identificacion.telefono}</div>  
        <div class="textIdentif col-12 nombreIdentif">${identificacion.email}</div>`;
    identifAnterior.appendChild(identifDiv)

    //Segundo, se trae la info del formulario anterior(envio) y se muestra la primera card que ahora es mas pequeña
    envio = JSON.parse( localStorage.getItem('envio') ) || {};
    let envioDiv = document.createElement('DIV')
    envioDiv.innerHTML = 
        `<div class="textIdentif col-12 nombreIdentif">${envio.calle}, ${envio.pisoDepto}, entre ${envio.entreCalles}.</div>
        <div class="textIdentif col-12 nombreIdentif">Barrio ${envio.barrio}.</div>
        <div class="textIdentif col-12 nombreIdentif">${envio.ciudad}, ${envio.provincia}</div>`;
    envioAnterior.appendChild(envioDiv);

     
    
    //Se crea objeto para verificar que este lleno y asi habilitar boton "continuar"
    let pago = {
        selecTC: '',
        numTC: '',
        titularTC: '',
        mesVencimiento: '',
        vencimientoYear: '',
        CVC: '',
        coutas: '',
        totCtas: ''
    }       
    
    selecTC.addEventListener('input', validar)
    numTC.addEventListener('input', validar)
    titularTC.addEventListener('input', validar)
    mesVencimiento.addEventListener('input', validar)
    vencimientoYear.addEventListener('input', validar)
    CVC.addEventListener('input', validar)
    coutas.addEventListener('input', validar)
    btnCont.addEventListener('click', mostrarSpinner)
    primerForm.addEventListener('click', ()=>{
        window.location.href = "checkOut1.html";
    })
    segundoForm.addEventListener('click', ()=>{
        window.location.href = "checkOut2.html";
    })

    
    //Funcion para validar los campos
    function validar(e) {

        
        //Se valida que el elemento este vacio
        if(e.target.value.trim() === '') {

            /*Se llama a la funcion "mostrarAlerta" y se le pasan dos parametros, uno es un template string donde se menciona que campo
            es obligatorio, y el otro es el elemento padre que se toma como referencia para luego imprimir la alerta al final de su contenido*/
            mostrarAlerta(`El campo "${e.target.name}" es obligatorio`, e.target.parentElement);

            //Se reincia objeto "pago"
            pago[e.target.id] = '';

            //Se valida que en el objeto "pago", y tambien en los impiuts, no haya lugares vacios
            comprobarpago();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        //Se asgina los valores de los imptus al objeto "pago
        pago[e.target.id] = e.target.value.trim();

        agregarCuotas();

        //Se llama validar que no haya campos vacios para asi habilitar o no el boton "continuar"
        comprobarpago();

        

        
    }

    //Funcion para imprimir cuotas cuando estas son elegidas.
    function agregarCuotas(){
        //Tercero, se trae el total de la compra para asi poder calcular las cuotas
        let carrito = JSON.parse( localStorage.getItem('carrito') ) || {};
        let precioTotProd = carrito.map((c) => parseInt(c.price.slice(1)));  
        let totCompra = precioTotProd.reduce((a, b) => a + b, 0) + 3000;
        console.log(totCompra)

        while(boxCuotas.firstChild){
            boxCuotas.removeChild(boxCuotas.firstChild)        
        }

        totCtas = Math.round(totCompra / pago.coutas);

        

        

        

        if(totCtas !== Infinity){
            let divCtas = document.createElement('DIV')
            divCtas.classList.add('col-12','mt-2', 'px-1');
            divCtas.innerHTML = `<p style="color: #4a7c04;">${pago.coutas} cuotas de $${totCtas}</p>`
            boxCuotas.appendChild(divCtas)      
        }
        //Se asgina el valor de la cuota al objeto que luego va en el localStorage
        pago.totCtas = totCtas;

        

    }

    //Funcion para generar alerta de campo obligatorio
    function mostrarAlerta(mensaje, referencia) {

        //Primero se limpia alertas previas y se le pasa "referencia" como parametro
        limpiarAlerta(referencia);
        
        //Generar alerta en HTML de la alerta
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('campoObligatorio');
       
        //Imprime el error en el formulario
        referencia.appendChild(error);
    }
    
    //Funcion para limpiar alertas duplicadas
    function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.campoObligatorio');
        
        if(alerta) {
            alerta.remove();
        }
    }

    //Funcion para validar que no haya campos vacios para asi habilitar o no el boton "continuar"
    function comprobarpago(){
        if(Object.values(pago).includes('')){
            btnCont.classList.add('anularCarrito', 'opacity-25');
            console.log(pago)
            return;
        }             
        btnCont.classList.remove('anularCarrito', 'opacity-25');  
                
    }

    //Funcion para mostrar Spinner y redirigir a proxima pagina
    function mostrarSpinner(e){
        e.preventDefault()

        pagoEnStorage()
        spinner.classList.remove('d-none')

        setTimeout(() => {

            spinner.classList.add('d-none')

        }, 2500);

        

        setTimeout(() => {
            window.location.href = "gracias.html";
        }, 3000);
        
    }

    //Funcion para guardar datos en localStorage
    function pagoEnStorage(){      
        
        localStorage.setItem('pago', JSON.stringify(pago));
        
    }
    
})