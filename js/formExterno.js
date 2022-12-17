//----------------------------------------- Funciones para el filtro del form y para cargar todos los productos --------------------------------
//Principales Variables
const formSearch = document.querySelector('#formSearch');
const formButton = document.querySelector('#formButton');

let formExterno;

formButton.addEventListener('click', (e)=>{
    e.preventDefault();
    formExterno = formSearch.value.toUpperCase(); 
    guardarBusqueda();
})

formSearch.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        formExterno = formSearch.value.toUpperCase();
        guardarBusqueda();  
    }
})

function guardarBusqueda(){
    console.log(formExterno)
    localStorage.setItem('formExterno', JSON.stringify(formExterno));
    window.location.href = "index.html";
}

    