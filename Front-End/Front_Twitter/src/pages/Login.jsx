import React from "react";
import TextField from '@mui/material/TextField';
import imageZ from '../assets/Logo_Z.png';
import { CircularProgress } from "@mui/material";
import { signIn } from "../domains/auth/slice";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

function Login() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const resultSignIn = await dispatch(signIn({email, password}));
            if (signIn.fulfilled.match(resultSignIn)) {
                console.log("Connexion réussie, redirection...");
                navigate("/home");
            } 
        }
        catch (error) {
            setIsLoading(false);
            return;
        }
    }


    return (
        <div className="h-screen bg-white flex flex-col justify-between">
        
        <div className="flex justify-center pt-30">
            <img 
            src={imageZ}
            alt="Logo"
            className="w-32 h-32 object-cover"
            />
        </div>

        <div className="flex justify-center items-start mt-12 flex-grow">
            <div className="bg-black p-8 rounded-2xl shadow-lg w-96">
                <h2 className="text-white text-3xl font-bold text-center mb-6">Login</h2>               
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <TextField 
                        label="email" 
                        variant="outlined" 
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { 
                                    borderColor: "white" 
                                },
                                "&:hover fieldset": { 
                                    borderColor: "gray" 
                                },
                                "&.Mui-focused fieldset": { 
                                    borderColor: "white" 
                                },
                                backgroundColor: "white",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                display: "none",
                            },
                        }}
                    />
                    <TextField 
                        label="password" 
                        variant="outlined" 
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { 
                                    borderColor: "white" 
                                },
                                "&:hover fieldset": { 
                                    borderColor: "gray" 
                                },
                                "&.Mui-focused fieldset": { 
                                    borderColor: "white" 
                                },
                                backgroundColor: "white",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                display: "none",
                            },
                        }}
                    />
                    <button 
                        type="submit"
                        className="bg-white text-black text-lg font-semibold py-3 rounded-md hover:bg-gray-300 transition"
                    >
                        Connect to my account
                    </button>
                </form>
                {isLoading && <CircularProgress/>}
            </div>
        </div>
        </div>
    );
}

export default Login;
