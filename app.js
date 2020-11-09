const {crear, borrar, ordenar, listar, editar} = require('./canciones');
const yargs = require('yargs');


yargs.command({
    command: 'add',
    describe: 'añadir canción',
    builder: {
        nombre: {
            alias: 'n',
            describe: 'el titulo',
            demandOption: true,
            typ: 'string'
        },
        artista: {
            alias: 'ar',
            describe: 'el artista',
            demandOption: true,
            type: 'string'
        },
        anyo: {
            alias: 'an',
            describe: 'el año',
            demandOption: true,
            type: 'string'
        }

    },
    handler(argv) {
        crear(argv.nombre, argv.artista, argv.anyo);
    }
});

yargs.command({
    command: 'remove',
    describe: 'borrar canción',
    builder: {
        nombre: {
            alias: 'n',
            describe: 'nombre',
            demandOption: true,
            type: 'string'
        },
    }, 
    handler(argv) {
        borrar(argv.nombre);
    }
});

yargs.command({
    command: 'sort',
    describe: 'ordenar canciones',
    builder: {
        criterio: {
            alias: 't',
            describe: 'nombre o año',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        ordenar(argv.criterio);
    }
});

yargs.command({
    command: 'edit',
    describe: 'editar canción',
    builder: {
        artista: {
            alias: 'a',
            describe: 'Artista actual',
            demandOption: true,
            type: 'string'
        },
        nuevoNombre: {
            alias: 'nn',
            describe: 'Nuevo nombre',
            demandOption: true,
            type: 'string'
        },
        nuevoArtista: {
            alias: 'na',
            describe: 'Nuevo artista',
            demandOption: true,
            type: 'string'
        },
        nuevoAnyo: {
            alias: 'nan',
            describe: 'Nuevo año',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        editar(argv.artista, argv.nuevoNombre, argv.nuevoArtista, argv.nuevoAnyo);
    }
});

yargs.command({
    command: 'read',
    describe: 'leer canciones',
    handler(argv) {
        console.log(listar('canciones.json'));
    }
});

yargs.parse();