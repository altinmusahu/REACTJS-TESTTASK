import { NavLink } from 'react-router-dom'

export default function AddContactBtn(){
    return(
        <>
        <div>
            <NavLink to='/addcontact'>
                <button className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded">Add Contact</button>
            </NavLink>
        </div>
        </>
    );
}