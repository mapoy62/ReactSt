import type { Dispatch, SetStateAction } from 'react'
//import { useState } from 'react'

const tipOptions = [
    {
      id: 'tip-10',
      value: .10,
      label: '10%'
    },
    {
      id: 'tip-20',
      value: .20,
      label: '20%'
    },
    {
      id: 'tip-50',
      value: .50,
      label: '50%'
    },
  ]

type TipPercentageFormProps = {
    setTip: Dispatch<SetStateAction<number>>,
    tip: number
}

//Estado para almacenar tip seleccionado
//const [tip, setTip] = useState(null);

export default function TipPercentageForm({setTip, tip}: TipPercentageFormProps) {
  return (
    <div>
        <h3 className="font-black text-2xl">Propina: </h3>

        <form >
            {tipOptions.map(tipOption => (
                <div key={tipOption.id} className="flex gap-3">
                    <label htmlFor={tipOption.id}>{tipOption.label}</label>
                    <input
                        id={tipOption.id}
                        type="radio"
                        name="tip"
                        value={tipOption.value}
                        onChange={e => setTip(+e.target.value)}
                        checked={tipOption.value === tip}
                    />
                </div>
            ))}
            <div className='flex gap-3'>
            <label htmlFor="otherTip">Otro
                <input type="number" 
                name="otherTip" 
                onChange={e => setTip(+e.target.value)} 
                id="otherTip"
                placeholder='Ingresa otra cantidad ' 
                />
            </label>
            </div>
        </form>
    </div>
  )
}
