import TableHeader from "./components/table-header.tsx";
import TableMain from "./components/table-main.tsx";
import AddNewUser from "./components/add-new-user.tsx";
import {useEffect, useState} from "react";
import Spinner from "./components/spinner.tsx";
import axios from "axios"
import AddNewAnimal from "./components/add-new-animal.tsx";

export type UserData = {
    id: string,
    name: string,
    gender: "other" | "female" | "male",
    banned: boolean,
}

export type AnimalData = {
    id: string,
    name: string,
    type: "cat" | "dog" | "other",
    age: number,
}


function App() {

    //Fetch data and loading
    const [tableData, setTableData] = useState<UserData[] | AnimalData[] | []>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [page, setPage] = useState<string>("users")
    const [refreshKey, setRefreshKey] = useState<number>(0);


    //Name filter
    const [term, setTerm] = useState<string>("")


    useEffect(() => {
        setLoading(true)
        getData()
            .then(res => {
                setTableData(res.data)
                setLoading(false)
            });
    }, [page, refreshKey]);


    const getData = async () => {
        return await axios.get(`https://inqool-interview-api.vercel.app/api/${page}`)
    }

    return (
        <>
            <main className="main">
                <div className="container">
                    <div className="table">
                        <TableHeader term={term} setTerm={setTerm} page={page} setPage={setPage}/>
                        {loading ? <Spinner/> :
                            <TableMain tableData={tableData} term={term} page={page}/>}
                    </div>
                </div>
            </main>
            <section>
                <div className="container">
                    <div className="user-form">
                        <div className="user-form__data" id="targetElement">
                            {page === "users" ? <AddNewUser setRefreshKey={setRefreshKey}/> :
                                <AddNewAnimal setRefreshKey={setRefreshKey}/>}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default App
