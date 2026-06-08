import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useF1Data } from "../hooks/useF1Data";
import { createUser } from "../services/authService";

import "../styles/DriverSelectionCard.css";

function DriverSelectionCard({ pendingUser, onBack }) {

    const navigate = useNavigate();
    const { driverStandings } = useF1Data();

    const [selectedDrivers, setSelectedDrivers] = useState([]);

    const toggleDriver = (driver) => {

        const id = driver.driver_number;

        if (selectedDrivers.includes(id)) {
            setSelectedDrivers(
                selectedDrivers.filter(d => d !== id)
            );
            return;
        }

        if (selectedDrivers.length >= 3) return;

        setSelectedDrivers([...selectedDrivers, id]);
    };

    const handleConfirm = () => {

        if (selectedDrivers.length !== 3) return;

        const newUser = {
            ...pendingUser,
            favoriteDrivers: selectedDrivers
        };

        createUser(newUser);

        navigate("/home", { replace: true });
    };

    return (
        <div className="driver-selection-overlay">

            <div className="driver-selection-card">

                <h2>Select Your Favorite Drivers</h2>

                <p>Choose exactly 3 drivers</p>

                <div className="selected-chips">
                    {selectedDrivers.map(id => {

                        const driver = driverStandings.find(
                            d => d.driver_number === id
                        );

                        if (!driver) return null;

                        return (
                            <span key={id} className="chip">
                                {driver.full_name}
                            </span>
                        );
                    })}
                </div>

                <div className="counter">
                    {selectedDrivers.length} / 3
                </div>

                <div className="drivers-grid">

                    {driverStandings.map(driver => {

                        const isSelected = selectedDrivers.includes(driver.driver_number);

                        return (
                            <div
                                key={driver.driver_number}
                                className={`driver-tile ${
                                    isSelected ? "selected" : ""
                                }`}
                                onClick={() =>
                                    toggleDriver(driver)
                                }
                            >

                                <img
                                    src={driver.headshot_url}
                                    alt={driver.full_name}
                                />

                                <div className="driver-info">
                                    <span>
                                        #{driver.driver_number}
                                    </span>

                                    <h4>
                                        {driver.full_name}
                                    </h4>
                                </div>

                            </div>
                        );
                    })}

                </div>

                <div className="driver-selection-buttons">

                    <button
                        type="button"
                        onClick={onBack}
                    >
                        Back
                    </button>

                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={
                            selectedDrivers.length !== 3
                        }
                    >
                        Confirm
                    </button>

                </div>

            </div>
        </div>
    );
}

export default DriverSelectionCard;