import React, { useEffect, useState } from 'react';
import '../styles/Players.css';
import PlayerDetail from './PlayerDetail';
import { toast } from 'react-toastify';

const Players = () => {
    const [players, setData] = useState([]);


    // get all the players data
    const fetchData = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_HOST}/players`);
            const data = await res.json();
            setData([])

            data.data.map((item) => {
                setData((prev) => {
                    return [...prev, item]
                })
            })
        } catch (error) {
            toast.error("Error occured while fetching data");
        }
    }

    // function to delete a user by given id
    const deleteUser = async (id) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_HOST}/players/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success("Player delete successfully")
                fetchData();
            }
        } catch (error) {
            toast.error("Error occured while deleting user.")
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='players'>
            <table>
                <thead>
                    <tr>
                        <th>Player ID</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Score</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        players.map((item, ind) => {
                            return (
                                <PlayerDetail key={ind} playerdata={item} deleteUser={deleteUser} />
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Players