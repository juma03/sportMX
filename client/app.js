// const keyPublishable = process.env.pk_test_n1NUFQPi4s9FW1GXRmq5HmOU00bPWLsQgW;
// const keySecret = process.env.SECRET_KEY;

var express = require('express');
const SocketIO = require ('socket.io');



var path = require('path');

var { mongoose } = require('./database');

var bodyParser = require('body-parser');
const mifunctionfolios = require('./function/asignarfolios');
// const soCket = require('./sockett/socket');

var app = express();
var cors = require('cors');

 


app.use(cors());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTION");
//     next();
// });

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});




var fs = require('fs');

var http = require('http').createServer(app);
// var io = require('socket.io')(http);
// var soCket = require('./socketscodigo/socket');





app.set('port', process.env.PORT || 3000);




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS









//importar rutas

var appRoutes = require('./routes/app');
var solicitanteRoutes = require('./routes/solicitante');
var pescadorRoutes = require('./routes/pescador');
var pagoRoutes = require('./routes/pagos');
var licenciaRoutes = require('./routes/licencia');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var solicitanteaceptado = require('./routes/solicitanteaceptado');
var fileUpload = require('./routes/upload');
var uploadfile = require('./routes/uploadfile');
var imagenesRouter = require('./routes/imagenes');
var asignarfolios = require('./routes/asignafolios');
var solicitantepgos = require('./routes/solicitantepgos');
var finalizacion = require('./routes/finaliza');
var seleccionable = require('./routes/seleccionado');
var descargaPDF = require('./routes/descargapdf');
var enviaemail = require('./routes/mail');
var recibiremail = require('./routes/recibiremail');

var descargafile = require('./routes/descargafile');
var historialglobal = require('./routes/historial');
var emailtoTuripes = require('./routes/mailavisos');
var movimientoRouter = require('./routes/movimiento');
var movimientofilterRouter = require('./routes/movimientofilter');
var compraRouter = require('./routes/precompra');
var barcoRouter = require('./routes/barcos');
var configuracionRouter = require('./routes/configuracion');
var ticketprecompraRouter = require('./routes/ticketprecompra');
var entransitoRouter = require('./routes/entransito');

var empresaRoutes = require('./routes/empresa');
// var convertRouter = require('./routes/pdfconversion');









//coneccin ala base de datos

// ************************esto se usa cuando esta ne modo produccion
// app.use('/', express.static('client', { redirect: false }));
//************************* */









app.use(express.static('public'));
//midlesware

//rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/costolicencias', licenciaRoutes);
app.use('/payme', pagoRoutes);
app.use('/solicitante', solicitanteRoutes);
app.use('/pescador', pescadorRoutes);
app.use('/upload', fileUpload);
app.use('/uploadfile', uploadfile);
app.use('/aceptado', solicitanteaceptado);
app.use('/asignafolio1', asignarfolios);
app.use('/img', imagenesRouter);
app.use('/ticket', solicitantepgos);
app.use('/finaliza', finalizacion);
app.use('/seleccionado', seleccionable);
app.use('/descargapdf', descargaPDF);
app.use('/email', enviaemail);
app.use('/recibiremail', recibiremail);

app.use('/descargafile', descargafile);
app.use('/historial', historialglobal);
app.use('/email_avisosPgos', emailtoTuripes);
app.use('/movimiento', movimientoRouter);
app.use('/movimientofilter', movimientofilterRouter);
app.use('/precompra', compraRouter);
app.use('/barco', barcoRouter);
app.use('/configuracion', configuracionRouter);
app.use('/empresa', empresaRoutes);
app.use('/ticketprecompra', ticketprecompraRouter);
app.use('/entransito', entransitoRouter);
// app.use('/convertpdf', convertRouter)


app.use('/', appRoutes);



//modo produccion
// app.get('*', function(req, res, next) {
//     res.sendFile(path.resolve('client/index.html'));
// })

// io.on('connection', function(cliente) {
//     console.log('a user connected');

//     // cliente desconectado
//     cliente.on('disconnect', () => {
//         console.log(' Cliente desconectado');
//     });

//     cliente.on('solicitudPagada', () => {
//         // console.log('recibi tu mensaje');
//         // this.socketStatus = false;
//         io.emit('mensaje-nuevo', "este es un nuevo mensaje");
//     });



// });



// http.listen(app.get('port'), function() {
//     console.log('listening on *:3000');
// });

// app.listen(app.get('port'), () => {

//     console.log('server on port ', app.get('port'));
// });



const server = app.listen(app.get('port'), () => {
    console.log ('server on port', app.get('port'));
});

const io = SocketIO.listen(server);


//websocket
// io.on ('connection', () => {
//     console.log ('new connection');
// });

io.on ('connection', usuarioconectado => {
    console.log ('new connection');

    io.emit ('test event', 'aqui hay una dato');

    usuarioconectado.on ('disconnect',() => {
         console.log ('usuario desconectado')
     })


    


             usuarioconectado.on('solicitalicencia', (datosrecibidos) => {

                 console.log('recibi tu mensaje de prepago', datosrecibidos.id);
                 console.log ('recibi datos', datosrecibidos)

                 io.sockets.emit ('solicitalicencia', datosrecibidos);

               
             });


             usuarioconectado.on ('actualizausuarios', (datosrecibidos) =>{
                 console.log ('actualizacion');
                io.sockets.emit ('actualizausuarios', datosrecibidos);
             });

            
             usuarioconectado.on ('colorearenglon', (datosrecibidos)  =>{
               
                 io.sockets.emit ('colorearenglon', datosrecibidos);
             });
   
             

             usuarioconectado.on ('muestrapdf', (datosrecibidos)  =>{
                console.log ('*********************************', datosrecibidos);
                io.sockets.emit ('muestrapdf', datosrecibidos);
            });
    
});



