//----------------------------------------- Funciones para el filtro del form y para cargar todos los productos --------------------------------
//Principales Variables
const formSearch = document.querySelector('#formSearch');
const formButton = document.querySelector('#formButton');
const formDisappear = document.querySelector('#formDisappear');
const buttonDisappear = document.querySelector('#buttonDisappear');
const productSection = document.querySelector('#productSection');
const ordenarPor = document.querySelector('#ordenarPor');
const marcas = document.querySelector('#marcas');
const procesador = document.querySelector('#procesador');
const ram = document.querySelector('#ram');
const screen = document.querySelector('#screen');
let textForm;
let arrFiltro = [];
let resultado = [];

//Se crea objeto para aplicar como referencia de busqueda.
const datosBusqueda = {
    nombre: '',
    ordenar: '',
    marca: '',
    procesador: '',
    ram: '',
    screen: '',
};

//Se llama a una funcion para ordenar los productos
ordenarProductos();

cargarEventListeners(); 
//Principales Listeners
function cargarEventListeners(){    

    //----------------------------- Listeners para los filtros --------------------------------------      
    //Se guardan los filtros en el objeto "datosBusqueda"
    formButton.addEventListener('click', (e)=>{
        e.preventDefault();
        textForm = formSearch.value.toUpperCase();
        datosBusqueda.nombre = textForm;
        filtrarProductos();        
    });

    formSearch.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            textForm = formSearch.value.toUpperCase();
            datosBusqueda.nombre = textForm;
            filtrarProductos();           
        }
    });

    buttonDisappear.addEventListener('click', (e)=>{
        console.log('Soy el boton')
        e.preventDefault();
        textForm = formDisappear.value.toUpperCase();
        datosBusqueda.nombre = textForm
        filtrarProductos();        
    });

    formDisappear.addEventListener("keypress", function(event) {
        console.log('Soy el formulario')
        if (event.key === "Enter") {
            event.preventDefault();
            textForm = formDisappear.value.toUpperCase();
            datosBusqueda.nombre = textForm
            filtrarProductos();           
        }
    });

    

    ordenarPor.addEventListener('click', (e)=>{
        e.preventDefault();
        datosBusqueda.ordenar = e.target.textContent.toUpperCase();
        ordenarProductos();
        filtrarProductos();
    })

    marcas.addEventListener('click', (e)=>{
        e.preventDefault();
        datosBusqueda.marca = e.target.textContent.toUpperCase();
        filtrarProductos();
    })

    procesador.addEventListener('click', (e)=>{
        e.preventDefault();
        datosBusqueda.procesador = e.target.textContent.toUpperCase();
        filtrarProductos();
    })

    ram.addEventListener('click', (e)=>{
        e.preventDefault();
        datosBusqueda.ram = e.target.textContent.toUpperCase();
        filtrarProductos();
    })

    screen.addEventListener('click', (e)=>{
        e.preventDefault();
        datosBusqueda.screen = e.target.textContent;
        filtrarProductos();
    })  
}

//Se llama a una funcion para mostrar los productos
mostrarProductos(ntb);      

//Funcion que imprime los productos
function mostrarProductos(ntb){
    
    //Primero se limpia el HTML previo de la section para luego imprimir los productos filtrados
    limpiarHTMLSection();
    
    ntb.forEach(producto => {    
        const prodHTML = document.createElement('div');
        prodHTML.className = ('card cardProduct p-0');

        prodHTML.innerHTML = 
        `<img class="card-img-top imgBoxCardProduct p-3 d-flex align-items-center" src="${producto.img}" alt="${producto.brand}">                

        <div class="card-body detailCardPoruct">                    
            <h4 class="card-price">$${producto.price}</h5>              
            <p class="card-text p-0 cardText">${producto.name}</p>                   
            <a href="#" class="btn btnCard" data-id="${producto.id}">Agregar al carrito!</a>                         
        </div> `

        productSection.appendChild(prodHTML)
        
    });

    if(productSection.innerHTML === ''){
        productSection.innerHTML = `<p>No se encontraron resultados...</p>`
      }
}

//Funcion que ordena los productos
function ordenarProductos(){   
    if(datosBusqueda.ordenar === 'MAYOR PRECIO'){
        return ntb.sort((a, b) => b.price - a.price)
    } else if(datosBusqueda.ordenar === 'MENOR PRECIO'){
        return ntb.sort((a, b) => a.price - b.price)
    }
    return ntb.sort((a, b) => a.position - b.position)    
}

//Funcion que filtra en base a la busqueda y filtros
function filtrarProductos(){
    resultado = ntb.filter(filtrarNombre).filter(filtrarMarca).filter(filtrarProcesador).filter(filtrarRam).filter(filtrarPantalla).filter(filtrarPantalla)
    mostrarProductos(resultado);

    if(resultado.length >= 1){
        filtroLista2()
    }
    
}

//Enlazado a filtrarProductos();
function filtrarNombre(nombre){
    if(datosBusqueda.nombre){
        return nombre.name.includes(datosBusqueda.nombre);
    }
    return nombre;    
}

//Enlazado a filtrarProductos();
function filtrarMarca(note){
    if(datosBusqueda.marca){
        return note.brand === datosBusqueda.marca;
    }
    return note;
}

//Enlazado a filtrarProductos();
function filtrarProcesador(proc){
    if(datosBusqueda.procesador){
        return proc.processor === datosBusqueda.procesador;
    }
    return proc;
}

//Enlazado a filtrarProductos();
function filtrarRam(ram){
    if(datosBusqueda.ram){
        return ram.ram === datosBusqueda.ram;
    }
    return ram;
}

//Enlazado a filtrarProductos();
function filtrarPantalla(screen){
    if(datosBusqueda.screen){
        return screen.screen === datosBusqueda.screen;
    }
    return screen;
}

//Se limpia el HTML previo de la section para luego imprimir los productos filtrados
function limpiarHTMLSection(){
    while(productSection.firstChild){
        productSection.removeChild(productSection.firstChild)        
    }
}


//--------------------------------------------------- Funciones para el Filtro Lateral ---------------------------------------------------------
//Principales Variables
const intelLabel = document.querySelector('#intelLabel');
const intelList = document.querySelector('#intelList');
const applelabel = document.querySelector('#applelabel');
const appleList = document.querySelector('#appleList');
const amdLabel = document.querySelector('#amdLabel');
const amdList = document.querySelector('#amdList');
const borrarFiltro = document.querySelector('#borrarFiltro');

//Evento para reinicar los filtros de busqueda
borrarFiltro.addEventListener('click', ()=>{window.location.href = "index.html";})

filtroLista1();

//Funcion para mostrar la lista de filtros con las caracteristicas de todos los productos(sin filtros)
function filtroLista1(){
    obtenerMarcas1();
    obtenerProcesador1();
    obtenerRam1();
    obtenerScreen1();  
    
    function obtenerMarcas1(){
        //Se obtiene todas las marcas de los productos
        obtenerMarca = ntb.map((marca)=>{return marca.brand});  
    
        //Se quitan duplicados de las marca
        obtenerMarcaSinDupl = obtenerMarca.filter((item,index)=>{
            return obtenerMarca.indexOf(item)  === index;
        })

        //Se imprime en HTML cada marca
        obtenerMarcaSinDupl.forEach((marc) => {
            const mark = document.createElement('a')
            mark.className = ('nav-link')
            mark.setAttribute('href', '#')
            mark.setAttribute('value', marc)
            mark.innerHTML = marc
            marcas.appendChild(mark)
        })
    }
    
    function obtenerProcesador1(){
    
        //Se obtiene todos los productos que tengan Core
        core = ntb.filter((Procesador)=>{return Procesador.processor.includes('CORE')});
    
        //Se obtiene un nuevo arreglo que tenga solo los Core disponibles
        obtenerCore = core.map((Procesador)=>{return Procesador.processor});
    
        //Se quita Core duplicados
        obtenerCoreSinDupl = obtenerCore.filter((item,index)=>{
            return obtenerCore.indexOf(item)  === index;
        })

        //Se imprime en HTML cada procesador Core
        obtenerCoreSinDupl.forEach((cores) => {
            const cor = document.createElement('li')
            cor.innerHTML = `<a class="nav-link" href="#" value="${cores}">${cores}</a>`
            intelList.appendChild(cor)
        })   
    
        //-------------------------------------------------------------------------------
        //Se obtiene todos los productos que tengan Apple
        apple = ntb.filter((Procesador)=>{return Procesador.processor.includes('M')});
        
        //Se obtiene un nuevo arreglo que tenga solo los Apple disponibles
        obtenerApple = apple.map((Procesador)=>{return Procesador.processor});
    
        //Se quita Apple duplicados
        obtenerAppleSinDupl = obtenerApple.filter((item,index)=>{
            return obtenerApple.indexOf(item)  === index;
        })

        //Se imprime en HTML cada procesador Apple
        obtenerAppleSinDupl.forEach((apples) => {
            const app = document.createElement('li')
            app.innerHTML = `<a class="nav-link" href="#" value="${apples}">${apples}</a>`
            appleList.appendChild(app)
        })
    
        //-------------------------------------------------------------------------------
        //Se obtiene todos los productos que tengan AMD
        AMD = ntb.filter((Procesador)=>{return Procesador.processor.includes('RYZEN')});
    
        //Se obtiene un nuevo arreglo que tenga solo los AMD disponibles
        obtenerAMD = AMD.map((Procesador)=>{return Procesador.processor});
        
        //Se quita ADM duplicados
        obtenerAMDSinDupl = obtenerAMD.filter((item,index)=>{
            return obtenerAMD.indexOf(item)  === index;
        })

        //Se imprime en HTML cada procesador Ryzen
        obtenerAMDSinDupl.forEach((amd) => {
            const am = document.createElement('li')
            am.innerHTML = `<a class="nav-link" href="#" value="${amd}">${amd}</a>`
            amdList.appendChild(am)
        })
    
        //-------------------------------------------------------------------------------
        //Se obtiene todos los productos que tengan ATHLON
        AmdAthlon = ntb.filter((Procesador)=>{return Procesador.processor.includes('ATHLON')});
    
        //Se obtiene un nuevo arreglo que tenga solo los ATHLON disponible
        obtenerAmdAthlon = AmdAthlon.map((Procesador)=>{return Procesador.processor});
    
        //Se quita ATHLON duplicados
        obtenerAmdAthlonSinDupl = obtenerAmdAthlon.filter((item,index)=>{
            return obtenerAmdAthlon.indexOf(item)  === index;
        })  

        //Se imprime en HTML cada procesador ATHLON
        obtenerAmdAthlonSinDupl.forEach((at) => {
            const atl = document.createElement('li')
            atl.innerHTML = `<a class="nav-link" href="#" value="${at}">${at}</a>`
            amdList.appendChild(atl)
        })
    }
    
    function obtenerRam1(){
    
        obtenerRam = ntb.map((ram)=>{return ram.ram});    
        //Quitar duplicados en la marca
        obtenerRamSinDupl = obtenerRam.filter((item,index)=>{
            return obtenerRam.indexOf(item)  === index;
        })

        //Se imprime en HTML cada Ram
        obtenerRamSinDupl.forEach((ramText) => {
            const ramm = document.createElement('a')
            ramm.className = ('nav-link')
            ramm.setAttribute('href', '#')
            ramm.setAttribute('value', ramText)
            ramm.innerHTML = ramText
            ram.appendChild(ramm)
        })
    }
    
    function obtenerScreen1(){
    
        obtenerScreen = ntb.map((screen)=>{return screen.screen});    
        //Quitar duplicados en la marca
        obtenerScreenSinDupl = obtenerScreen.filter((item,index)=>{
            return obtenerScreen.indexOf(item)  === index;
        })  

        //Se los numeros de manera ascendente
        let screenList = obtenerScreenSinDupl.sort((a, b) => a - b);

        //Se imprime en HTML cada Screen
        screenList.forEach((scr) => {
            const pant = document.createElement('a')
            pant.className = ('nav-link')
            pant.setAttribute('href', '#')
            pant.setAttribute('value', scr)
            pant.innerHTML = scr
            screen.appendChild(pant)
        })
    }
}

//Funcion para mostrar la lista de filtros con las caracteristicas de los productos que se van filtrando
function filtroLista2(){
    borrarFiltro.classList.remove('d-none');
    obtenerMarcas2();
    obtenerProcesador2();
    obtenerRam2();
    obtenerScreen2();  
    
    function obtenerMarcas2(){
        //Se obtiene todas las marcas de los productos
        obtenerMarca = resultado.map((marca)=>{return marca.brand});  
    
        //Se quitan duplicados de las marca
        obtenerMarcaSinDupl = obtenerMarca.filter((item,index)=>{
            return obtenerMarca.indexOf(item)  === index;
        })

        //Se llama a funcion para borrar duplicados del HTML de lista de filtros
        borrarList(marcas)

        //Se imprime en HTML cada marca
        obtenerMarcaSinDupl.forEach((marc) => {
            const mark = document.createElement('a')
            mark.className = ('nav-link')
            mark.setAttribute('href', '#')
            mark.setAttribute('value', marc)
            mark.innerHTML = marc
            marcas.appendChild(mark)
        })
    }
    
    function obtenerProcesador2(){
    
        //Se obtiene todos los productos que tengan Core
        core = resultado.filter((Procesador)=>{return Procesador.processor.includes('CORE')});
    
        //Se obtiene un nuevo arreglo que tenga solo los Core disponibles
        obtenerCore = core.map((Procesador)=>{return Procesador.processor});
    
        //Se quita Core duplicados
        obtenerCoreSinDupl = obtenerCore.filter((item,index)=>{
            return obtenerCore.indexOf(item)  === index;
        })     
        
        if(obtenerCoreSinDupl.length === 0){
           intelLabel.classList.add('d-none');
        } else if(obtenerCoreSinDupl.length >= 1){
            intelLabel.classList.remove('d-none');
        }
        
        //Se llama a funcion para borrar duplicados del HTML de lista de filtros
        borrarList(intelList)

        //Se imprime en HTML cada procesador Core
        obtenerCoreSinDupl.forEach((cores) => {
            const cor = document.createElement('li')
            cor.innerHTML = `<a class="nav-link" href="#" value="${cores}">${cores}</a>`
            intelList.appendChild(cor)
        })
        
        //-------------------------------------------------------------------------------
        //Se obtiene todos los productos que tengan Apple
        apple = resultado.filter((Procesador)=>{return Procesador.processor.includes('M')});
        
        //Se obtiene un nuevo arreglo que tenga solo los Apple disponibles
        obtenerApple = apple.map((Procesador)=>{return Procesador.processor});
    
        //Se quita Apple duplicados
        obtenerAppleSinDupl = obtenerApple.filter((item,index)=>{
            return obtenerApple.indexOf(item)  === index;
        })

        if(obtenerAppleSinDupl.length === 0){
            applelabel.classList.add('d-none');
        } else if(obtenerAppleSinDupl.length >= 1){
            applelabel.classList.remove('d-none');
        }

        //Se llama a funcion para borrar duplicados del HTML de lista de filtros
        borrarList(appleList)

        //Se imprime en HTML cada procesador Apple
        obtenerAppleSinDupl.forEach((apples) => {
            const app = document.createElement('li')
            app.innerHTML = `<a class="nav-link" href="#" value="${apples}">${apples}</a>`
            appleList.appendChild(app)
        })
    
        //-------------------------------------------------------------------------------
        //Se obtiene todos los productos que tengan AMD
        AMD = resultado.filter((Procesador)=>{return Procesador.processor.includes('RYZEN')});
    
        //Se obtiene un nuevo arreglo que tenga solo los AMD disponibles
        obtenerAMD = AMD.map((Procesador)=>{return Procesador.processor});
        
        //Se quita ADM duplicados
        obtenerAMDSinDupl = obtenerAMD.filter((item,index)=>{
            return obtenerAMD.indexOf(item)  === index;
        })
        
        //Se llama a funcion para borrar duplicados del HTML de lista de filtros
        borrarList(amdList)

        //Se imprime en HTML cada procesador RYZEN
        obtenerAMDSinDupl.forEach((amd) => {
            const am = document.createElement('li')
            am.innerHTML = `<a class="nav-link" href="#" value="${amd}">${amd}</a>`
            amdList.appendChild(am)
        })
        
        //-------------------------------------------------------------------------------
        //Se obtiene todos los productos que tengan ATHLON
        AmdAthlon = resultado.filter((Procesador)=>{return Procesador.processor.includes('ATHLON')});
    
        //Se obtiene un nuevo arreglo que tenga solo los ATHLON disponible
        obtenerAmdAthlon = AmdAthlon.map((Procesador)=>{return Procesador.processor});
    
        //Se quita ATHLON duplicados
        obtenerAmdAthlonSinDupl = obtenerAmdAthlon.filter((item,index)=>{
            return obtenerAmdAthlon.indexOf(item)  === index;
        })

        if((obtenerAmdAthlonSinDupl.length === 0) || (obtenerAMDSinDupl.length === 0)){
            amdLabel.classList.add('d-none');
        } else if((obtenerAmdAthlonSinDupl.length >= 0) || (obtenerAMDSinDupl.length >= 0)){
            amdLabel.classList.remove('d-none');
        }

        //Se llama a funcion para borrar duplicados del HTML de lista de filtros
        borrarList(amdList)
        
        //Se imprime en HTML cada procesador ATHLON
        obtenerAmdAthlonSinDupl.forEach((at) => {
            const atl = document.createElement('li')
            atl.innerHTML = `<a class="nav-link" href="#" value="${at}">${at}</a>`
            amdList.appendChild(atl)
        })
    }
    
    function obtenerRam2(){
    
        obtenerRam = resultado.map((ram)=>{return ram.ram});    
        //Quitar duplicados en la marca
        obtenerRamSinDupl = obtenerRam.filter((item,index)=>{
            return obtenerRam.indexOf(item)  === index;
        }) 

        //Se llama a funcion para borrar duplicados del HTML de lista de filtros
        borrarList(ram)

        //Se imprime en HTML cada Ram
        obtenerRamSinDupl.forEach((ramText) => {
            const ramm = document.createElement('a')
            ramm.className = ('nav-link')
            ramm.setAttribute('href', '#')
            ramm.setAttribute('value', ramText)
            ramm.innerHTML = ramText
            ram.appendChild(ramm)
        })
    }
    
    function obtenerScreen2(){
    
        obtenerScreen = resultado.map((screen)=>{return screen.screen});    
        //Quitar duplicados en la marca
        obtenerScreenSinDupl = obtenerScreen.filter((item,index)=>{
            return obtenerScreen.indexOf(item)  === index;
        })  
        let screenList = obtenerScreenSinDupl.sort((a, b) => a - b);

        //Se llama a funcion para borrar duplicados del HTML de lista de filtros
        borrarList(screen)
        
        //Se imprime en HTML cada Screen
        screenList.forEach((scr) => {
            const pant = document.createElement('a')
            pant.className = ('nav-link')
            pant.setAttribute('href', '#')
            pant.setAttribute('value', scr)
            pant.innerHTML = scr
            screen.appendChild(pant)
        })
    }
}

//Se toma lo que se busco en el form de las otras paginas
let formExterno = JSON.parse( localStorage.getItem('formExterno') );
formOut();

//Funcion para realizar buscqueda en paginam actual
function formOut(){
    datosBusqueda.nombre = formExterno
    filtrarProductos();
    localStorage.clear();
    datosBusqueda.nombre = ''
    borrarFiltro.classList.add('d-none');
}

//Funcion para borrar duplicados del HTML de lista de filtros
function borrarList(param){
    while(param.firstChild){
        param.removeChild(param.firstChild)        
    }
}

