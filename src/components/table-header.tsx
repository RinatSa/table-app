import Search from "./search.tsx";

type HeaderProps = {
    term: string,
    page: string,
    setTerm: (term: string) => void,
    setPage: (page: (prevMode: string) => (string)) => void
}

function TableHeader({term, setTerm, page, setPage}: HeaderProps) {
    return (
        <div className="table__head">
            <div>Show:
                <button onClick={() => setPage(prevMode => (prevMode === 'users' ? 'animals' : 'users'))}
                        className="btn-show btn button">{page === "users" ? "Animal" : "Users"}</button>
            </div>
            <div className="table__info">
                <Search term={term} setTerm={setTerm}/>
            </div>
            <a href="#newUser">
                <button className="new-user btn">
                    Add New User
                </button>
            </a>
        </div>
    );
}

export default TableHeader;