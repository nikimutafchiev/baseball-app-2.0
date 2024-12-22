import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { TextField, InputAdornment } from "@mui/material";
export default function Login() {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorLogin, setErrorLogin] = useState(0);
    const handleLogin = () => {
        setErrorLogin(login({ username, password }));
    };

    useEffect(() => {
        if (errorLogin instanceof Promise)
            errorLogin.then((promiseValue) => setErrorLogin(promiseValue));
    }, [errorLogin]);
    const errorSubmit = username.length < 5 || password.length < 5;
    return (
        <div class="flex w-fit flex-col justify-center p-12 rounded-lg bg-white drop-shadow-xl">
            <div class="">

                <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div class="mt-10 flex flex-col gap-4">
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary_2 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                        {/* <div class="text-sm">
                            <a href="#" class="font-semibold text-primary_2 hover:text-primary_2_hover">Forgot password?</a>
                        </div> */}
                    </div>
                    <div class="mt-2">
                        <TextField
                            size="small"
                            type={!passwordVisible ? "password" : "text"}
                            className="w-full"
                            slotProps={{
                                input: {
                                    endAdornment: <InputAdornment >{<button className="" onClick={() => { setPasswordVisible(!passwordVisible) }}>{passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}</button>}</InputAdornment>,

                                },

                            }}
                            value={password} onChange={(e) => setPassword(e.target.value)

                            }
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused': {
                                    '& fieldset': {
                                        borderColor: 'green',
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    fontSize: '14px',
                                }
                            }}
                        />
                    </div>
                </div>
                {errorLogin == -1 && <div className="text-red-400 font-semibold text-sm">Invalid username or password</div>}
                <div>
                    <button onClick={handleLogin} class={`flex w-full justify-center rounded-md ${!errorSubmit ? "bg-primary_2 hover:bg-primary_2_hover text-white" : "bg-primary_1 pointer-events-none text-gray-400"}  px-3 py-1.5 text-sm/6 font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary_2`}> Login</button>
                </div>

                <p class="flex flex-row gap-2 justify-center mt-10 text-center text-sm/6 text-gray-500">
                    Don't have account?
                    <Link to="/signup" class="font-semibold text-primary_2 hover:primary_2_hover">Sign up</Link>
                </p>
            </div>
        </div >);
}