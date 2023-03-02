<div align="center">
    <img src="demo/src/assets/design.png" width="229" height="233" alt="solid-colorful" />
</div>

<div align="center">
  <strong>solid-colorful</strong> is a fork of <strong>react-colorful</strong>: a tiny color picker component for SolidJS apps.
</div>

## Features

- 🗜 **Small**: Just 5 KB gzipped
- 🌳 **Tree-shakeable**: Only the parts you use will be imported into your app's bundle.
- 🚀 **Fast**: Built with hooks and functional components only.
- 🛡 **Bulletproof**: Written in strict TypeScript and has robust test coverage.
- 🗂 **Typed**: Ships with [types included](#typescript-support)
- 😍 **Simple**: The interface is straightforward and easy to use.
- 👫 **Cross-browser**: Works out-of-the-box for most browsers, regardless of version.
- 📲 **Mobile-friendly**: Supports mobile devices and touch screens.
- 💬 **Accessible**: Follows the [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) guidelines to support users of assistive technologies.
- 💨 **Minimal dependencies**

## Live react-colorful demos
We don't have demos specific to SolidJS, but here are some for **react-colorful**
- [Website](https://omgovich.github.io/react-colorful)
- [HEX Color Picker (CodeSandbox)](https://codesandbox.io/s/react-colorful-demo-u5vwp)
- [RGBA Color Picker (CodeSandbox)](https://codesandbox.io/s/react-colorful-rgb-o9q0t)

## Table of Contents

- [Features](#features)
- [Live react-colorful demos](#live-react-colorful-demos)
- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
- [Supported Color Models](#supported-color-models)
    - [Available pickers](#available-pickers)
    - [Code example](#code-example)
- [Customization](#customization)
- [How to paste or type a color?](#how-to-paste-or-type-a-color)
- [Code Recipes](#code-recipes)
- [TypeScript Support](#typescript-support)
- [Why solid-colorful?](#why-solid-colorful)

## Getting Started

```
npm install thespooler/solid-colorful
```

```js
import { HexColorPicker } from "solid-colorful";
import { createEffect, createSignal } from "solid-js";

const YourComponent = () => {
  const [color, setColor] = createSignal("#aabbcc");

  createEffect(() => {
    let newColor = color();
    console.log("🎨", newColor);
  });

  return <HexColorPicker color={color()} onChange={setColor} />;
};
```

## Supported Color Models

We provide 12 additional color picker components for different color models, unless your app needs a HEX string as an input/output format.

<details>
  <summary>How to use another color model</summary>

#### Available pickers

| Import                      | Value example                      |
| --------------------------- | ---------------------------------- |
| `{ HexColorPicker }`        | `"#ffffff"`                        |
| `{ HexAlphaColorPicker }`   | `"#ffffff88"`                      |
| `{ RgbColorPicker }`        | `{ r: 255, g: 255, b: 255 }`       |
| `{ RgbaColorPicker }`       | `{ r: 255, g: 255, b: 255, a: 1 }` |
| `{ RgbStringColorPicker }`  | `"rgb(255, 255, 255)"`             |
| `{ RgbaStringColorPicker }` | `"rgba(255, 255, 255, 1)"`         |
| `{ HslColorPicker }`        | `{ h: 0, s: 0, l: 100 }`           |
| `{ HslaColorPicker }`       | `{ h: 0, s: 0, l: 100, a: 1 }`     |
| `{ HslStringColorPicker }`  | `"hsl(0, 0%, 100%)"`               |
| `{ HslaStringColorPicker }` | `"hsla(0, 0%, 100%, 1)"`           |
| `{ HsvColorPicker }`        | `{ h: 0, s: 0, v: 100 }`           |
| `{ HsvaColorPicker }`       | `{ h: 0, s: 0, v: 100, a: 1 }`     |
| `{ HsvStringColorPicker }`  | `"hsv(0, 0%, 100%)"`               |
| `{ HsvaStringColorPicker }` | `"hsva(0, 0%, 100%, 1)"`           |

#### Code example

```js
import { RgbColorPicker } from "react-colorful";
import { createSignal } from "solid-js";

const YourComponent = () => {
  const [color, setColor] = createSignal({ r: 50, g: 100, b: 150 });
  return <RgbColorPicker color={color()} onChange={setColor} />;
};
```

</details>

## Customization

The easiest way to tweak **solid-colorful** is to create another stylesheet to override the default styles.

```css
.your-component .solid-colorful {
  height: 240px;
}
.your-component .solid-colorful__saturation {
  border-radius: 4px 4px 0 0;
}
.your-component .solid-colorful__hue {
  height: 40px;
  border-radius: 0 0 4px 4px;
}
.your-component .solid-colorful__hue-pointer {
  width: 12px;
  height: inherit;
  border-radius: 0;
}
```

[See examples →](https://codesandbox.io/s/react-colorful-customization-demo-mq85z?file=/src/styles.css)

## How to paste or type a color?

As you probably noticed the color picker itself does not include an input field, but do not worry if you need one. **react-colorful** is a modular library that allows you to build any picker you need. Since `v2.1` we provide an additional component that works perfectly in pair with our color picker.

<details>
  <summary>How to use <code>HexColorInput</code></summary><br />

```js
import { HexColorPicker, HexColorInput } from "solid-colorful";
import { createSignal } from "solid-js";

const YourComponent = () => {
  const [color, setColor] = createSignal("#aabbcc");
  return (
    <div>
      <HexColorPicker color={color()} onChange={setColor} />
      <HexColorInput color={color()} onChange={setColor} />
    </div>
  );
};
```

[Live demo →](https://codesandbox.io/s/react-colorful-hex-input-demo-0k2fx)

| Property   | Default | Description                                  |
| ---------- | ------- | -------------------------------------------- |
| `alpha`    | `false` | Allows `#rgba` and `#rrggbbaa` color formats |
| `prefixed` | `false` | Enables `#` prefix displaying                |

`HexColorInput` does not have any default styles, but it also accepts all properties that a regular `input` tag does (such as `className`, `placeholder` and `autoFocus`). That means you can place and modify this component as you like. Also, that allows you to combine the color picker and input in different ways:

```jsx
<HexColorInput color={color} onChange={setColor} placeholder="Type a color" prefixed alpha />
```

</details>

## Code Recipes

- [Value debouncing](https://codesandbox.io/s/dgqn0?file=/src/DebouncedPicker.js)
- [Popover picker](https://codesandbox.io/s/opmco?file=/src/PopoverPicker.js)
- [Preset colors (color squares)](https://codesandbox.io/s/bekry?file=/src/SwatchesPicker.js)
- [Picker that accepts any color input](https://codesandbox.io/s/6fp23?file=/src/CustomPicker.js)
- [Text field to be able to type/copy/paste a color](https://codesandbox.io/s/0k2fx?file=/src/App.js)
- [Custom styles and layout](https://codesandbox.io/s/mq85z?file=/src/styles.css)

## TypeScript Support

**react-colorful** supports TypeScript and ships with types in the library itself; no need for any other install.

<details>
  <summary>How you can get the most from our TypeScript support</summary><br />

While not only typing its own functions and variables, it can also help you type yours. Depending on the component you are using, you can also import the type that is associated with the component. For example, if you are using our HSL color picker component, you can also import the `HSL` type.

```ts
import { HslColorPicker, HslColor } from "solid-colorful";

const myHslValue: HslColor = { h: 0, s: 0, l: 0 };
```

Take a look at [Supported Color Models](#supported-color-models) for more information about the types and color formats you may want to use.

</details>


## Why solid-colorful?

**[react-colorful](https://github.com/omgovich/react-colorful)** is an incredible library. Gorgeous, functionnal, small, fast, and easily portable. SolidJS is a small and fast reactive framework. Mixing both seemed like the obvious choice!
