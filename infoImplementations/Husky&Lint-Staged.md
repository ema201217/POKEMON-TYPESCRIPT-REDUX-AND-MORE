# Cómo configurar Husky y Lint-Staged en un proyecto
## **Implementación para no hacer commit con git si existe errores con ESlint**

1 - Instalamos las dependencias de desarrollo que vamos a usar.
<pre>npm i -D husky lint-staged</pre>
</br>

2 - Creamos un fichero .lintstagedrc en la raíz de nuestro proyecto, con el siguiente contenido:
<pre>
{
"*.{js,jsx,ts,tsx}": ["eslint --fix", "git add"]
}
</pre>
Aquí le estamos diciendo que para los ficheros con extensión js, jsx, ts y tsx, ejecute el comando eslint --fix y después añada los cambios al commit.

</br>
3 - Ahora en nuestro package.json añadimos un script que podemos llamar prepare. Puedes añadirlo en la sección scripts o ejecutar el siguiente comando:
<pre>npm set-script prepare "husky install"</pre>
</br>

4 - Esto nos permite configurar Husky de una forma más rápida corriendo:

<pre>npm run prepare</pre>
Esto instala los git hooks dentro de la carpeta .husky que se acaba de crear.
</br>
</br>


5 - Ahora vamos a añadir el pre-commit hook, para que antes de hacer un commit, se ejecute el script de Lint-Staged. Esto lo hacemos con el siguiente comando:
<pre>npx husky add .husky/pre-commit "npx lint-staged"</pre>
Esto crea el fichero .husky/pre-commit con el siguiente contenido:
<pre>
#!/usr/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
</pre>

----
# Si existen casos de prueba (QA - Testing)
## Añadir el pre-push hook

6 - Ahora vamos a añadir el pre-push hook, para que antes de hacer un push, se ejecuten los scripts que determinemos, como por ejemplo que se lancen los Tests y sólo si pasan, el código se suba finalmente al repositorio.Esto lo hacemos con el siguiente comando:
<pre>npx husky add .husky/pre-push "npm run test"</pre>
Si no tienes tests o estos no pasan, el push no se realizará hasta que lo soluciones.
</br>

_Ejemplo:_ (JEST con typescript, simulación DOM y config json)
[Ir a implementación JEST](Jest-TS.md)


