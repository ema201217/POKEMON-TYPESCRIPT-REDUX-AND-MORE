# ESLint
## **Implementación ESLINT + Prettier Eslint**

1 - Instalar las siguientes dependencias de desarrollo:
<pre>
  npm i --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react
</pre>
</br>

2 - Luego instalar en VSCode la extensión de [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)

</br>

3 - Crear los siguientes archivos en la raíz del proyecto:
  - .eslintrc.json
  - .eslintignore
  - .prettierrc.json

4 - En el archivo _.eslintrc.json_ insertar:
<pre>
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint"],
  "rules": {
    "react/jsx-uses-react": "off", // ✖️ import React from 'react';
    "react/react-in-jsx-scope": "off", 
    "max-len": ["error",{ "code": 90 }], // longitud por linea
    "jsx-quotes": ["error", "prefer-single"], // exigir en archivos jsx las comillas simples
    "semi": ["error","always"], // exigir punto y coma al final de las sentencias
    "indent": ["error", 2], // Error si los espacio al comienzo de las lineas es distinto a dos
    "quotes": ["error", "single"], // exigir en archivos js las comillas simples
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }], // lineas vacías no mas de dos saltos de lineas y al final de los archivos no puede haber salto de lineas 
    "@typescript-eslint/no-non-null-assertion": "off", // Esto soluciona un problema en el archivo main.tsx
    "@typescript-eslint/no-explicit-any": "off"
  },
  "globals": {
    "store":true
  }
}
</pre>
 </br>

5 - En el archivo _.eslintignore_ insertar:
<pre>
node_modules
build
__tests__
</pre>
Estos son los archivos o directorios que no queremos que tenga en cuenta esLint para el fix
</br>

6 - En el archivo _.prettierrc.json insertar:
<pre>
{
  "printWidth": 90,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "es5",
  "semi": true
}
</pre>
