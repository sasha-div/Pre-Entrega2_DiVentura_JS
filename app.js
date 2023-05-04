// Este es mi array constante de objetos que representa mi catálogo de juegos:
const juegos = [
  { nombre: "The Last of Us Part II", plataforma: "PS4", precio: 40000, anio: "2020", id: "#1" },
  { nombre: "Zelda: Breath of The Wild", plataforma: "Switch", precio: 30000, anio: "2017", id: "#2" },
  { nombre: "Horizon Forbidden West", plataforma: "PS4", precio: 45000, anio: "2022", id: "#3" },
  { nombre: "Elden Ring", plataforma: "PS4", precio: 45000, anio: "2022", id: "#4" },
  { nombre: "Mario Kart 8", plataforma: "Switch", precio: 35000, anio: "2014", id: "#5" }
]

// Este es el carrito vacío de mi usuario y una variable (seguir) que dependiendo de su estado (true/false) controlará la continuidad del primer loop While:
let carrito = []
let seguir = true

// Inicio mi simulador con un saludo:
alert("¡Bienvenid@ a la tienda!")

// Comienzo el loop con un menú principal:
while (seguir) {
  let eleccion = prompt("¿Qué quieres hacer?" + "\n" + "\n" + "Comprar un juego: Comprar" + "\n" + "Ver tu carrito: Carrito" + "\n" + "Salir de la página: Salir").toLowerCase()

  // Apliqué un Switch para cada opción (comprar, carrito o salir):
  switch (eleccion) {

    // En el caso de comprar, apliqué un map en el array para mostrar el catálogo y un join para unir, incluyendo un separador. Además, incluí una constante donde el juego encontrado sea igual a la elección del usuario solo si esta elección se encuentra en el array de juegos, que es mi catálogo. También agregué validaciones cada vez que el usuario ingrese alguna opción:
    case "comprar":
      let catalogo = juegos.map((juego) => juego.nombre + " - $" + juego.precio)
      let eleccionJuego = prompt("Este es nuestro catálogo actual. Escribe tal como ves el nombre del juego para ingresarlo en tu carrito. " + "\n" + "\n" + catalogo.join("\n")).toLowerCase()
      const juegoEncontrado = juegos.find((juego) => juego.nombre.toLowerCase() === eleccionJuego)

      if (juegoEncontrado) {
        carrito.push(juegoEncontrado)
        alert(`"${juegoEncontrado.nombre}" se ha agregado a tu carrito.`)
      } else {
        alert("No tenemos este producto. Vuelve a intentarlo.")
      }

      let respuestaSeguir = prompt("¿Quieres seguir agregando juegos al carrito? (sí / no)").toLowerCase()
      while (respuestaSeguir !== "sí" && respuestaSeguir !== "si" && respuestaSeguir !== "no") {
        alert("Ingresaste un comando no válido. Por favor, ingresa 'sí' o 'no'.")
        respuestaSeguir = prompt("¿Quieres seguir agregando juegos al carrito? (sí / no)").toLowerCase()
      }

      while (respuestaSeguir === "sí" || respuestaSeguir === "si") {
        let catalogo = juegos.map((juego) => juego.nombre + " - $" + juego.precio)
        let eleccionJuego = prompt("Este es nuestro catálogo actual. Escribe tal como ves el nombre del juego para ingresarlo en tu carrito. " + "\n" + "\n" + catalogo.join("\n")).toLowerCase()
        const juegoEncontrado = juegos.find((juego) => juego.nombre.toLowerCase() === eleccionJuego)

        if (juegoEncontrado) {
          carrito.push(juegoEncontrado)
          alert(`"${juegoEncontrado.nombre}" se ha agregado a tu carrito.`)
          respuestaSeguir = prompt("¿Quieres seguir agregando juegos al carrito? (sí / no)").toLowerCase()
        } else {
          alert("No tenemos este producto. Vuelve a intentarlo. Recuerda que el nombre debe ser igual al publicado")
          respuestaSeguir = prompt("¿Quieres seguir agregando juegos al carrito? (sí / no)").toLowerCase()
        }
      }

      if (respuestaSeguir === "no") {
        alert("Elije la opción 'Carrito' para ver tus productos y proceder con la compra.")
      }
      break

    // Para el caso de "carrito", le muestro al usuario el resumen de su carrito haciendo un map y le doy el total del precio con un reduce. Aplico validaciones, como: si la cantidad de elementos dentro del array carrito es menor a 0, indique que su carrito está vacío; si no, que continue el proceso. También creé una constante para hacer un índice (indexEliminar) con indexOf y find, que luego usé como parámetro dentro del splice para eliminar items del carrito:
    case "carrito":
      const resumenCarrito = carrito.map((juego) => juego.nombre + " - $" + juego.precio)
      const calculoTotal = carrito.reduce((acumulador, juego) => acumulador + juego.precio, 0)

      if (carrito.length > 0) {
        const inputResumen = prompt("Este es el resumen y el total de tu carrito de compras: " + "\n" + "\n" + resumenCarrito.join("\n") + "\n" + "\n" + "Total: " + "$" + calculoTotal + "\n" + "\n" + "¿Quieres eliminar algún producto de tu carrito? (sí /no)").toLowerCase()

        while (inputResumen !== "sí" || inputResumen !== "si" || inputResumen !== "no") {
          break
        }

        if (inputResumen === "sí" || inputResumen === "si") {
          const resumenEliminar = carrito.map((juego) => juego.nombre)
          const inputEliminar = prompt(resumenEliminar.join("\n") + "\n" + "\n" + "Escribe el juego que quieras eliminar").toLowerCase()
          const indexEliminar = carrito.indexOf(carrito.find((juego) => juego.nombre.toLowerCase() === inputEliminar))
          if (indexEliminar !== -1) {
            const juegoEliminado = resumenCarrito.splice(indexEliminar, 1)[0]
            carrito.splice(indexEliminar, 1)
            alert(`"${juegoEliminado}" se ha eliminado de tu carrito.`)
          } else {
            alert("Este juego no está dentro de tu carrito.")
          }
        }

        if (inputResumen === "no") {
          seguir = false;
          alert("Ahora serás redirigido a la plataforma de pago. ¡Gracias por comprar!")
        }

      } else {
        alert("Tu carrito está vacío.")
      }
      break

    /// Esto se ejecuta en caso de que el usuario quiera salir. Se setea la variable seguir como false para cerrar el simulador:
    case "salir":
      seguir = false;
      alert("Gracias por visitar la tienda. ¡Nos vemos!")
      break;

    /// Esto en caso de que el usuario ingrese algo diferente a las opciones:
    default:
      alert("Comando no válido. Por favor, ingresa 'comprar', 'carrito' o 'salir'. ");
      break
  }
}

