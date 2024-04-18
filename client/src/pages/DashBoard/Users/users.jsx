import React, { useEffect, useState } from 'react';
import './users.css'
import Sidebar from '../Sidebar/sidebar';
import { useNavigate } from 'react-router-dom';

const Users = ({ user }) => {
    const [users, setUsers] = useState([]);
    const [newRank, setNewRank] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/dashboard/admin/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    const updateUserRank = (userId, newRank) => {
        fetch(`http://localhost:5000/dashboard/admin/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rank: newRank }),
        })
        .then(response => response.json())
        .then(data => {
            setUsers(users.map(user => user._id === userId ? data : user));
            alert('Rank updated to user with ID: ' + userId + ' to ' + newRank + '!');
            navigate('/dashboard/admin/users')
        });
    }

    const deleteUser = (userId) => {
        fetch(`http://localhost:5000/dashboard/admin/users/${userId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(() => {
            setUsers(users.filter(user => user._id !== userId));
            alert('User with ID: ' + userId + ' deleted!');
        });
    }

    return (
        <>
            <Sidebar user={user} />
            <div className="bigbox">
                <h1>Users data</h1>
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date Created</th>
                            <th>Rank</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.displayName}</td>
                                <td>{user.email}</td>
                                <td>{user.createdAt}</td>
                                <td>{user.rank}</td>
                                <td>
                                    <div className="user-controls">
                                        <select onChange={e => setNewRank(e.target.value)}>
                                            <option value="" disabled>Select Rank</option>
                                            <option value="Client">Client</option>
                                            <option value="Mecanic">Mecanic</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                        <button onClick={() => updateUserRank(user._id, newRank)} disabled={!newRank}>Update Rank</button>
                                        <button onClick={() => deleteUser(user._id)}>Delete User</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Users;