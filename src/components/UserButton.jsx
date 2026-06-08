import '../styles/UserButton.css'
import { GiFullMotorcycleHelmet } from "react-icons/gi";

function UserButton() {

    const user = JSON.parse(
        localStorage.getItem("currentUser")
    );
    
    return(
        <div className='userbutton-container'>
            <button className='user-button'>
                <GiFullMotorcycleHelmet className='userbutton-icon' />
            </button>

            {user && (
                <span className="user-name">
                    {user.username}
                </span>
            )}

        </div>
    )
};

export default UserButton;