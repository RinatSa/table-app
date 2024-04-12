import UserRow from "./user-row.tsx";
import AnimalRow from "./animal-row.tsx";
import {AnimalData, UserData} from "../App.tsx";


type TableProps = {
    term: string,
    tableData: UserData[] | AnimalData[],
    page: string
}

function TableMain({tableData, term, page, setRefreshKey}: TableProps) {


    const search = term === "" ? tableData : tableData.filter((item) => item.name.toLowerCase().startsWith((term.toLowerCase())))


    return (
        <div className="table__main">
            <table>
                <tbody>
                {page === "users" ? <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Banned</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr> : <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>}
                {page === "users" ? search.map((item, index) => <UserRow {...item} key={item.id} index={index}
                                                                         setRefreshKey={setRefreshKey}/>) :
                    search.map((item, index) => <AnimalRow {...item} key={item.id} index={index}/>)}
                </tbody>
            </table>
        </div>
    );
}

export default TableMain;