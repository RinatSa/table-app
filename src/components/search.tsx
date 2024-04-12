type SearchProps = {
    term: string,
    setTerm: (term: string) => void,
}

function Search({term, setTerm}: SearchProps) {
    return (
        <div className="table__info-search">
            <form action="">
                <input type="text" placeholder="Search" className="search-field" value={term}
                       onChange={(e) => setTerm(e.target.value)}/>
            </form>
            <button className="clear-button btn" onClick={() => setTerm("")}>Clear</button>
        </div>
    );
}

export default Search;