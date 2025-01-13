import type { MenuItem } from "../types/index";

type MenuItemProps  = {
    item: MenuItem,
    addItem: (item: MenuItem) => void
}

export default function MenuItem({item, addItem}: MenuItemProps) {
  return (
    <button
        className="border-2 border-indigo-300 hover:bg-indigo-100 rounded-md p-3 w-full flex justify-between"
        onClick={() => addItem(item)}
    >
        <p >{item.name}</p>
        <p className="font-black">${item.price}</p>
    </button>
  )
}
