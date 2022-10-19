// variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners(){
    // Cuando agregas un curso presionando agregar al carrito
    listaCursos.addEventListener('click', agregarCurso)


    // Elimina curso del carrito
    carrito.addEventListener('click', eliminarCurso )

    // Vaciar carrito BTN
    vaciarCarritoBtn.addEventListener('click', ()=>{
       articulosCarrito = []; // reseteamos el arreglo
       limpiarHTML();
    })
}

// funciones

function agregarCurso(e){
    // si el usuario da clic en el elemento que tiene la clase agregar carrito
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito'))
    {
        const cursoSeleccionado = e.target.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }

}

// Lee el contenido del HTML al que le dimos click y extrae la información del curso

// Elimina uun curso del carrito
function eliminarCurso(e){
 
    if(e.target.classList.contains('borrar-curso')){
      const cursoId = e.target.getAttribute('data-id');
      // elimina del arreglo de articulos Carrito por el data ID
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)
        
        carritoHtml(); // volemos a iterar sobre el carrito y mostrar su HTML
    }
}

function leerDatosCurso(curso){
    // console.log(curso)

    // crear un objeto con el contenido del curso actual
   const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h2').textContent,
        precio: curso.querySelector('p').textContent,
        id: curso.querySelector('button').getAttribute('data-id'),
        cantidad: 1,
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
   if(existe){
    // actualizamos la cantidad
    const cursos = articulosCarrito.map( curso => {
        if(curso.id === infoCurso.id){
            curso.cantidad++;
            return curso; // retorna el objeto actualizado
        } else {
            return curso; // retorna los objetos que no son los duplicados
        }
    });
    articulosCarrito = [...cursos];
   
    }else{
    // agrega elementos al arreglo del carrito
        // Agrega elementos al arreglo del carrito
    // Aca usamos el spread operator aunque tambien funciona el .push
    articulosCarrito = [...articulosCarrito, infoCurso];
   }

    // console.log(infoCurso)


    // console.log(articulosCarrito);
    carritoHtml();
}

/// Muestra el carrito de compras en el HTML

function carritoHtml(){

    // limpiar el HTML

    limpiarHTML();
    // Recorre el carrito y genera el HTML
    // aca iteramos con forEach
    // agregamos un arrow function
    // creamos el html para agrega el arreglo
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="celda">
                <img src= "${imagen}" width="100">
            </td>
            <td class="celda">
                ${titulo}
            </td>
            <td class="celda">
                ${precio}
            </td>

            <td class="celda">
                ${cantidad}
            </td>
            <td class="celda">
                <a href = "#" class="borrar-curso" data-id="${id}"> x </a>
            </td>
        `;

        // agrega el html del carrito
        contenedorCarrito.appendChild(row);
    });
}

// Elimina los curso del tbody

function limpiarHTML(){

    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}