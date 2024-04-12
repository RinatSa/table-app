import React from 'react';
import UserRow from "./user-row.tsx";

function TableMain({tableData}) {
    return (
        <div className="table__main">
            <table>
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Banned</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </tbody>
                {tableData.map((item, index) => <UserRow {...item} key={item.id}/>)}
            </table>
        </div>
    );
}

export default TableMain;