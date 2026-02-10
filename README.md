# vue-electron-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Comandos para creacion base del proyecto: 

npm install -g @vue/cli

vue create vue-electron-app

cd vue-electron-app   

npm install --save-dev electron   

vue add electron-builder   

npm run electron:serve   

npm install vue-router
### Build final de la aplicación:
npm run electron:build   





<!--PRÁCTICA FINAL
Crear una plataforma en móvil. ma para gestionar actividades y reservas tanto desde escritorio como en movil
Backend: Mongo (obligatorio) y API en tecnología libre.
frontend: App de escritorio (Electron y Vue JS), App movil (flutter y Material Design)
funcionalidades:
-) nombre, desc, fecha y hora, plazas máximas nombre,
- Gestionar actividades y reservas
- Login y registro (identificación de red)
Comprobar asistencia (admin)
Evitar reservas duplicadas.
Roles:
-Admin- Crear, Modificar y Eliminar actividades, Ver reservas y Comprobar asistencia.
Usuario - Iniciar sesión, ver actividades (listado) y cancelar, reservar y comprobar reservas.
No cancela: asiste
Cancela antes de 15min: Cancelación
Cancela en un plazo de 15min: No asistencia
Cosas que suman:
- Validaciones en backend (+1pt)
Cosas que restan:
- No controlar reservas duplicadas (-1pt)
Extras:
Hacer un README.md decente
→ Funcionamiento y errores.
Dos diagramas de casos de uso





LOGIN:
        image <img alt="Vue logo" src="./assets/logo.png">

        textarea: nombre
        textarea: contraseña
        button: iniciar sesion              (if ADMIN abrir modo admin?)

        button: crear cuenta        
CREAR CUENTA?:
        image <img alt="Vue logo" src="./assets/logo.png">

        textarea: nombre
        textarea: contraseñaconf
        textarea: contraseñaconf
        button: crear cuenta 
        button: atrás

ACTIVIDADES:
        scrollview?: actividades button: reservar
                                 button: cancelar
        comprobar reservas? (ordenar los elementos y mostrar en la parte de arriba todas los reservados por el cliente?)

ADMIN:  button: crear nueva actividad (+ arriba del todo)
        button: ver reservas
        button: comprobar asistencia
        scrollview: actividades  button: modificar actividad
                                 button: eliminar actividad


BASE DE DATOS MONGODB

    CUENTA: id
            nombre-correo
            contraseña
            admin si no

    
    ACTIVIDADES: nombre
                 descripción?
                 duración
                 usuarios:
                 plazas maximas:





https://www.fffuel.co/dddepth/
-->
