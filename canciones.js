const fs = require('fs');
const chalk = require('chalk');

const crearCancion = (nombre, artista, anyo) => {
    const canciones = listarCanciones('canciones.json');

    const indice = canciones.findIndex(
        (cancion) => cancion.nombre === nombre
    );

    if (indice === -1) {
        console.log(chalk.green.inverse('canciones creada'))
        canciones.push({
            nombre: nombre,
            artista: artista,
            anyo: anyo
        });
        escribirCanciones('canciones.json', canciones);
    } else {
        console.log(chalk.red.inverse('La canción ya está guardada'));
    }

    return canciones.length;
}

const borrarCancion = (nombre) => {

    const canciones = listarCanciones('canciones.json');
    
    const indice = canciones.findIndex((cancion) => cancion.nombre  === nombre);

    if(indice === -1){
        console.log(chalk.red.inverse('Cancion no encontrada'));
    } else {
        canciones.splice(indice, 1);
        escribirCanciones('canciones.json', canciones);
        console.log(chalk.green.inverse('Canción borrada'));
    }
}

const  ordenarCanciones = (opcion) => {
    const canciones = listarCanciones('canciones.json');

    if(opcion === 'nombre'){
        canciones.sort((cancionA, cancionB) => {
            if (cancionA.nombre.toLowerCase() < (cancionB.nombre.toLowerCase())) {
                return -1;
            } else if(cancionA.nombre.toLowerCase() > (cancionB.nombre.toLowerCase())) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (opcion === 'anyo') {
        canciones.sort((cancionA, cancionB) => {
            if (cancionA.anyo.toLowerCase() < (cancionB.anyo.toLowerCase())) {
                return -1;
            } else if(cancionA.anyo.toLowerCase() > (cancionB.anyo.toLowerCase())) {
                return 1;
            } else {
                return 0;
            }
        });
    } else {
        console.log(chalk.red.inverse('Opcion no encontrada'));
    }
    escribirCanciones('canciones.json', canciones);
}

const editarArtista = (artista, nuevoNombre, nuevoArtista, nuevoAnyo) => {
    const canciones = listarCanciones('canciones.json');
    const index = buscarCancion(artista);

    canciones[index].nombre = nuevoNombre;
    canciones[index].artista = nuevoArtista;
    canciones[index].anyo = nuevoAnyo; 

    escribirCanciones('canciones.json', canciones);
}

const buscarCancion = (artista) => {
    const canciones = listarCanciones('canciones.json');
    
    const cancionEncontrada = canciones.findIndex((cancion) => cancion.artista.toLowerCase() === artista.toLowerCase());

    if (cancionEncontrada != -1) {
        return cancionEncontrada;
    } else {
        console.log(chalk.red.inverse('No se encuentra este artista'));
    }
}

const escribirCanciones = (fichero, canciones) => {
    const textoJSON = JSON.stringify(canciones);
    fs.writeFileSync(fichero, textoJSON);
}

const listarCanciones = (fichero) => {
    try {
        const buffer = fs.readFileSync(fichero);
        const datosString = buffer.toString();
        return JSON.parse(datosString);
    } catch (error) {
        console.log(error);
        return[];
    }
}

module.exports = {
    crear: crearCancion,
    borrar: borrarCancion,
    ordenar: ordenarCanciones,
    escribir: escribirCanciones,
    listar: listarCanciones,
    editar: editarArtista
}