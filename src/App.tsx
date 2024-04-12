import TableHeader from "./components/table-header.tsx";
import TableMain from "./components/table-main.tsx";
import AddNewUser from "./components/add-new-user.tsx";
import {useEffect, useState} from "react";
import Spinner from "./components/spinner.tsx";
import axios from "axios"

function App() {

    //Fetch data and loading
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState<boolean>(true)
    const [page, setPage] = useState<string>("users")


    //Name filter
    const [term, setTerm] = useState<string>("")


    useEffect(() => {
        setLoading(true)
        getData()
            .then(res => {
                setTableData(res.data)
                setLoading(false)
            });
    }, [page]);


    const getData = async () => {
        return await axios.get(`https://inqool-interview-api.vercel.app/api/${page}`)
    }

    return (
        <>
            <main className="main">
                <div className="container">
                    <div className="table">
                        <TableHeader term={term} setTerm={setTerm} page={page} setPage={setPage}/>
                        {loading ? <Spinner/> : <TableMain tableData={tableData} term={term} page={page}/>}
                    </div>
                </div>
            </main>
            <section>
                <div className="container">
                    <div className="user-form">
                        <div className="user-form__data" id="targetElement">
                            <AddNewUser/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default App
