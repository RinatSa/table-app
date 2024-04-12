import React, {useState} from 'react';
import axios from "axios";
//import {Controller, useForm} from "react-hook-form";

type AnimalProps = {
    id: string,
    name: string,
    type: string,
    age: number,
    index: number
}

function AnimalRow({id, name, type, index, age}: AnimalProps) {

    const [actualName, setActualName] = useState<string>(name)
    const [actualType, setActualType] = useState<string>(type)
    const [actualAge, setActualAge] = useState<number>(age)

    const [editable, setEditable] = useState<number | null>(null)
    const [userName, setUserName] = useState<string>(name)
    const [userType, setUserType] = useState<string>(type)
    const [userAge, setUserAge] = useState<number>(age)


    const typeOptions = ["cat", "dog", "other"]

    const onEditable = (i: number | null) => {
        setEditable(i)
    }

    // Validation using the React hook form does not work, it still sends a number in addition to the string
    // for this reason vanilla js was used

    const sendData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nameError = document.getElementById('name-error');
        const lengthError = document.getElementById("length-error")
        const ageError = document.getElementById("age-error")
        if (userAge > 99) {
            if (ageError) {
                ageError.style.display = 'block';
                return
            }
        }
        if (!/^[a-žA-Ž .]+$/.test(userName)) {
            if (nameError) {
                nameError.style.display = 'block';
                return;
            }
        } else if (userName.length > 35) {
            if (lengthError) {
                lengthError.style.display = 'block';
            }
        } else {
            if (lengthError) {
                lengthError.style.display = 'none';
            }

            const updatedUser = {
                name: userName,
                type: userType,
                age: userAge,
            }

            setEditable(null)
            update(id, updatedUser)
        }
    }

    const update = async (id: string, data: object) => {
        try {
            await axios.patch(`https://inqool-interview-api.vercel.app/api/animals/${id}`, data);
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    {/*const {control, handleSubmit} = useForm();
        const onSubmit = () => {
            const updatedUser = {
                name: userName,
                type: userType,
                age: userAge,
            }
            console.log(updatedUser)
            setEditable(null)
        };*/
    }


    return (
        <tr>
            {editable === index ? <>
                <td>{id}</td>
                <td>
                    <form onSubmit={(e) => sendData(e)} id="editForm">
                        <input type="text" onChange={(e) => setUserName(e.target.value)} value={userName}/>
                        <span id="name-error" style={{color: "red", display: "none"}} className="message">Only alphabetic characters!</span>
                        <span id="length-error" style={{color: "red", display: "none"}} className="message">Input is too long!</span>
                    </form>
                    {/* Validation using the React hook form does not work, it still sent a number in addition to the string

                    <form onSubmit={handleSubmit(onSubmit)} id="editForm">
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={name}
                            rules={{pattern: /^[A-Za-z ]+$/}}
                            render={({field}) => <input {...field} onChange={(e) => setUserName(e.target.value)} value={userName}/>}/>
                    </form>*/}
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
                    <span id="age-error" style={{color: "red", display: "none"}}
                          className="message">Maximal age is 99!</span>
                </td>
            </> : <>
                <td>{id}</td>
                <td>{actualName}</td>
                <td>{actualType}</td>
                <td>{actualAge}</td>
            </>
            }
            <td>
                <div className="buttons">
                    {editable === index ? <div className="two-buttons">
                            <button className="cancel button btn" onClick={() => onEditable(null)}>Cancel</button>
                            <button type="submit" form="editForm" value="Update" className="update button btn"
                                    onClick={() => {
                                        setActualName(userName)
                                        setActualType(userType)
                                        setActualAge(userAge)
                                    }}>Update
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