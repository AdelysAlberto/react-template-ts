### COMPONENTE

**Título:** Button
**Fecha de actualización:** 18 de Julio de 2024

### Definición

El componente `Button` es un componente reutilizable y personalizable, en el que se puede cambiar, tamaño, colores, añadir iconos, deshabilitar, etc.

### Props

- `title(Opcional)` (string): Se utiliza para añadir un texto al botón. Ejemplo: ("Save", "Cancel", "Back")
- `type(Opcional)` ("primary" | "secondary" | "success" | "warning" | "danger" | "info" | "link" | "light" | "default" | "hidden" | "degraded"): Para cambiar visualmente el componente dependiedo del tipo solicitado.
- `size(Opcional)` (string): Se utiliza para modificar el tamaño del botón.
- `margin(Opcional)` (string): Se utiliza para añadirle un margin.
- `onClick(Opcional)` (MouseEventHandler<HTMLButtonElement>): Función que se lanza cuando se pulsa el botón.
- `isLoading(Opcional)` (boolean): Si es true saldrá un spinner dentro del botón y si es false saldrá el título puesto.
- `disabled(Opcional)` (boolean): Se utiliza para deshabilitar el botón.
- `icon(Opcional)` (TIconKeys): Sirve para añadir iconos al botón.
- `iconWidth(Opcional)` (string): Modifica el ancho del icono, en caso de que haya.
- `iconHeight(Opcional)` (string): Modifica la altura del icono, en caso de que haya.
- `typeButton(Opcional)` (TButton): Especifica que tipo de botón es, onSubmit, etc.
- `id` (string): Le da un ID al componente.
- `iconColor(Opcional)` (string): Cambia el color del icono.
- `className(Opcional)` (string): Le añade una clase extra al botón para una personalización más grande.
- `classContainer(Opcional)` (string): Le añade una clase extra a todo el contenedor del componente.
- `iconPosition(Opcional)` ("left" | "right"): Si hay icono, cambia el icono de lado.

### Ejemplo de uso

El primer ejemplo será un botón sin form, la validación se haría desde el mismo botón si hay que hacer validación.

```jsx
import Button from "./Button";

<Button
  id="btn-example"
  title="Ejemplo de uso"
  onClick={() => console.log("He clickado")}
  type="primary"
  className="btn-example"
/>;
```

Este segundo ejemplo será el manejo del botón desde un form, aplicando una validación con un input requerido.

```jsx
import Button from "./Button";
import Form from "./Form";
import Input from "./Input";

const handleSubmit = (isValid: boolean) => {
  if (isValid) {
    console.log("He clickado");
  }
};

<Form onSubmit={handleSubmit}>
  <Input
    id="input-example"
    value={name}
    required
    onChange={(e) => (name = e)}
  />
  <Button
    id="btn-example"
    title="Ejemplo de uso"
    typeButton="submit"
    type="primary"
    className="btn-example"
  />
</Form>;
```
