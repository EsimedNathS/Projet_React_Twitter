import React from "react";
import TextField from '@mui/material/TextField';
import imageZB from '../assets/Logo_Z_B.png';
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { signUp } from "../domains/auth/slice";
import { useDispatch } from "react-redux";

function Signup() {

    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordVerif, setPasswordVerif] = React.useState("");
    const [passwordError, setPasswordError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (validatePassword() && validateEmail()){
          try {
            const resultSignUp = await dispatch(signUp({ email, password, username }));
            if (signUp.fulfilled.match(resultSignUp)) {
                const token = resultSignUp.payload;
                localStorage.setItem("token", token);
                navigate("/home");
            }             
        } catch (error) {
            setIsLoading(false);
        }
        } else {
            setIsLoading(false);
            return;
        } 
    }

    const validatePassword = () => {
        const conditions = {
          minLength: password.length >= 8,
          hasUpperCase: /[A-Z]/.test(password),
          hasLowerCase: /[a-z]/.test(password),
          hasNumber: /\d/.test(password),
          hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
    
        if (!conditions.minLength) {
            setPasswordError('The password must contain at least 8 characters.');
            return false;
          } else if (!conditions.hasUpperCase) {
            setPasswordError('The password must contain an uppercase letter.');
            return false;
          } else if (!conditions.hasLowerCase) {
            setPasswordError('The password must contain a lowercase letter.');
            return false;
          } else if (!conditions.hasNumber) {
            setPasswordError('The password must contain a number.');
            return false;
          } else if (!conditions.hasSpecialChar) {
            setPasswordError('The password must contain a special character.');
            return false;
          } else if (password !== passwordVerif) {
            setPasswordError('The verification password does not match.');
            return false;
          } else {
            setPasswordError(''); // If all conditions are met
            return true;
          }
          
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
          setEmailError("The email field cannot be empty.");
          return false;
        } else if (!emailRegex.test(email)) {
          setEmailError("Please enter a valid email address.");
          return false;
        } else {
          setEmailError(""); // Email is valid
          return true;
        }
      };
      

    return (
        <div className="h-screen bg-black flex flex-col justify-between">
        
        <div className="flex justify-center pt-30">
            <img 
            src={imageZB}
            alt="Logo"
            className="w-32 h-32 object-cover"
            />
        </div>

        <div className="flex justify-center items-start mt-12 flex-grow">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96">
              <h2 className="text-white text-3xl font-bold text-center mb-6">Create your account</h2>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <TextField 
                  label="username" 
                  variant="outlined" 
                  onChange={(e) => setUsername(e.target.value)}
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
                  placeholder="email"
                  variant="outlined"
                  InputLabelProps={{ shrink: false }}
                  error={!!emailError}
                  helperText={emailError}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                      "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "gray" },
                          "&.Mui-focused fieldset": { borderColor: "white" },
                              backgroundColor: "white",
                              },
                          }}
                      />
                      <TextField
                          placeholder="password"
                          variant="outlined"
                          InputLabelProps={{ shrink: false }}
                          error={!!passwordError}
                          helperText={passwordError}
                          onChange={(e) => setPassword(e.target.value)}
                          sx={{
                              "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "white" },
                              "&:hover fieldset": { borderColor: "gray" },
                              "&.Mui-focused fieldset": { borderColor: "white" },
                              backgroundColor: "white",
                              },
                          }}
                      />
                      <TextField
                      placeholder="Confirm password"
                      variant="outlined"
                      InputLabelProps={{ shrink: false }}
                      onChange={(e) => setPasswordVerif(e.target.value)}
                      sx={{
                          "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "white" },
                          "&:hover fieldset": { borderColor: "gray" },
                          "&.Mui-focused fieldset": { borderColor: "white" },
                          backgroundColor: "white",
                          },
                      }}
                      />
                      <button 
                        type="submit"
                        className="bg-white text-black text-lg font-semibold py-3 rounded-md hover:bg-gray-300 transition"
                      >
                        Create my account
                </button>
              </form>
            {isLoading && <CircularProgress/>}
            </div>
        </div>
        </div>
    );
}

export default Signup;