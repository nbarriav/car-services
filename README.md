# Aplicación de servicios de autos realizada con React + Typescript + Supabase

Se realizó una aplicación de servicios de autos con React + Typescript + Supabase. La aplicación permite crear, eliminar y listar servicios de autos.

Para el desarrollo de la aplicación se utilizó la base de datos de Supabase.
Para el manejo de sesiones se utilizó la autenticación de Supabase. Para lo anterior se creó un contexto de autenticación que permite manejar el estado de la sesión en toda la aplicación. (src/auth/\*)

Se crearon dos custom hooks:

- useFetchProducts: permite obtener los servicios de autos desde la base de datos de Supabase.
- useServices: permite todo el manejo de los servicios como añadir, eliminar y listar.

Dentro del app se crearon dos rutas:

- /: ruta principal que muestra los servicios de autos del usuario logueado.
- /login: ruta que permite iniciar sesión utilizando el sistema de autenticación de Supabase.
- /signup: ruta que permite crear una cuenta utilizando el sistema de autenticación de Supabase.

Se tiene una carpeta para los diferentes componentes y otra de pages para utilizar esos componentes en las diferentes rutas que tiene la página.

Para estilos se utilizó tailwind.

Para un mejor desarrollo también fue utilizado ESLint y Prettier.

## Aspectos a mejorar

- Estilos de la aplicación.
- El manejor de tipos en la aplicación dado Supabase.
- Agregar EDIT y paginación.
- Agregar tests.
