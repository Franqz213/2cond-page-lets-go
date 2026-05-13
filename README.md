# Simulador de hilos y múltiples CPUs

Abrir `index_hilos.html` en el navegador.

Archivos:

- `index_hilos.html`: estructura de la interfaz.
- `styles.css`: estilos.
- `app.js`: carga de ejemplos, simulador por ticks, Gantt, estadísticas y traza.

Alcance implementado:

- Procesos normales, KLT y ULT.
- Una o dos CPUs.
- Ready Queue compartida o por CPU. En RR con dos CPUs, el modo por CPU se usa como cola multinivel: los procesos llegan a CPU1 y al vencer quantum bajan a CPU2; desde I/O vuelven a CPU1.
- FIFO, SJF, SPN, Round Robin, STR y prioridades.
- Quantum por CPU para Round Robin.
- Ordenamiento de ULT por biblioteca: FIFO, SJF o Round Robin.
- I/O1 e I/O2 con cola FIFO.
- Ejemplos de la guía, `HILOS.xls` y el documento de hilos.
- Variante de hilos con biblioteca SJF y variante con biblioteca RR=2.

Ejemplos cargados:

- Apunte de teoría: FIFO, SJF, 2 CPUs RR=2/RR=4, hilos SO RR=5 con biblioteca RR=2.
- Guía de ejercicios: FIFO 1, FIFO 2, ejercicio 3 en FIFO/SJF/SPN, Round Robin RR=5, STR sobre el mismo cuadro, 2 CPUs RR=2/RR=4, hilos con biblioteca SJF y hilos con biblioteca RR=2.
- Excel: `HILOS.xls` con SO RR=4 y biblioteca RR=2.

Nota: en modo hilos, los ULT no compiten directamente por la CPU del sistema operativo. Primero se planifica el proceso padre con el quantum del SO y, dentro de ese tiempo, la biblioteca elige qué ULT corre con su propio algoritmo/quantum.
