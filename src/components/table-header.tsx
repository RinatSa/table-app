import React from 'react';
import Search from "./search.tsx";

function TableHeader(props) {
    return (
        <div className="table__head">
            <div className="table__info">
                <Search/>
            </div>
            <div className="new-user" id="new">
                <span>Add New User</span>
            </div>
        </div>
    );
}

export default TableHeader;