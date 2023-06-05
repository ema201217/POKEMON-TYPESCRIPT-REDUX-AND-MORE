# JEST TS
## **Implementación JEST con typescript + simulación DOM**

* Primero de todo, instalar Jest y los módulos para trabajar con typescript y simulación del DOM en node:
<pre>npm i --save-dev jest ts-jest jest-environment-jsdom @types/jest</pre>
 - Crear el archivo jest.config.json y colocar:
<pre>
{
  "preset": "ts-jest",
  "testEnvironment": "jest-environment-jsdom",
  "testPathIgnorePatterns":["/example/"] 
}
</pre>
</br>

# 📚 Info
## 📖 [preset](https://jestjs.io/docs/configuration#preset-string)

## 📖 [testEnvironment](https://jestjs.io/docs/configuration#testenvironment-string) 

## 📖 [testPathIgnorePatterns](https://jestjs.io/docs/configuration#testpathignorepatterns-arraystring) 
---
</br>

* Crear la carpeta \_\_tests\_\_ e internamente colocar los test unitarios

* Tendremos un fichero de ejemplo, **index.ts** dentro de la carpeta **_example_** anteriormente ignorada en el archivo **jest.config.json**; Que simplemente exporta una función que devuelve la suma de dos valores:
<pre>export const sum = (a: number, b: number) => a + b;</pre>
</br>

* Creamos nuestro test unitario **index.test.ts**, que contendrá:
<pre>
  import {sum} from './example/index';

  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
</pre>
</br>

* Colocar un script test en el archivo **package.json**:
<pre>npm set-scripts test "jest"</pre>
</br>

* Ejecutar el script test:
<pre>npm run test</pre>
</br>

* RESULTADO ESPERADO
<pre>
  √ adds 1 + 2 to equal 3 (2 ms)

  Test Suites: 1 passed, 1 total
  Tests:       1 passed, 1 total
  Snapshots:   0 total
  Time:        2.656 s
  Ran all test suites.
</pre>



