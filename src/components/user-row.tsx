import React from 'react';

function UserRow({id, name, gender, banned}) {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{gender}</td>
            <td>{banned+""}</td>
            <td>
                <div className="status--ko">
                    Banned
                </div>
            </td>
            <td>
                <div className="buttons">
                    <button className="edit button">Edit</button>
                    <button className="ban button">Ban</button>
                </div>
            </td>
        </tr>
    );
}

export default UserRow;