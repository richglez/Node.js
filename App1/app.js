let usernames = "@riichh";
let edad = 21;
let password = "thisis_myfucking-passkey";
let hasHobbies = true;
ponts = [10, 20, 30];
let direccion = {
    calle: "Calle fantasma 12",
    colania: "Chapultepec",
    numExtencion: 12,
    entreCalles: "Venustiana Carranza",
};

names = ["John", "Rich", "Mia"];
for (let i = 0; i < names.length; i++) {
    const name = names[i];
    console.log("Nombre: " + name);
}

console.log(
    `Informacion de la cuenta: 
    \n Nombre de usuario: ${usernames} 
    \n Edad: ${edad} 
    \n Password: ${password} 
    \n Tienes hobbies?: ${hasHobbies} 
    \n Direccion: ${direccion.calle}
                  ${direccion.colania}
                  ${direccion.entreCalles}
                  ${direccion.numExtencion}`
);
