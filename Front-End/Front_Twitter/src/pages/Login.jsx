import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { CircularProgress, FormControlLabel, Checkbox } from "@mui/material";
import { signIn } from "../domains/auth/slice";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import imageZ from '../assets/Logo_Z.png';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const resultSignIn = await dispatch(signIn({ email, password }));
            if (signIn.fulfilled.match(resultSignIn)) {
                const token = resultSignIn.payload.accessToken;
                if (rememberMe) {
                    localStorage.setItem("token", token);
                }
                console.log("Navigation vers /home")
                navigate("/home");
            } 
        } catch (error) {
            setIsLoading(false);
            console.error("Erreur de connexion :", error);
        }
    };

    return (
        <div className="h-screen bg-white flex flex-col justify-between">
            <div className="flex justify-center pt-30">
                <img src={imageZ} alt="Logo" className="w-32 h-32 object-cover" />
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
                                    "& fieldset": { borderColor: "white" },
                                    "&:hover fieldset": { borderColor: "gray" },
                                    "&.Mui-focused fieldset": { borderColor: "white" },
                                    backgroundColor: "white",
                                },
                                "& .MuiInputLabel-root.Mui-focused": { display: "none" },
                            }}
                        />
                        <TextField 
                            label="password" 
                            type="password"
                            variant="outlined" 
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "white" },
                                    "&:hover fieldset": { borderColor: "gray" },
                                    "&.Mui-focused fieldset": { borderColor: "white" },
                                    backgroundColor: "white",
                                },
                                "& .MuiInputLabel-root.Mui-focused": { display: "none" },
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={rememberMe} 
                                    onChange={(e) => setRememberMe(e.target.checked)} 
                                    sx={{ color: "white" }} 
                                />
                            }
                            label={<span className="text-white">Rester connecté</span>}
                        />
                        <button 
                            type="submit"
                            className="bg-white text-black text-lg font-semibold py-3 rounded-md hover:bg-gray-300 transition"
                        >
                            Connect to my account
                        </button>
                    </form>
                    {isLoading && <CircularProgress />}
                </div>
            </div>
        </div>
    );
}

export default Login;
