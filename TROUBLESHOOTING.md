# Solución de Problemas de Inicio de Sesión

## Problema: El inicio de sesión no funciona

Se ha detectado que el inicio de sesión en el panel de administración no está funcionando debido a un error de conexión con MongoDB. El error específico es:

```
MongoDB connection error: MongooseServerSelectionError: connect ECONNREFUSED ::1:27017, connect ECONNREFUSED 127.0.0.1:27017
```

## Solución

Siga estos pasos para resolver el problema:

### 1. Verificar que MongoDB está instalado

Si MongoDB no está instalado en su sistema, necesitará instalarlo:

1. Descargue MongoDB Community Server desde [mongodb.com](https://www.mongodb.com/try/download/community)
2. Siga las instrucciones del instalador para completar la instalación

### 2. Verificar que el servicio de MongoDB está en ejecución

#### En Windows:

1. Presione `Win + R`, escriba `services.msc` y presione Enter
2. Busque el servicio "MongoDB"
3. Si el estado no es "En ejecución", haga clic derecho y seleccione "Iniciar"

#### En macOS:

```
brew services start mongodb-community
```

#### En Linux (Ubuntu/Debian):

```
sudo systemctl start mongod
```

### 3. Verificar la configuración de conexión

El sistema está configurado para conectarse a MongoDB en la siguiente URL:

```
mongodb://localhost:27017/restaurant_reservations
```

Asegúrese de que:
- MongoDB está escuchando en el puerto 27017
- No hay firewalls bloqueando la conexión

### 4. Reiniciar el servidor

Después de asegurarse de que MongoDB está en ejecución:

1. Detenga el servidor actual (Ctrl+C en la terminal donde se ejecuta)
2. Inicie el servidor nuevamente con `npm start`

### 5. Crear un usuario administrador (si es la primera vez)

Si es la primera vez que utiliza el sistema, es posible que necesite crear un usuario administrador en la base de datos. Puede hacerlo utilizando MongoDB Compass o la línea de comandos de MongoDB.

## Contacto de soporte

Si después de seguir estos pasos continúa teniendo problemas, por favor contacte al soporte técnico proporcionando los detalles del error.