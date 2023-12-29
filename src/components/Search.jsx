import React, { useState } from 'react';
import '../styles/Search.css'
import { toast } from 'react-toastify';

const Search = () => {
    const [rank, setRank] = useState(1);
    const [result, setResult] = useState();

    // get a random player data
    const getRandom = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_HOST}/players/random`);
            const data = await res.json();
            if (data.success) {
                setResult(data.randomPlayer[0])
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }


    // get a players data by rank
    const getByRank = async (event)=>{
        try {
            event.preventDefault();
            const res = await fetch(`${import.meta.env.VITE_HOST}/players/rank/${rank}`);
            const data = await res.json();
            console.log(data)
            if (data.success) {
                setResult(data.player);

            } else {
                toast.error("Cant find player of given rank");
            }
        } catch (error) {
            toast.error("Some error occured");
        }
    }

    return (
        <>
            <div className='search'>
                <div className="random">
                    <button onClick={getRandom}>Get a random player</button>
                </div>
                <div className="seachbyrank">
                    <form onSubmit={getByRank}>
                        <input
                            type="number"
                            placeholder='Enter rank'
                            value={rank}
                            onChange={(e) => setRank(e.target.value)}
                            required
                            min={1}
                        />
                        <button type='submit'> Search by Rank</button>
                    </form>
                </div>
            </div>
            <div className="searchresult">
                <h2>Results </h2>
                {result ?
                    <table>
                        <thead>
                            <tr>
                                <th>Player ID</th>
                                <th>Name</th>
                                <th>Country</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{result._id}</td>
                                <td>{result.name}</td>
                                <td>{result.country}</td>
                                <td>{result.score}</td>
                            </tr>
                        </tbody>
                    </table> : <p>
                        No result found
                    </p>

                }
            </div>
        </>
    )
}

export default Search