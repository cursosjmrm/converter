const express = require('express'); //express es el servidor de backend

const app = express();
const port = 3000;

app.get('/', (req, res) => { //cuando se declara al / como endpoint se le está indicdando que ingrese a la raíz de la ruta
    //se crea una función que recibe los parámetros req y res, req se utiliza para requerir información
    //res se utiliza para responder al cliente
    res.send('Hola mundo');
});//creando el endpoint


app.get('/converter', (req, res) => {
    let { convertFrom, convertTo, value } = req.query; //a partir del URL http://localhost:3000/converter?convertFrom=binary&convertTo=decimal&value=1010
    //se obtienen variables, convertFrom indica tipo de valor (b, o, d, h) y convertTo indica a qué tipo convertirlo
    //    console.log(convertFrom);
    //    console.log(convertTo);
    //    console.log(value

    //ahora validar datos
    //este if es muy largo (mala práctica), deben separarse los condicionales
    if (convertFrom === undefined
        || convertFrom === ''
        || convertTo === undefined
        || convertTo === ''
        || value === undefined
        || value === ''
    ) {
        return res.status(400).json({ status: false, value: 'Los datos no pueden ser leídos' });
        //esto es para devolverle el error al usuario si se cumple el if, el  status es para el código del error
    }
    //);
    switch (convertFrom) {
        case 'binary': {
            value = '0b' + value;
            break;
        }

        case 'octal': {
            value = '0o' + value;
            break;
        }

        case 'hexadecimal': {
            value = '0x' + value;
            break;
        }
        case 'decimal': {
            value = value;
            break;
        }
        default: {
            res.status(400).json({
                status: false,
                value: 'ConvertFrom no es valido, por favor realice la consulta nuevamente'
            });
        }
    }

    if (isNaN(value)) {
        res.status(400).json({
            status: false,
            value: 'Value no es válido, por favor verifique'
        });
    }

    switch (convertTo) {
        case 'binary': {
            res.status(200).json({
                status: true,
                value: Number(value).toString(2)
            });
            break;
        }

        case 'octal': {

            res.status(200).json({
                status: true,
                value: Number(value).toString(8)
            });
            break;
        }

        case 'hexadecimal': {

            res.status(200).json({
                status: true,
                value: Number(value).toString(16)
            });
            break;
        }
        case 'decimal': {

            res.status(200).json({
                status: true,
                value: Number(value).toString(10)
            });
            break;
        }
        default: {
            res.status(400).json({
                status: false,
                value: 'ConvertTo no es valido, por favor realice la consulta nuevamente'
            });
        }
    }

    console.log(value);
    //res.send('Converter');
});

//creando otro endpoint


app.listen(port, () => {  //puerto donde escucha la aplicación
    //    console.log("El servidor está corriendo en http://localhost:3000"); //callback aprendiendo
    console.log(`Servidor está corriendo en el puerto: ${port}`);
});