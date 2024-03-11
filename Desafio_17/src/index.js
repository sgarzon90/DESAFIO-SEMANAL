const fs = require("fs");
const chalk = require("chalk");

const args = process.argv.slice(2);

if (args.length < 2) {
    console.error(chalk.red("Ejecutar las instrucciones a continuación: node index.js <comando a ejecutar: create/read/update/delete> <nombre_archivo> [contenido]"));
    process.exit(1);
}

const [ command, fileName, ...contentArray ] = args;
const content = contentArray.join(" ");

const createFile = (fileName, content) => {
    fs.writeFile(fileName, content, (err) => {
        if (err) {
            console.error(chalk.red("Error al crear el archivo:"), err);
        } else {
            console.log(chalk.green("Archivo creado exitosamente."));
        }
    });
};

const readFile = (fileName) => {
    fs.readFile(fileName, "utf8", (err, result) => {
        if (err) {
            console.error(chalk.red("Error al leer el archivo:"), err);
        } else {
            console.log(chalk.yellow("Contenido del archivo:"), result);
        }
    });
};

const updateFile = (fileName, content) => {

    fs.access(fileName, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(chalk.red("El archivo no existe. No se puede actualizar."));
        } else {
            fs.writeFile(fileName, content, (err) => {
                if (err) {
                    console.error(chalk.red("Error al modificar el archivo:"), err);
                } else {
                    console.log(chalk.green("Archivo modificado exitosamente."));
                }
            });
        }
    });
};

const deleteFile = (fileName) => {
    fs.unlink(fileName, (err) => {
        if (err) {
            console.error(chalk.red("Error al eliminar el archivo:"), err);
        } else {
            console.log(chalk.green("Archivo eliminado exitosamente."));
        }
    });
};

switch (command) {
case "create":
    createFile(fileName, content);
    break;
case "read":
    readFile(fileName);
    break;
case "update":
    updateFile(fileName, content);
    break;
case "delete":
    deleteFile(fileName);
    break;
default:
    console.error(chalk.red("Comando no reconocido:"), command);
    process.exit(1);
}