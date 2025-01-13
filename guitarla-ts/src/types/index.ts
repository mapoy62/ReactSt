export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}


export type CartItem = Guitar & {
    quantity: number
}

//Para modificaciones futuras
//export type GuitarID = Pick<Guitar, 'id'>
export type GuitarID = Guitar['id']

/*
export interface CartItem extends Guitar {
    quantity: number
}
*/

//Para seleccionar solo algunos elementos que se quieren heredar y no todos, se pueden utilizar los utility types
//MANTENIENDO LOS MISMO TIPOS DE DATOS
//Los atributos que queremos que tenga, va entre comillas con => PICK
/*
export type CartItem = Pick<Guitar, 'id' | 'name' | 'image'>

export type CartItem = Pick<Guitar, 'id' | 'name'| 'price'> & { 
    quantity: number
}

//Si queremos omitir ciertos atributos, va entre comillas con => Omit
export type CartItem = Omit<Guitar, 'description' | 'price'> & { 
    quantity: number
}
*/


