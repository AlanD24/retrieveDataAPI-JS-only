let pagina = 1;
const btnAnterior = document.querySelector('#btnAnterior');
const btnSiguiente = document.querySelector('#btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if(pagina < 1000){
        pagina += 1;
        cargarPeliculas();
    }
});

btnAnterior.addEventListener('click', () => {
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    }
});

const cargarPeliculas = async () => {
    //Aqui dentro se conecta a la API, obtiene pelis y las va a cargar
    
    //Fetch, cuando lo usamos, nos devuelve una promesa
    //Una promesa es una petición pero debemos esperar a que acabe para poder hacer algo
    //Await sirve para esperar a que acabe una petición y cuando acabe, se pasa a la siguiente línea
    
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=5903fa0d4e1fde9f6579c9541a65ce05&language=es-MX&page=${pagina}`);
        console.log(respuesta);

        //Si la respuesta es correcta
        if(respuesta.status === 200){
            const datos = await respuesta.json();
            
            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h3 class="titulo">${pelicula.title}</h3>
                </div>
                `;
            });

            document.getElementById('contenedor').innerHTML = peliculas;
            
        } else if(respuesta.status === 401) {
            console.log('Tienes un error 401');
        } else if(respuesta.status === 404) {
            console.log('La película que buscas no existe');
        } else {
            console.log('Hubo un error y no sabemos qué pasó');
        }

    } catch(error) {
        console.log(error);
    }
}

cargarPeliculas();