import React, { useState } from 'react';
import '../styles/CreatePlayer.css'
import { toast } from 'react-toastify';
const CreatePlayer = () => {

    const [playerName, setplayerName] = useState('');
    const [country, setCountry] = useState('');
    const [score, setScore] = useState('');

    const savePlayer = async (event) => {
        try {
            event.preventDefault();
            const res = await fetch(`${import.meta.env.VITE_HOST}/players`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: playerName,
                    country,
                    score
                })
            });
            if (res.ok) {
                toast.success("Player added successfully");
                setCountry('');
                setplayerName('');
                setScore('');
            }
            else {
                toast.error("Some error occured.");
            }
        }
        catch (error) {
            toast.error(error.message);
        }

    }

    return (
        <div className='createPlayer'>
            <h1>Add a player</h1>
            <form onSubmit={savePlayer}>
                <input
                    type="text"
                    value={playerName}
                    placeholder='Player name'
                    required
                    onChange={(e) => setplayerName(e.target.value)}
                    maxLength="15"
                />

                <input
                    type="text"
                    value={country}
                    placeholder='Country code'
                    required
                    onChange={(e) => setCountry(e.target.value)}
                    maxLength="2"
                />

                <input
                    type="number"
                    value={score}
                    placeholder='Score'
                    required
                    onChange={(e) => setScore(e.target.value)}
                    min="0"
                />

                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default CreatePlayer;