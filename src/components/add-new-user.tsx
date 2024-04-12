import {useForm} from "react-hook-form";
import axios from "axios";

type Inputs = {
    name: string
    gender: string,
    banned: string
}

function AddNewUser({setRefreshKey}) {

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<Inputs>()


    const onSubmit = async (data: Inputs) => {
        try {
            await axios.post('https://inqool-interview-api.vercel.app/api/users', {
                name: data.name,
                gender: data.gender,
                banned: data.banned === 'false' ? false : !!data.banned
            });
            setRefreshKey(prev => prev + 1)
            reset()
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="user-form__label">Add new user
            <form onSubmit={handleSubmit(onSubmit)} className="form" id={"newUser"}>
                <label> Name:</label>
                <input {...register("name", {required: true, pattern: /^[A-Za-z. ]+$/i})}/>
                <div className="error-message">
                    {errors.name && <p>Please write the name (only letters)</p>}
                </div>
                <label> Gender:</label>
                <select {...register("gender", {required: true})}>
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                </select>
                <label> Banned:</label>
                <select {...register("banned", {required: true})}>
                    <option value="false">false</option>
                    <option value="true">true</option>
                </select>
                <input type="submit" value="SUBMIT" className="btn"/>
            </form>
        </div>
    );
}

export default AddNewUser;