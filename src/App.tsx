import TableHeader from "./components/table-header.tsx";
import TableMain from "./components/table-main.tsx";
import AddNewUser from "./components/add-new-user.tsx";

function App() {

    return (
        <>
            <main className="main">
                <div className="container">
                    <div className="table">
                        <TableHeader/>
                        <TableMain/>
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
