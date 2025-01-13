import { useMemo } from "react";
import { OrderItem } from "../types/index";
import { formatCurrency } from "../helpers";

type OrderTotalsProps = {
    order: OrderItem[],
    tip: number,
    placeOrder: () => void
}
export default function OrderTotals({order, tip, placeOrder}: OrderTotalsProps) {

    //Solo se reenderizará cuando cambie la dependencia
    const subtotalAmount = useMemo(() => order.reduce((total, item) => total + item.price * item.quantity, 0), [order])
    const tipAmount = useMemo(()=> subtotalAmount * tip, [tip, order])
    //Es importante utilizar useMemo para que cada vez que se modifique tip u order, estas se actualicen
    const totalAmount = useMemo(() => subtotalAmount + tipAmount, [tip, order])

  return (
    <>
        <div>
            <h2 className="font-black text-2xl">Totales y propinas:</h2>
            <p>Subtotal a pagar:{''} <span className="font-bold">{ formatCurrency(subtotalAmount) }</span></p>
            <p>Propina:{''} <span className="font-bold">{ formatCurrency(tipAmount) }</span></p>
            <p>Total a pagar:{''} <span className="font-bold">{ formatCurrency(totalAmount) }</span></p>
        </div>

        <button
            className="w-full bg-indigo-950 p-3 uppercase text-white font-bold rounded-lg disabled:opacity-10"
            disabled={order.length === 0}
            onClick={placeOrder}
            >
                Guardar orden
        </button>
    </>
  )
}
