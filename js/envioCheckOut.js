document.addEventListener('DOMContentLoaded', ()=>{  
    
    const inputCalle = document.querySelector('#calle');
    const inputPisoDepto = document.querySelector('#pisoDepto');
    const inputCP = document.querySelector('#CP');
    const inputEntreCalles = document.querySelector('#entreCalles');
    const inputBarrio = document.querySelector('#barrio');
    const inputCiudad = document.querySelector('#ciudad');
    const inputProvincia = document.querySelector('#provincia');
    const btnCont = document.querySelector('#btnCont');
    const spinner = document.querySelector('#spinner');
    const identifAnterior = document.querySelector('#identifAnterior');
    const primerForm = document.querySelector('#primerForm');

    //Primero se trae la info del formulario anterior y se muestra la primera card que ahora es mas pequeña
    identificacion = JSON.parse( localStorage.getItem('identificacion') ) || {};
    let nvoDiv = document.createElement('DIV')
    nvoDiv.innerHTML = 
        `<div class="textIdentif col-12 nombreIdentif">${identificacion.nombre} ${identificacion.apellido}</div>
        <div class="textIdentif col-12 nombreIdentif">DNI ${identificacion.DNI}</div>  
        <div class="textIdentif col-12 nombreIdentif">${identificacion.telefono}</div>  
        <div class="textIdentif col-12 nombreIdentif">${identificacion.email}</div>`;
    identifAnterior.appendChild(nvoDiv)
    
    //Se crea objeto para verificar que este lleno y asi habilitar boton "continuar"
    let envio = {
        calle: '',
        pisoDepto: '',
        CP: '',
        entreCalles: '',
        barrio: '',
        ciudad: '',
        provincia: ''
    }   
    
    inputCalle.addEventListener('input', validar)
    inputPisoDepto.addEventListener('input', validar)
    inputCP.addEventListener('input', validar)
    inputEntreCalles.addEventListener('input', validar)
    inputBarrio.addEventListener('input', validar)
    inputCiudad.addEventListener('input', validar)
    inputProvincia.addEventListener('input', validar)
    btnCont.addEventListener('click', mostrarSpinner)
    primerForm.addEventListener('click', ()=>{
        window.location.href = "checkOut1.html";
    })

    
    //Funcion para validar los campos
    function validar(e) {

        console.log(envio)

        //Se valida que el elemento este vacio
        if(e.target.value.trim() === '') {

            /*Se llama a la funcion "mostrarAlerta" y se le pasan dos parametros, uno es un template string donde se menciona que campo
            es obligatorio, y el otro es el elemento padre que se toma como referencia para luego imprimir la alerta al final de su contenido*/
            mostrarAlerta(`El campo "${e.target.name}" es obligatorio`, e.target.parentElement);

            //Se reincia objeto "envio"
            envio[e.target.id] = '';

            //Se valida que en el objeto "envio", y tambien en los impiuts, no haya lugares vacios
            comprobarenvio();
            console.log(envio)
            return;
        }

        limpiarAlerta(e.target.parentElement);

        //Se asgina los valores de los imptus al objeto "envio
        envio[e.target.id] = e.target.value.trim();

        //Se llama validar que no haya campos vacios para asi habilitar o no el boton "continuar"
        comprobarenvio();
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
    function comprobarenvio(){
        if(Object.values(envio).includes('')){
            btnCont.classList.add('anularCarrito', 'opacity-25');
            return;
        }             
        btnCont.classList.remove('anularCarrito', 'opacity-25');  
                
    }

    //Funcion para mostrar Spinner y redirigir a proxima pagina
    function mostrarSpinner(e){
        e.preventDefault();

        envioEnStorage()
        spinner.classList.remove('d-none')

        setTimeout(() => {
            window.location.href = "checkOut3.html";
        }, 1500);
        
    }

    //Funcion para guardar datos en localStorage
    function envioEnStorage(){      
        
        localStorage.setItem('envio', JSON.stringify(envio));
        
    }
    
})
    

    
    
