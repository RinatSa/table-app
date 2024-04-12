import React from 'react';

function Search(props) {
    return (
        <div className="table__info-search">
            <form action="">
                <input type="text" placeholder="Search" className="search-field"/>
            </form>
            <div className="clear-button">Clear</div>
        </div>
    );
}

export default Search;