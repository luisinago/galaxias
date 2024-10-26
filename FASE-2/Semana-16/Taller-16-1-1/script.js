document.addEventListener("DOMContentLoaded", () =>{


    //Variable para guardar la url de la API
    var url = "https://pokeapi.co/api/v2/pokemon/";

    // Constante que guarda la lista con todos los Pókemon
    const todosLista = document.querySelector("#todosLista");


    //Fetch para obtener la lista
    for (let i = 1; i <= 151 /*Existen 151 pokemon en total*/; i++){
        fetch(url + i) //Fetch va llamando a cada uno de los pokemon
        .then(response => {
            if (!response.ok){
                throw new Error("Error en la respuesta del fetch");
            }
            return response.json();
        })
        .then(data => mostrarPokemon(data))

        .catch(error =>{
            console.error("Error:", error)
        })

    }

    //Funcion para mostrar todos
    function mostrarPokemon(poke){

        //Guardar tipos de pokemon (pueden tener más de uno)
        let tipos = poke.types.map(tipo => `<p class="tipo">${tipo.type.name}</p>`) 
        // ^ por cada tipo creamos un párrafo con los nombres de los types (type.type.name en la API)

        tipos = tipos.join("") //Para juntar los elementos del array en un string. De esta forma no sale la , que los separa


        //Cards de pokemon
        const div = document.createElement("div");
        div.classList.add("pokemonContainer");
        div.innerHTML = `
        <div class="imagenContainer">
        <img src="${poke.sprites.front_default}" alt=${poke.name}>
    </div>
    <div class="infoPokemon">
        <h2 class="nombrePokemon">${poke.name}</h2>
        <div class="tiposPokemon">
            ${tipos}
        </div>
        <div class="statsPokemon">
            <p class="stat">Altura: ${poke.height}m</p>
            <p class="stat">Peso: ${poke.weight}kg</p>
        </div>
    </div>
        `;

        todosLista.append(div);

    }




    document.addEventListener("keyup", e =>{

        var nombrePokemon = document.querySelector(".nombrePokemon").textContent.toLowerCase();
        //Cada vez que el usuario se posicione en el input 
        if (e.target.matches("#inputPokemon")){
            const valorUsuario = e.target.value.toLowerCase(); // convierte el valor que puso el usuario en el input a minúsculas
            
            //Recorreremos todas las cards de pokemon
            document.querySelectorAll(".pokemonContainer").forEach(pokemon => {
                //Variable para guardar el contenido de texto dentro de mi h2 .nombrePokemon y pasarlo a minúsuclas por si acaso
                const nombrePokemon = pokemon.querySelector(".nombrePokemon").textContent.toLowerCase();

                // Si el nombre incluye el texto del input, lo mostramos. Si no, lo ocultamos usando la clase .filtro de nuestro css
                if (nombrePokemon.includes(valorUsuario)) {
                    pokemon.classList.remove("filtro"); // Mostrar card de pokemon
                } else {
                    pokemon.classList.add("filtro"); // Ocultar card de pokemon
                }
            });
        }
    });

});

