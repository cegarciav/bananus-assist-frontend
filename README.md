# bananus-assist-frontend
bananus-assist-frontend

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