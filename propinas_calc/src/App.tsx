
import MenuItem from "./components/MenuItem";
import OrderContents from "./components/OrderContents";
import OrderTotals from "./components/OrderTotals";
import TipPercentageForm from "./components/TipPercentageForm";
import { menuItems } from "./data/db";
import useOrder from "./hooks/useOrder";

function App() {

  const { order, addItem, removeItem, tip, setTip, placeOrder } = useOrder()

  return (
    <>
      <header className="bg-indigo-300 py-5">
        <h1 className="text-center text-4xl font-black font-mono">Calculadora de Propinas y Consumo</h1>
      </header>

      <main className="max-w-7xl mx-auto py-12 grid md:grid-cols-2">
        <div className="px-5">
          <h2 className="text-2xl font-black py-3">Menú</h2>
          <div className="space-y-3 ">
            {menuItems.map(item => (
              <MenuItem
                key={item.id}
                item={item}
                addItem={addItem}
              />
            )
            )}
          </div>
        </div>

        <div className="border border-dashed border-indigo-100 p-5 rounded-lg space-y-10">
          {
            order.length > 0 ? (
              <>
                <OrderContents
                order={order}
                removeItem={removeItem}
              />

              <TipPercentageForm
                setTip={setTip}
                tip={tip}
              />

              <OrderTotals
                order={order}
                tip={tip}
                placeOrder={placeOrder}
              />
                </>
              )

              : (
                <p className="text-center">La orden esta vacía</p>
              )
          }
            
        </div>
      </main>


    </>
  )
}

export default App
