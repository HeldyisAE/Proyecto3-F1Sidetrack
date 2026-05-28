import '../styles/UserButton.css'
import { GiFullMotorcycleHelmet } from "react-icons/gi";

function UserButton() {
    return(
        <div className='userbutton-container'>
            <button className='user-button'>
                <GiFullMotorcycleHelmet className='userbutton-icon' />
            </button>
        </div>
    )
};

export default UserButton;