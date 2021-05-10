# Metodología de trabajo

1. Gitflow
Siempre partir de rama develop y crear ramas que representan las features para volver a mergearlas a develop. Hacer un único merge a master al finalizar la entrega.

Usaría naming tipo <type>/<reason> para estar ordenados. type sería lo mismo que en conventional commits y reason algo descriptivo en kebab case.

Ej: chore/heroku-setup

2. Pull Requests + Code Review
No hacer merge via consola, ocupar PRs y pedir review de alguien del equipo (hay una opción de elegir un miembro al azar de Github si andan indecis@s).

Tratemos de hacer PRs cortas, que es parte del enunciado de hecho.

3. Conventional commits a lo angular
Commits del tipo <type>(<scope>): <message>, para llevar un buen estándar.

Los types pueden ser:

feat: Alguna feature
fix: Algún fix
chore: Alguna tarea de configuración o similar
improvement: Mejora a algo existente
perf: Mejora de performance (dudo que lo usemos)
ci: Configuración de CI (no deberíamos usarlo)
docs: Cualquier cambio de documentación
refactor: Algún refactor de código
test: Testing de la app (no deberíamos usarlo)

Siempre escribir los messages de commit en present tense (add, change, fix, etc.)

Ej: chore(gemfile): add pundit gem to project

Si hay espacios en el scope, usar kebab-case

Ej: feat(wallet-view): add filtering to table

Si no cachan bien el scope, simplemente no lo pongan

Ej: feat: add exchange model

Más info
https://www.maxpou.fr/git-conventional-commits
=======

## Configuraciones y consideraciones para hacer funcionar el código

### Uso

 **Ejecutar el proyecto**

Instalar dependencias

```sh
npm install
```

Levantar el proyecto
```sh
npm run start
```

 **Metodología de trabajo**

1.  **Adición de componente**: 
    

    En primer lugar en la carpeta "Components" se debe agregar una carpeta con del componente que se desea crear. Dentro de esta carpeta se debe agregar un archivo js que contenga la lógica del componente. Adicionalmente, se debe agregar un archivo js que contenga el estilo del componente creado, el cual debe llevar el nombre de "styles-(nombre del componente)". Es importante destacar que todo el código debe ser escrito en inglés. 

    Se debe además, en caso de ser necesario agregar la ruta al router de React. Esto se puede realizar utilizando "RouterWithNavbar" el cual permite agregar el navbar a vista creada y además, utilizar la ruta en el browser.

## Convenciones de trabajo

### Tipos de branches:

1. **main**: el código en producción. Solo se hará merge desde **develop** en los siguientes casos:
    1. Al final de la etapa QA
    2. Para la entrega final

2. **develop**: el código, en estado de producción (siempre funcional), pero con finalidad de desarrollo. Toda feature debería desarrollarse en una branch que tenga su origen en **develop**. Todos los tests de la etapa de QA se realizarían sobre el código presente en esta branch

3. **feature/name**: las branches que sirven para desarrollar la feature *name*. Este tipo de branches deberían tener su origen y fin (merge) en **develop**. **IMPORTANTE: una branch, una feature**. *name* debería ser un nombre lo suficientemente descriptivo. Si *name* necesita más de una palabra para ser descriptivo, estas deberían separarse por un guion. Ej: feature/more-descriptive-name

4. **bugfix/name**: las branches para arreglar problemas detectados en **develop**. Estas branches deberían tener su origen y fin (merge) en **develop**. *name* debería ser un nombre lo suficientemente descriptivo. Si *name* necesita más de una palabra para ser descriptivo, estas deberían separarse por un guion. Ej: bugfix/descriptive-bug-name

5. **hotfix/name**: las branches para arreglar problemas detectados en **main**. Estas branches deberían tener su origen y fin (merge) en **main**. *name* debería ser un nombre lo suficientemente descriptivo. Si *name* necesita más de una palabra para ser descriptivo, estas deberían separarse por un guion. Ej: hotfix/descriptive-hotfix-name

6. **setup/name**: las branches que contendrían cualquier tipo de configuración o información que no sea una funcionalidad para la aplicación en sí. Estas branches deberían tener su origen y fin (merge) en **develop**. *name* debería ser un nombre lo suficientemente descriptivo. Si *name* necesita más de una palabra para ser descriptivo, estas deberían separarse por un guion. Ej: setup/descriptive-setup-name


### Convenciones para los commits

Cada commit debería incluir un tipo y mensaje lo suficientemente claro con la estructura *tipo: mensaje*. Lo ideal es que cada *hito* dentro de una feature suponga un commit. Tipos de commit

1. **feature**: para añadir una sub-feature dentro de la feature
2. **fix**: para corregir errores dentro de la branch. Debería ser particularmente útil en branches de tipo hotfix y bugfix, pero no exclusivo
3. **improvement**: para mejoras en alguna feature ya existente. Incluiría refactors, mejoras en performance, mejoras en aspecto, etc
4. **setup**: cualquier tipo de commit que no pueda ser incluido en los tipos anteriores


### Protocolos para hacer merge de las branches

1. Uso de pull requests mediante la plataforma web de GitHub y no mediante consola
2. Un pull request debería tener a lo menos la siguiente información:
    1. Título: puede ser el nombre de la branch, pues se asume que será descriptivo
    2. Descriptión: Una pequeña síntesis de lo que se esperaría poder realizar gracias al contenido del pull request (scope de la branch). Puede incluir un listado de características que deberían cumplirse
    3. Imágenes de las vistas: la persona que hace el pull request debería poder mostrar que las vistas desarrolladas funcionan bien en los distintos browsers soportados: Safari, Chrome, Firefox y Opera. De la misma forma, debería mostrarse al menos un screenshot de la aplicación funcionando en un dispositivo móvil para demostrar responsividad
3. Un pull request debe ser aprobado y mezclado (merge) por una persona diferente a quien crea el pull request. Como caso excepcional, el merge de develop a main deberá ser aprobado por al menos dos personas
