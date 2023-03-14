import { Link } from "react-router-dom"
import { SelectCategory } from "./Reviews/SelectCategory"

export const Nav = () => {
    return (<nav>
        <Link className='linkText' to="/">Home</Link>
        <SelectCategory />
    </nav>)
}