import React, { useState } from 'react';
import { toast } from 'react-toastify';

const PlayerDetail = ({ playerdata, deleteUser }) => {
    const [edit, setEdit] = useState(false);
    const { _id, name,country, score } = playerdata;
    const [playerName, setplayerName] = useState(name);
    const [playerScore, setplayerScore] = useState(score);


    // function to save the changes in player data
    const saveChanges = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_HOST}/players/${_id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: playerName,
                    score: playerScore,
                })
            });
            if (res.ok) {
                setEdit(false);

                toast.success("Changes saved successfully.")
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
        <>
            <tr>
                <td>{_id}</td>
                {edit ? <td>
                    <input 
                        type="text" 
                        className='editinput editname'
                        value={playerName} 
                        onChange={(e) => setplayerName(e.target.value)} 
                        />
                </td> :
                    <td>{playerName}</td>}
                <td>{country}</td>
                {edit ? <td>
                    <input
                        type="number"
                        className='editinput editscore'
                        value={playerScore}
                        onChange={(e) => setplayerScore(e.target.value)}
                        min={0}
                        max={100}
                    />
                </td> :
                    <td>{playerScore}</td>}
                <td>
                    {edit ? <>
                        <button className="cancel delete" onClick={() => setEdit(false)}>Cancel</button>
                        <button className="save edit" onClick={saveChanges}>Update</button>
                    </> :
                        <>
                            <button className="edit" onClick={() => setEdit(true)}>Edit</button>
                            <button className="delete" onClick={() => deleteUser(_id)}>Delete</button>
                        </>}
                </td>
            </tr>
        </>
    )
}
export default PlayerDetail;