import React, { useState, useCallback, useEffect } from 'react';
import CardInfo from '../Cards/CardInfo';
import ExplosiveButtonComponent from '../Cards/BoosterAnimation';
import GameInterface from '../Cards/GameInterface';
import AddCustomerForm from '../customers/AddCustomerForm';

import '../../assets/css/DosComponent.css';
import '../../assets/css/Registration.css';

const DosPage = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [deck, setDeck] = useState([]);
    const [customers, setCustomers] = useState([]);

    const startGame = () => {
        setIsGameStarted(true);
    };

    const handleDeckCreated = useCallback((newDeck) => {
        setDeck(newDeck);
    }, []);

    const handleCustomerAdded = (newCustomer) => {
        setCustomers([...customers, newCustomer]);
    };

    useEffect(() => {
        fetch('http://localhost:3001/customers')
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch(error => console.error("There was an error!", error));
    }, []);

    if (isGameStarted) {
        return (
            <div className="game-interface">
                <GameInterface deck={deck} setDeck={setDeck} />
            </div>
        );
    }

    return (
        <div className="DosPage">
            <section>
                <div className="button-group">
                    <button onClick={startGame} className="play-game-button text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        PLAY
                    </button>
                    <CardInfo onDeckCreated={handleDeckCreated} />
                    <ExplosiveButtonComponent />
                </div>
                <div className="customer-form-container mt-8">
                    <h2 className="text-2xl font-bold mb-4">Add New Customer</h2>
                    <AddCustomerForm onCustomerAdded={handleCustomerAdded} />
                </div>
                <div className="customer-list-container mt-8">
                    <h2 className="text-2xl font-bold mb-4">Customer List</h2>
                    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                        <ul>
                            {customers.map(customer => (
                                <li key={customer._id} className="border-b border-gray-200 py-2">
                                    {customer.name} - {customer.industry}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DosPage;
