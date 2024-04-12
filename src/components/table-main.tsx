import React from 'react';
import UserRow from "./user-row.tsx";

function TableMain({tableData, term}) {

    const search = term === "" ? tableData : tableData.filter((item) => item.name.toLowerCase().startsWith((term.toLowerCase())))


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
                {search.map((item, index) => <UserRow {...item} key={item.id} index={index}/>)}
                </tbody>
            </table>
        </div>
    );
}

export default TableMain;