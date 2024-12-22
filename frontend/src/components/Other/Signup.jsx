import { useAuth } from "../../AuthContext";
import { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
export default function Signup() {
    const { signup } = useAuth();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errorSignUp, setErrorSignUp] = useState(0);
    const handleSignUp = () => {
        setErrorSignUp(signup({ username, password, firstName, lastName }));
    };

    useEffect(() => {
        if (errorSignUp instanceof Promise)
            errorSignUp.then((promiseValue) => setErrorSignUp(promiseValue));
    }, [errorSignUp]);
    const errorSubmit = username.length < 8 || password.length < 8 || password !== confirmPassword;

    return (<div class="flex  flex-col justify-center py-4 px-8 rounded-lg bg-white drop-shadow-xl" >
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create new account</h2>
        </div>

        <div class="mt-10 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label class="block text-sm/6 font-medium text-gray-900">First name</label>
                    <div class="mt-2">
                        < TextField
                            size="small"
                            type="text"
                            className="w-full"
                            value={firstName} onChange={(e) => setFirstName(e.target.value)

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
                        /> </div>
                </div>
                <div>
                    <label class="block text-sm/6 font-medium text-gray-900">Last name</label>
                    <div class="mt-2">
                        < TextField
                            size="small"
                            type="text"
                            className="w-full"
                            value={lastName} onChange={(e) => setLastName(e.target.value)

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
                        /></div>
                </div>
            </div>
            <div>
                <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                <TextField
                    size="small"
                    type="email"
                    className="w-full"
                    value={username} onChange={(e) => setUsername(e.target.value)

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
                        helperText={password.length > 0 && password.length < 8 ? "Password must contain at least 8 characters" : ""}
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
                    /></div>
            </div>
            <div>
                <div class="flex items-center justify-between">
                    <label class="block text-sm/6 font-medium text-gray-900">Confirm password</label>
                    {/* <div class="text-sm">
                            <a href="#" class="font-semibold text-primary_2 hover:text-primary_2_hover">Forgot password?</a>
                        </div> */}
                </div>
                <div class="mt-2">
                    <TextField
                        size="small"
                        type={!confirmPasswordVisible ? "password" : "text"}
                        className="w-full"
                        helperText={confirmPassword !== password ? "Passwords don't match" : ""}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment >{<button className="" onClick={() => { setConfirmPasswordVisible(!confirmPasswordVisible) }}>{confirmPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}</button>}</InputAdornment>,
                            },

                        }}
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)

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
                    /></div>
            </div>
            {errorSignUp == -1 && <div className='text-red-500 font-semibold text-sm'>This username is already taken</div>}
            <div className="mt-5">
                <button onClick={handleSignUp} class={`flex w-full justify-center rounded-md ${!errorSubmit ? "bg-primary_2 hover:bg-primary_2_hover text-white" : "bg-primary_1 pointer-events-none text-gray-400"}  px-3 py-1.5 text-sm/6 font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary_2`}>Create account</button>
            </div>
        </div>
    </div >)
}