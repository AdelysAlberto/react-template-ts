## Component
_Loading Componente_

## Fecha de Última Actualización
**Última actualización:** 11 de abril de 2024

## Descripción

El componente `Loading` es un componente de React que muestra un spinner de carga. Para utilizarlo es necesario especificar una propiedad `isLoading` que corresponde a un tipo booleano. Cuando `isLoading` sea `true` se mostrará la animación de carga, cuando sea `false` se ocultará el componente. También tiene propiedades opcionales para manejar el tamaño, un texto, o si se debe mostrar el spinner dentro de un modal.

## Props

* `isLoading` (boolean): Muestra u oculta el componente en funcion de un booleano.
* `text` (string opcional): Añade un texto debajo del spinner.
* `isModal` (boolean opcional): Especifica si mostrar el componente dentro de un modal. El valor por defecto es: `false`.
* `ariaLive` (boolean opcional): Parametro de accesibilidad con lector de pantalla referente a como se deben anunciar los cambios en el componente. Las posibles opciones son: `polite`, `asertive`, y `off`. El valor por defecto es `polite`.
* `size` (boolean opcional): Manaja el tamaño del componente. Los valores permitidos son: `small`, `medium`, `large`. El valor por defecto es `medium`.

# Ejemplo de Implementación

```jsx
import React from "react";
import Loading from "./components/Loading";

const ExampleComponent = () => {
  const {user, isFetching} = useUser()
  return (
    <div>
      <h1>Ejemplo de Uso del Componente Loading</h1>
        {isFetching ? <Loading isLoading /> : 
            <div>{user.name}</div>}
    </div>
  )
};

export default ExampleComponent;
```
