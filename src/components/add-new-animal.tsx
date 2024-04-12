import {useForm} from "react-hook-form";
import axios from "axios";

type Inputs = {
    name: string
    type: string,
    age: number
}

function AddNewAnimal({setRefreshKey}) {

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<Inputs>()


    const onSubmit = async (data: Inputs) => {
        try {
            await axios.post('https://inqool-interview-api.vercel.app/api/animals', {
                name: data.name,
                type: data.type,
                age: +data.age
            });
            setRefreshKey(prev => prev + 1)
            reset()
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="user-form__label">Add new animal
            <form onSubmit={handleSubmit(onSubmit)} className="form" id={"newUser"}>
                <label> Name:</label>
                <input {...register("name", {required: true, pattern: /^[A-Za-z. ]+$/i})}/>
                <div className="error-message">
                    {errors.name && <p>Please write the name (only letters)</p>}
                </div>
                <label> Type:</label>
                <select {...register("type", {required: true})}>
                    <option value="cat">cat</option>
                    <option value="dog">dog</option>
                    <option value="other">other</option>
                </select>
                <label> Age:</label>
                <input type="number" min="0" max="99" {...register("age", {required: true})}/>
                <input type="submit" value="SUBMIT" className="btn"/>
            </form>
        </div>
    )
        ;
}

export default AddNewAnimal;