document.addEventListener("DOMContentLoaded", () =>{


    //Variable que aloja el botón de buscar
    var botonBuscar = document.getElementById("btnBuscar");

    //Al hacer clic en el botón guarda ese valor en el localStorage
    botonBuscar.addEventListener("click", () =>{
        
        //Variable que aloja lo que puso el usuario para buscar
        var busquedaUsuario = document.getElementById("inputBuscar").value;

        //Guardar el valor que puso el usuario en el localStorage
        localStorage.setItem("id", busquedaUsuario);

        //Variable que guarda el resultado del localStorage (y convierto a minúsculas para asegurarme que el url sea el correcto)
        var obtenerBusqueda = localStorage.getItem("id").toLowerCase();


        //Fetch que llama al servidor con la búsqueda indicada
        fetch(`https://images-api.nasa.gov/search?q=${obtenerBusqueda}`)
        .then (response =>{
            if (!response.ok){
                throw new Error("Problema con respuesta del fetch")
            }
            return response.json();
        })

        .then(datos =>{

            //ForEach para recorrer todos los elementos de collection
            datos.collection.items.forEach((elemento) =>{

                
            //Destructuring para recorrer el objeto e ir asignándole variables sin declararlas una a una
            let [imagen,titulo,descripcion,fecha] = [elemento.links[0].href, elemento.data[0].title, elemento.data[0].description, elemento.data[0].date_created]


            //Variable para alojar el contenedor
            let contenedor = document.getElementById("contenedor");


            //Mostrar el resultado en el html
            contenedor.innerHTML += `<div class="card">
  <img src="${imagen}" class="card-img-top" alt="imagen">
  <div class="card-body">
    <h5 class="card-title">${titulo}</h5>
    <div class="conenedor-descripcion">
      <p class="card-text">${descripcion}</p>
    </div>
    <p><small>${fecha}</small></a>
  </div>
</div>`

            })
            


        })

        .catch(error =>{
            console.error("Error:", error);
        })


    })


    //Fetch al servidor NASA

    

});