import { formatCurrency } from "../helpers"
import { MenuItem, OrderItem } from "../types"

type OrderContentsProps = {
  order: OrderItem[],
  removeItem: (id: MenuItem['id']) => void
}

export default function ({order, removeItem}: OrderContentsProps) {
  return (
    <div>
        <h2 className='text-2xl font-black '>Cosumo</h2>

        <div className="space-y-3 mt-5">
          {
              order.map( item => (
                <div 
                className="flex justify-between items-center border-t border-indigo-100 py-3" 
                key={item.id}>
                  <div>
                  <p className="text-base">{item.name} - {formatCurrency(item.price)}</p>
                  <p className="font-black">Cantidad: {item.quantity} - {formatCurrency(item.price * item.quantity)}</p>
                  </div>
                  <button 
                  className="bg-red-500 h-6 w-6 text-white font-black rounded-full flex justify-center items-center"
                  onClick={() => removeItem(item.id)}
                  >
                  <span className="text-sm">X</span>
                  </button>
                </div>
              ))
            }
        </div>
    </div>
  )
}
