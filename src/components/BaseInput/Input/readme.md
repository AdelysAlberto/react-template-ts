### COMPONENTE
**Título: BaseInput**
**Fecha de última actualización:** 9 de julio de 2024

### Definición:

El componente `BaseInput` es un componente reutilizable, este componente no se usa directamente, es decir, este componente es usado por el componente Input, este componente ofrece la base de opciones para controlar la apariencia y el comportamiento del input, lo que lo hace adecuado para una variedad de casos de uso.

### Props:

* `placeholder` (texto opcional): Texto de marcador que se muestra dentro del input cuando está vacío.
* `type` (texto opcional): Tipo de input HTML. El valor predeterminado es "text". Puede ser "text", "password", "number", "email", "tel", "textArea", "date", "amount", "tel", "textAreaPassword";
* `value` (texto o número): Valor actual del input.
* `onChange` (función opcional): Se llama cuando cambia el valor del input. Recibe el nuevo valor del input, el nombre y el ID del input como argumentos.
* `onBlur` (función opcional): Se llama cuando el input pierde el foco. Recibe el nuevo valor del input como argumento.
* `classContainer` (texto opcional): Clases CSS adicionales para el contenedor del input.
* `className` (texto opcional): Clases CSS adicionales para el propio input.
* `maxLength` (número opcional): Número máximo de caracteres permitidos en el input.
* `minLength` (número opcional): Número mínimo de caracteres requeridos en el input.
* `max` (número opcional): Valor máximo permitido para el input de tipo "number".
* `min` (número opcional): Valor mínimo permitido para el input de tipo "number".
* `label` (texto opcional): Etiqueta del input que se muestra junto a él.
* `readOnly` (booleano opcional): Si es `true`, el input estará en modo de solo lectura. El valor predeterminado es `false`.
* `disabled` (booleano opcional): Si es `true`, el input estará deshabilitado. El valor predeterminado es `false`.
* `error` (texto opcional): Mensaje de error que se muestra debajo del input.
* `name` (texto): Nombre del input, necesario para los formularios.
* `showIconError` (booleano opcional): Si es `true`, se muestra un icono de error junto al mensaje de error. El valor predeterminado se obtiene de la variable de entorno `_env_?.SHOW_ICON_ERROR` y, si no está definida, es `true`.
* `isLabelLeft` (booleano opcional): Si es `true`, la etiqueta se muestra a la izquierda del input. El valor predeterminado es `false`.
* `required` (booleano opcional): Si es `true`, el input es obligatorio.
* `cs` (objeto opcional): Objeto que contiene estilos CSS personalizados para el componente.
* `onValidation` (función opcional): Se llama con un booleano que indica si el valor del input es válido después de que se haya ejecutado la validación interna.
* `customValidation` (función opcional): Función de validación personalizada que se ejecuta además de la validación interna.
* `tooltip` (texto opcional): Texto del tooltip que se muestra al pasar el mouse sobre la etiqueta.
* `size` (texto opcional): Puede ser "auto" (predeterminado), "small" o "large" para controlar el tamaño del input.
* `id` (texto): ID del input.
* `disableNegativeNumbers` (booleano opcional): Si es `true`, se deshabilitan los números negativos en el input de tipo "number". El valor predeterminado es `false`.
* `disableDecimal` (booleano opcional): Si es `true`, se deshabilitan los decimales en el input de tipo "number". El valor predeterminado es `false`.
* `textAlign` (texto opcional): Puede ser "left" (predeterminado), "center" o "right" para controlar la alineación del texto dentro del input.
* `labelColorText` (texto opcional): Color del texto de la etiqueta.
* `pattern` (texto opcional): Expresión regular para la validación personalizada del valor del input.
* `title` (texto opcional): Título del input que se muestra como tooltip al pasar el mouse sobre él.
* `patternMessage` (texto opcional): Mensaje de error personalizado que se muestra cuando el valor del input no coincide con la expresión regular `pattern`.


## Ejemplo de implementación 

```jsx
import BaseInput from './BaseInput';

function MyForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <form>
      <BaseInput
        label="Nombre"
        placeholder="Introduce tu nombre"
        value={name}
        onChange={setName}
        name="name"
        required
        id="input-name"
      />
      <BaseInput
        label="Correo electrónico"
        placeholder="Introduce tu correo electrónico"
        type="email"
        value={email}
        onChange={setEmail}
        name="email"
        id="input-email"
      />
      
      <button type="submit">Enviar</button>
    </form>
  );
}

export default MyForm;
```

En este ejemplo, se utilizan dos instancias del componente `BaseInput` para crear campos de entrada para el nombre y el correo electrónico del usuario. Cada instancia tiene un conjunto diferente de props para personalizar su apariencia y comportamiento.

**Observaciones:**

* El ejemplo anterior muestra una implementación básica del componente `BaseInput`. Se pueden usar otras props y configuraciones para lograr diferentes efectos y comportamientos.
* Es importante utilizar valores válidos para las props para garantizar el correcto funcionamiento del componente.
* Se puede personalizar la apariencia del componente utilizando CSS personalizado o las props `cs`.
