# ReGOSH Landing (0.9.0)

Este repositorio contiene el codigo fuente del landing page de la residencia GOSH.

## TODO: Completar datos
Luego de haber finalizado con el diseno e interacciones, se requiere un paso mas que es completar con los datos correspondientes a la primera residencia (Proyectos, Informacion de contacto de las personas que participaron en la primera residencia) y con la definicion de la misma (Explicar que es GOSH). Para lograr esto prepare una documentacion a manera de explicar como actualizar esta informacion.

## Documentacion

El codigo del landing se diseno de tal manera que sea *parametrico*, toda la informacion del landing es centralizado por un archivo JSON (data.json), es decir que al editar este archivo con nueva informacion, la pagina leera esta nueva version y mostrara la info actualizada.

Para editar el archivo JSON podemos usar cualquier editor de codigo ([Sublime Text](https://www.sublimetext.com/), [Atom](https://atom.io/), [Visual Studio Code](https://code.visualstudio.com/). Tambien podemos usar este editor online de [JSON](https://jsonformatter.org/json-editor).

La estructura de los datos en data.json es la siguiente:

![Pantalla 1](src/assets/screens/scr_1.png)

Se organizo por secciones:
- La seccion *landing* contiene textos y titulos estaticos de la pagina.
- La seccion *projects* contiene la lista de proyectos realizados.
- La seccion *residences* contiene la relacion de participantes por residencia
- *shares* contiene los enlaces en las resdes sociales que tiene reGosh y tecnologias libres.






## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
