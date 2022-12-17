document.addEventListener('DOMContentLoaded', ()=>{   

    const inputEmail = document.querySelector('#email');
    const inputNombre = document.querySelector('#nombre');
    const inputApellido = document.querySelector('#apellido');
    const inputDNI = document.querySelector('#DNI');
    const inputTelefono = document.querySelector('#telefono');
    const btnCont = document.querySelector('#btnCont');
    const spinner = document.querySelector('#spinner');
    
    //Se crea objeto para verificar que este lleno y asi habilitar boton "continuar"
    let identificacion = {
        email: '',
        nombre: '',
        apellido: '',
        DNI: '',
        telefono: ''
    } 
    
    //identificacion = JSON.parse( localStorage.getItem('identificacion') ) || {};

    inputEmail.addEventListener('input', validar)
    inputNombre.addEventListener('input', validar)
    inputApellido.addEventListener('input', validar)
    inputDNI.addEventListener('input', validar)
    inputTelefono.addEventListener('input', validar)
    btnCont.addEventListener('click', mostrarSpinner)

    
    //Funcion para validar los campos
    function validar(e) {

        //Se valida que el elemento este vacio
        if(e.target.value.trim() === '') {

            /*Se llama a la funcion "mostrarAlerta" y se le pasan dos parametros, uno es un template string donde se menciona que campo
            es obligatorio, y el otro es el elemento padre que se toma como referencia para luego imprimir la alerta al final de su contenido*/
            mostrarAlerta(`El campo "${e.target.name}" es obligatorio`, e.target.parentElement);

            //Se reincia objeto "identificacion"
            identificacion[e.target.id] = '';

            //Se valida que en el objeto "identificacion", y tambien en los impiuts, no haya lugares vacios
            comprobaridentificacion();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {

            /*Se llama a la funcion "mostrarAlerta" y se le pasan dos parametros, uno es un template string donde se menciona que campo
            es obligatorio, y el otro es el elemento padre que se toma como referencia para luego imprimir la alerta al final de su contenido*/
            mostrarAlerta('El e-mail no es válido', e.target.parentElement);

            //Se reincia objeto "identificacion"
            identificacion[e.target.id] = '';

            //Se valida que en el objeto "identificacion", y tambien en los impiuts, no haya lugares vacios
            comprobaridentificacion();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        //Se asgina los valores de los imptus al objeto "identificacion
        identificacion[e.target.id] = e.target.value.trim();

        //Se valida que en el objeto "identificacion", y tambien en los impiuts, no haya lugares vacios
        comprobaridentificacion();
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
    
    function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.campoObligatorio');
        
        if(alerta) {
            alerta.remove();
        }
    }

    //Se valida formato de email
    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    //Funcoin para validar que no haya campos vacios para asi habilitar o no el boton "continuar"
    function comprobaridentificacion(){
        if(Object.values(identificacion).includes('')){
            btnCont.classList.add('anularCarrito', 'opacity-25');
            return;
        }             
        btnCont.classList.remove('anularCarrito', 'opacity-25');  
                
    }

    //Funcion para mostrar Spinner y redirigir a proxima pagina
    function mostrarSpinner(e){
        e.preventDefault();

        identificacionEnStorage()
        spinner.classList.remove('d-none')

        setTimeout(() => {
            window.location.href = "checkOut2.html";
        }, 1500);
        
    }

    //Funcion para guardar datos en localStorage
    function identificacionEnStorage(){      
        
        localStorage.setItem('identificacion', JSON.stringify(identificacion));
        
    }
    
})
    

    
    
