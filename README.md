# bananus-assist-frontend

## Configuraciones y consideraciones para hacer funcionar el código

**(Debe ser completado)**

## Convenciones de trabajo

### Tipos de branches:

1. **main**: el código en producción. Solo se hará merge desde **develop** en los siguientes casos:
    1. Al final de la etapa QA
    2. Para la entrega final

2. **develop**: el código, en estado de producción (siempre funcional), pero con finalidad de desarrollo. Toda feature debería desarrollarse en una branch que tenga su origen en **develop**. Todos los tests de la etapa de QA se realizarían sobre el código presente en esta branch

3. **feature/name**: las branches que sirven para desarrollar la feature *name*. Este tipo de branches deberían tener su origen y fin (merge) en **develop**. **IMPORTANTE: una branch, una feature** *name* debería ser un nombre lo suficientemente descriptivo. Si *name* necesita más de una palabra para ser descriptivo, estas deberían separarse por un guion. Ej: feature/more-descriptive-name

4. **bugfix/name**: las branches para arreglar problemas detectados en **develop**. Estas branches deberían tener su origen y fin (merge) en **develop**. *name* debería ser un nombre lo suficientemente descriptivo. Si *name* necesita más de una palabra para ser descriptivo, estas deberían separarse por un guion. Ej: bugfix/descriptive-bug-name

5. **hotfix/name**: las branches para arreglar problemas detectados en **main**. Estas branches deberían tener su origen y fin (merge) en **main**. *name* debería ser un nombre lo suficientemente descriptivo. Si *name* necesita más de una palabra para ser descriptivo, estas deberían separarse por un guion. Ej: hotfix/descriptive-hotfix-name

6. **setup/name**: las branches que contendrían cualquier tipo de configuración o información que no sea una funcionalidad para la aplicación en sí. Estas branches deberían tener su origen y fin (merge) en **develop**. *name* debería ser un nombre lo suficientemente descriptivo. Si *name* necesita más de una palabra para ser descriptivo, estas deberían separarse por un guion. Ej: setup/descriptive-setup-name
