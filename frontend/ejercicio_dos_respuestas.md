2.1) ¿Cómo implementarías las acciones del frontend utilizando redux? (por ejemplo autenticación, solicitud de clientes activos para el usuario y solicitud de casos por cliente)
Desde los componentes llamaría a los métodos dentro del action que realizarian la llamada a la api desde el apiService tal y como se ven en el challenge. Para la autenticación agregaria una nueva llamada verificando si el token guardado en el localStorage es válido como para dar mas seguridad a la app.


2.2) Si quisiéramos agregar una ruta nueva a la app, ¿cómo reestructurarías el index.js?

En el caso de agregar nuevas rutas el index.js lo dejaría igual, agregaria nuevas rutas dentro del App.tsx.