import React, {useState} from 'react';

type AnimalProps = {
    id: string,
    name: string,
    type: string,
    age: number,
    index: number
}

function AnimalRow({id, name, type, index, age}: AnimalProps) {

    const [editable, setEditable] = useState<number | null>(null)
    const [userName, setUserName] = useState<string>(name)
    const [userType, setUserType] = useState<string>(type)
    const [userAge, setUserAge] = useState<number>(age)


    const typeOptions = ["cat", "dog", "other"]

    const onEditable = (i: number | null) => {
        setEditable(i)
    }

    const sendData = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedUser = {
            name: userName,
            type: userType,
            age: userAge,
        }
        console.log(updatedUser)
        setEditable(null)
    }


    return (
        <tr>
            {editable === index ? <>
                <td>{id}</td>
                <td>
                    <form onSubmit={(e) => sendData(e)} id="editForm">
                        <input type="text" onChange={(e) => setUserName(e.target.value)} value={userName}/>
                    </form>
                </td>
                <td className={"name"}>
                    <select onChange={(e) => setUserType(e.target.value)}>
                        <option value={type}>{type}</option>
                        {typeOptions.filter((term) => term !== type).map((item) => {
                            return <option key={item} value={item}>{item}</option>
                        })}
                    </select>
                </td>
                <td>
                    <input type="number" onChange={(e) => setUserAge(parseInt(e.target.value))} value={userAge}/>
                </td>
            </> : <>
                <td>{id}</td>
                <td>{name}</td>
                <td className={"name"}>{type}</td>
                <td>{age}</td>
            </>
            }
            <td>
                <div className="buttons">
                    {editable === index ? <div className="two-buttons">
                            <button className="cancel button btn" onClick={() => onEditable(null)}>Cancel</button>
                            <button type="submit" form="editForm" value="Update" className="update button btn">Update
                            </button>
                        </div> :
                        <button className="edit button btn" onClick={() => onEditable(index)}>Edit</button>
                    }
                </div>
            </td>
        </tr>
    );
}

export default AnimalRow;