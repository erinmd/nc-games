import { useState } from "react"

export const OrderBy = ({setCurrentOrder}) => {
    const [ascChecked, setAscChecked] = useState(false)
    const [descChecked, setDescChecked] = useState(true)

    const radioHander = (e) => {
        setCurrentOrder(e.target.value)
        setAscChecked(!ascChecked)
        setDescChecked(!descChecked)
    }

    return <div className='radioButtons'>
    <label htmlFor='asc-radio'>ASC</label>
    <input onChange={radioHander} checked={ascChecked} id='asc-radio' value='asc' type='radio'/>
    <label htmlFor='desc-radio'>DESC</label>
    <input onChange={radioHander} checked={descChecked} id='desc-radio' value='desc' type='radio'/>
    </div>
}