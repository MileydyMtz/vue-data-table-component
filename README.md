# Documentación del componente DataTable
## Descripción:
Este componente se utiliza para crear una tabla de datos dinámica que se llena con datos provenientes de una API. El componente es responsivo, tiene estilos incorporados y gestiona los errores de petición HTTP.

## Tecnologías usadas
A continuación, se enlistan las tecnologías y librerías utilizadas en el desarrollo de este componente:
* Vue 3
* Axios
* Preprocesador SCSS
* Vue Test Utils
* Vitest
* Prettier
* ESLint

## Características del componente
### Props
El componente *ProductGallery* tiene tres propiedades:
* **api** (String) - La URL de la API desde donde se obtendrán los datos.
* **displayHeaders** (Array) - Los nombres de las columnas que se mostrarán en la tabla. Estos deben corresponder a las claves de los objetos devueltos por la API.
* **description** (String) - Una descripción textual para la tabla que se presentará a los usuarios.

### Funciones
* **fetchData**: Esta función se encarga de obtener los datos de la API y manejar posibles errores durante la solicitud. Se ejecuta cuando el componente se monta gracias a onMounted(fetchData).

### Variables reactivas
* **items**: (Array) Es la lista de elementos obtenidos de la API.
* **error**: (Boolean) Es un indicador de si ocurrió un error durante la solicitud a la API.
* **descriptionId**: (String) Es el ID del elemento de la descripción de la tabla.

### CSS
* Los estilos están definidos en la sección de <style> y usan la extensión .scss.
* Los estilos están "scoped", lo que significa que solo se aplicarán a este componente y no afectarán a otros componentes de la aplicación donde se reutilice.
* La tabla es responsive y se adapta al tamaño de la pantalla.
* Se aplican estilos a las filas pares e impares para facilitar la lectura.
* Se aplica un efecto de *hover* a las filas de la tabla para indicar la interactividad.
* Se muestra un mensaje de error estilizado en caso de que haya algún error en la solicitud a la API.

### Notas
* Asegúrese de que las claves que pasa a *displayHeaders* coincidan con las claves de los objetos que devuelve la API.
* Depende de *axios* para hacer solicitudes HTTP a la API.
* Se utiliza la función *ref* de Vue 3 se utiliza para crear una variable reactiva
* Se utiliza la función *onMounted* para llamar a la función *fetchData* después de que se ha montado el componente.

## Uso del componente
Para utilizar este componente, primero se debe descargar el archivo *DataTable.vue* que se encuentra dentro de *src/components* y agregarlo al proyecto donde se reutilizara. 
Posteriormente se debe importar y usarlo en la plantilla mediante la etiqueta *DataTable*. Asegúrese de pasar las propiedades *api*, *displayHeaders* y *description*:

A continuación, un ejemplo:

```vue
<template>
  <div>
    <DataTable 
      :api="'https://64766fef9233e82dd53a050e.mockapi.io/api/products'" 
      :displayHeaders="['id', 'name', 'price', 'stock', 'description']" 
      description="Esta es una tabla de productos"
    />
  </div>
</template>

<script>
import DataTable from './components/DataTable.vue'

export default {
  components: {
    DataTable
  }
}
</script>

```

## Demostración
El ejemplo anterior se encuentra en el archivo *App.vue*, este componente utiliza [MockAPI](https://mockapi.io/) para crear una API de prueba que retorna datos de productos, los cuales se usan para crear la tabla.

La implementación de este componente se puede ver de la siguiente forma:

**Visualización de la tabla de datos**

![Data Table](https://github.com/MileydyMtz/vue-data-table-component/assets/85470047/e7fd996e-d188-48c5-9d8b-1e026c55654e)

**Visualización del mensaje de error**

![Data Table Error](https://github.com/MileydyMtz/vue-data-table-component/assets/85470047/c2861761-53c8-470f-9f97-38a67d99efef)


## Pruebas
Las pruebas se han implementado utilizando la biblioteca vitest para correr las pruebas y @vue/test-utils para montar el componente. Además se usa axios-mock-adapter para simular las respuestas de la API.

A continuación, se muestran las pruebas implementadas:
* **renders properly**: Esta prueba verifica que el componente se renderiza correctamente con los datos proporcionados por la API simulada. Asegura que la tabla se llene con los datos correctos y que se muestre la descripción proporcionada.
* **handle network errors correctly**: Esta prueba verifica que el componente maneja correctamente los errores de red. Asegura que se muestra el mensaje de error adecuado en caso de un problema de red.
