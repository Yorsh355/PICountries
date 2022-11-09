### SEQUELIZE

///Relación de uno a uno video 4 sequelize
//Usuario tiene una direccion
//Añade una clave foranea userId a la tabla addresses
User.hasOne(Address);
//Añade una clave userID a la tabla addresses
Address.belongsTo(User);

////Relación 1 a muchos 1:N video 5 sequelize
//Usuario va a tener muchos post o publicaciones
//Se añade una clave userId a la tabla ´posts
User.hasMany(Post);
//Se añade una clave userId a la tabla posts
Post.belongsTo(User);

///Relacion de muchos a muchos N:M video 6
//El usuario pertenezca a varias bandas
//Esto crea una nueva tabla en la base de datos llamada user_band
//Esta relación añade las siguientes funciones:
//user.addBand, user.getBand... etc.
User.belongsToMany(Band, {througth: "user_band"});
Band.belongsToMany(User, {througth: "user_band"});
image.png

## INCLUIR DATOS DE ACTIVIDADES:

trabajarlo en getAllCountries, importo el modelo de actividades y le paso la info como objeto.

//SELECT \* FROM tabla citas INNER JOIN tabla clientes ON le decimos de citas y clientes cuales son las columnas relacionadas de citas es clienteId y de clientes es el id, despues de ON colocamos cliente.id = citas.clienteId;
Con esto nos trae la info de las 2 tablas.

//TABLA INTERMEDIA
Toma 3 parámetros idtablaA, idtablaB, idtablaintermedia

Devemos insertar la información de nuestras tablas en la tabla intermedia
INSERT INTO nombretablaintermedia (citaId, servicioId) VALUES(2,8);

Como unir las tablas con un JOIN:

SELECT \* FROM nombretablaintermedia
LEFT JOIN nombretabla citas ON citas.id = nombretablaintermedia.citaId
LEFT JOIN nombretabla servicios ON servicios.id = nombretablaintermedia.servicioId;

### FRONT

Rutas
Redux
useSelector() para obtener estados: ej const a = useSelector((state)=>state.inicialState)
useDispatch() para despachar acciones

Function onclick al boton start, va a hacer el dispach de la función que hice en action, el btn lo envuelvo en un link para que me
lleve al home.
En el home hago la lógica para que espere y muestre. Lo que traiga del state le hago un map a cada Componente Card

useEffect(())