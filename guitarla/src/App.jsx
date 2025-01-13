import {useState, useEffect} from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"

function App() {

  //Nombre de state y función son definidos por nosotros
  //Ejm. state si un usuario esta autenticado redirigir a home, sino a login
  //const [auth, setAuth] = useState(false)
  //console.log(auth)

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    //Comprobamos si hay algo en la localStorage
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  //Cuando se utiliza una api, lo más recomendable es inicializarlo vacío para que después se llene
  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart)
  const MAX_ITEMS = 10
  const MIN_ITEMS = 1

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  , [cart]})

  /** 
   * Utilizan do API - Para proyectos grandes
   * Inicilizamos con el componente vacío
   * 
   * const [data, setData] = useState([])
   * useEffect(() => {
     setData(db)
   }, [])
   */

  function addToCart(item) {
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)
    //Existe en el carrito
    if(itemExist >= 0){
      if(itemExist.quantity >= MAX_ITEMS) return
      console.log('Ya existe en el carrito')
      //Creamos copia de cart para hacer inmutable el state
      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item])
      console.log('No existe en el carrito')
    }
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id){
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity < MAX_ITEMS){
        return {
          ...item, quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id){
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity > MIN_ITEMS){
        return {
          ...item, quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart(e) {
    setCart([])
  }

  /*
  function saveLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
  }
  */

  return ( 
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar) => (
              <Guitar
              //Siempre que se itere es importante agregar un key para iterar en cada uno de los componentes
                key={guitar.id}
                guitar={guitar}
                setCart={setCart}
                addToCart={addToCart}
              />
            ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
