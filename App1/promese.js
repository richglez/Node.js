//Variables
const colors = require("colors");
const { readFile } = require("fs");
const readline = require("readline");
const fourTxT = "./data/four.txt";
const newFileTxT = "./data/newFile.txt";
const thirdTxT = "./data/third.txt";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function getText(pathFile) {
    return new Promise(function (resolve, reject) {
        //promise = operaciones asíncronas
        readFile(pathFile, "utf8", (err, data) => {
            if (err) {
                //si existe un error
                reject(err); //La operación asociada a la promesa falló y se devuelve un motivo de rechazo (un error).
            }

            resolve(data); //La operación asociada a la promesa se completó con éxito! y se devuelve un valor.
        });
    });
}

async function main() {
    //crear un main asyncrono
    let opcion;
    do {
        console.log("Seleccione una opción:");
        console.log("1. Leer four.txt");
        console.log("2. Leer newFile.txt");
        console.log("3. Leer third.txt");
        console.log("0. Salir");

        opcion = await pregunta("Opción: "); // espera la respuesta del usuario
        switch (opcion) {
            case "1":
                await mostrarArchivo(fourTxT); // para esperar a que la función getText lea el archivo y luego muestra el contenido del archivo en la consola.
                break;
            case "2":
                await mostrarArchivo(newFileTxT); // para esperar a que la función getText lea el archivo y luego muestra el contenido del archivo en la consola.
                break;
            case "3":
                await mostrarArchivo(thirdTxT); // para esperar a que la función getText lea el archivo y luego muestra el contenido del archivo en la consola.
                break;
            case "0":
                console.log("Saliendo del programa.");
                break;
            default:
                console.log("Opción no válida.".bgRed);
        }
    } while (opcion !== "0");

    rl.close();
}

async function pregunta(pregunta) {
    return new Promise(function (resolve) {
        rl.question(pregunta, (respuesta) => {
            resolve(respuesta);
        });
    });
}

async function mostrarArchivo(path) {
    //para manejar errores que puedan ocurrir durante la lectura del archivo, mostrando un mensaje de error si la lectura falla.
    try {
        const data = await getText(path);
        console.log(data);
    } catch (error) {
        console.log("Error al leer el archivo:".bgRed, error);
    }
}

main();
