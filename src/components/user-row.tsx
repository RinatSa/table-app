import React, {useState} from 'react';


type TableData = {
    id: string,
    name: string,
    gender: "female" | "male" | "other"
    banned: boolean,
    index: number
}

function UserRow({id, name, gender, banned, index}: TableData) {


    const [status, setStatus] = useState<boolean>(banned)
    const [editable, setEditable] = useState<number | null>(null)
    const [userName, setUserName] = useState<string>(name)
    const [userGender, setUserGender] = useState<string>(gender)
    const [userBanned, setUserBanned] = useState<string | boolean>(banned)


    const genderOptions = ["female", "male", "other"]

    const changeStatus = () => {
        setStatus(prev => !prev)
    }

    const onEditable = (i: number | null) => {
        setEditable(i)
    }

    const sendData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nameError = document.getElementById('name-error');
        const lengthError = document.getElementById("length-error")
        if (!/^[a-zA-Z .]+$/.test(userName)) {
            nameError.style.display = 'block';
            return;
        } else if (userName.length > 35) {
            lengthError.style.display = 'block';
        } else {
            nameError.style.display = 'none';

            const updatedUser = {
                name: userName,
                gender: userGender,
                banned: userBanned === 'false' ? false : !!userBanned
            }
            console.log(updatedUser)
            setEditable(null)
        }
    }


    return (
        <tr>
            {editable === index ? <>
                <td>{id}</td>
                <td>
                    <form onSubmit={(e) => sendData(e)} id="editForm">
                        <input type="text" onChange={(e) => setUserName(e.target.value)} value={userName}
                               name="name" required/>
                        <span id="name-error" style={{color: "red", display: "none"}} className="message">Only alphabetic characters!</span>
                        <span id="length-error" style={{color: "red", display: "none"}} className="message">Input is too long!</span>
                    </form>
                </td>
                <td>
                    <select onChange={(e) => setUserGender(e.target.value)}>
                        <option>{gender}</option>
                        {genderOptions.filter((term) => term !== gender).map((item) => {
                            return <option key={item} value={item}>{item}</option>
                        })}
                    </select>
                </td>
                <td>
                    <select onChange={(e) => setUserBanned(e.target.value)}>
                        <option>{banned + ""}</option>
                        <option>{!banned + ""}</option>
                    </select>
                </td>
            </> : <>
                <td>{id}</td>
                <td>{name}</td>
                <td>{gender}</td>
                <td>{status + ""}</td>
            </>
            }
            <td>
                {status ? <div className="status--ko">
                    Banned
                </div> : <div className="status--ok">
                    OK
                </div>}
            </td>
            <td>
                <div className="buttons">
                    {editable === index ? <div className="two-buttons">
                            <button className="cancel button btn" onClick={() => onEditable(null)}>Cancel</button>
                            <button type="submit" form="editForm" value="Update" className="update button btn">Update
                            </button>
                        </div> :
                        <button className="edit button btn" onClick={() => onEditable(index)}>Edit</button>
                    }
                    {editable === index ? null :
                        <button className="ban button btn" onClick={changeStatus}>Ban</button>
                    }
                </div>
            </td>
        </tr>
    );
}

export default UserRow;