## Component
_Input Componente_

## Fecha de Última Actualización
**Última actualización:** 09  de julio de 2024

## Descripción

El componente `Input` es un componente reutilizable de React que encapsula diferentes tipos de entradas (inputs) en un solo componente. Este componente utiliza `React.memo` para optimizar el rendimiento mediante la memorización y evitar renderizaciones innecesarias. Dependiendo del tipo de entrada especificada en las props, el componente renderiza el input correspondiente, ya sea de texto, número, contraseña, área de texto, fecha, teléfono, cantidad o email.

## Props

* `type` (string opcional): Especifica el tipo de input a renderizar. Los valores permitidos son: `text`, `number`, `password`, `textArea`, `date`, `tel`, `amount`, `email`. |
* `disableDecimal` (boolean opcional): Prop específica para el tipo `tel` que desactiva la entrada de decimales.  
* `disableNegativeNumbers` (boolean opcional): Prop específica para el tipo `tel` que desactiva la entrada de números negativos.                 
* `props` (IBaseInput): Todas las demás props necesarias para los componentes de input. Estas props son pasadas directamente al componente de input correspondiente. 


## Ejemplo de Implementación

```jsx
import React from "react";
import Input from "./components/Input";

const ExampleComponent = () => {
  return (
    <div>
      <h1>Ejemplo de Uso del Componente Input</h1>
      <form>
        <Input type="text" placeholder="Nombre" />
        <Input type="number" placeholder="Edad" />
        <Input type="password" placeholder="Contraseña" />
        <Input type="textArea" placeholder="Descripción" />
        <Input type="date" placeholder="Fecha de nacimiento" />
        <Input type="tel" placeholder="Número de teléfono" />
        <Input type="amount" placeholder="Monto" />
        <Input type="email" placeholder="Correo electrónico" />
      </form>
    </div>
  );
};

export default ExampleComponent;
```


## Detalles Técnicos

### Definición del Componente

El componente `Input` se define de la siguiente manera:

```jsx
import React from "react";
import {AmountInput} from "../AmountInput";
import {BaseInput} from "../BaseInput";
import {IBaseInput} from "../BaseInput/baseInput.types";
import {EmailInput} from "../EmailInput";

type InputObject = {
  [key in NonNullable<IBaseInput["type"]>]: React.ReactElement;
};

const Input = (props: IBaseInput) => {
  const inputs: InputObject = {
    text: <BaseInput type="text" {...props} />,
    number: <BaseInput type="number" {...props} />,
    password: <BaseInput type="password" {...props} />,
    textArea: <BaseInput type="textArea" {...props} />,
    date: <BaseInput type="date" {...props} />,
    tel: <BaseInput type="tel" disableDecimal disableNegativeNumbers {...props} />,
    amount: <AmountInput type="amount" {...props} />,
    email: <EmailInput {...props} />,
  };

  return inputs[props?.type ?? "text"];
};

const Input = React.memo(Input);

export default Input;
```

### Descripción Técnica

El componente `Input` mapea diferentes tipos de input a sus respectivos componentes especializados. Esto se logra mediante un objeto `inputs` que asocia cada tipo de input con su correspondiente elemento React. Luego, dependiendo del valor de `props.type`, se retorna el componente adecuado. La utilización de `React.memo` permite que el componente sea memorizado y así mejorar el rendimiento, evitando renderizaciones innecesarias.

Este enfoque permite un manejo flexible y escalable de diferentes tipos de inputs dentro de un solo componente reutilizable, manteniendo el código limpio y organizado.

---

