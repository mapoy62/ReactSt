import { useState } from "react"
import type { MenuItem, OrderItem } from "../types"

export default function useOrder(){

    //STATES
    const [order, setOrder] = useState<OrderItem[]>([])
    const [tip, setTip] = useState(0)

    //const [total, setTotal] = useState(0)
    //const [auth, setAuth] = useState(false)

    const addItem = (item: MenuItem) => {
        const itemExist = order.find(orderItem => orderItem.id === item.id)
        if(itemExist){
            const newOrder = order.map(orderItem => 
                orderItem.id === item.id ? {...orderItem, quantity: orderItem.quantity + 1} : orderItem)
            setOrder(newOrder)

        }else{
            const newItem = {...item, quantity: 1}
            setOrder([...order, newItem ])
        }
    }


    const removeItem = (id: MenuItem['id']) => {
        const newOrder = order.filter(orderItem => orderItem.id !== id)
        setOrder(newOrder)
    }

    const placeOrder = () => {
        setOrder([])
        setTip(0)
    }

    return {
        order,
        addItem,
        removeItem,
        tip,
        setTip,
        placeOrder
    }
}