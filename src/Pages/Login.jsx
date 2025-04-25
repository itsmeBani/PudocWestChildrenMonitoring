import React, {useContext} from 'react';
import  {AuthProviderContext} from "../Context/AuthProvider.jsx";
import {Button, Typography} from "@material-tailwind/react";
function Login() {
    const {Login, GoggleAuthentication,Error,ForgotPassword,loading} = useContext(AuthProviderContext)
    return (
        <section className="grid relative h-[100dvh]  bg-[url(./assets/bgpdw.jpg)]   bg-cover bg-center sm:grid-cols-1 md:grid-cols-2 sm:p-2 p-2 md:p-5">
            <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-black/80 z-10"></div>
            <div className=" z-10 h-full w-full age  rounded-2xl  flex flex-col justify-center py-12 sm:px-6 lg:px-8 md:px-2">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mb-2 Kerif text-center text-[30px] md:text-5xl leading-9 font-extrabold text-white">
                        Welcome Back!
                    </h2>
                    <Typography className=" text-center text-[14px] md:text-2xl leading-[10px] font-medium text-white">
                        Sign in to your account
                    </Typography>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
                        <form onSubmit={(e) => Login(e)}>
                            <div>
                                <label htmlFor="email" className="block text-[11px] md:text-sm font-medium leading-5 text-gray-700">Email
                                    address</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input style={{border:Error ?"1px solid red" : null}} id="email" name="email" placeholder="user@example.com" type="email"
                                           className="appearance-none block text-[13px] md:text-md w-full px-3 py-2 md:py-2  border border-gray-400 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                                    <div
                                        className="hidden  absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-2 md:mt-6">
                                <label htmlFor="password"
                                       className="block  text-[11px] md:text-sm  font-medium leading-5 text-gray-700">Password</label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input style={{border:Error ?"1px solid red" : null}} id="password" name="password" placeholder={"*********"} type="password"

                                           className="appearance-none block text-[13px] md:text-md w-full px-3 py-2 md:py-2 border border-gray-400 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex items-center">
                                    <input  id="remember_me" name="remember" type="checkbox" value="1"
                                           className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                                    <label htmlFor="remember_me" className="ml-2 block text-[11px] md:text-sm leading-5 text-gray-900">Remember
                                        me</label>
                                </div>

                                <div className="text-sm leading-5">
                                    <button type={"reset"} onClick={ForgotPassword}
                                       className=" text-[11px] md:text-sm text-blue-500 hover:text-blue-500 focus:outline-none hover:underline transition ease-in-out duration-150">
                                        Forgot your password?
                                    </button>
                                </div>
                            </div>

                            <div className="mt-2 md:mt-6">
                                <div
                                    className="flex justify-center place-items-center flex-col w-full  rounded-md shadow-sm">
                                    <Button loading={loading.email} disabled={loading.email} type={"submit"}
                                            className="w-full  shadow-md  capitalize bg-black  flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  focus:outline-none focus:shadow-outline-indigo transition duration-150 ease-in-out">
                                        Sign in
                                    </Button>
                                    <span className="text-gray-600 py-1 text-sm ">or</span>
                                    <Button loading={loading.google} disabled={loading.google} onClick={GoggleAuthentication} variant="outlined"
                                            color="blue-gray"
                                            className="w-full  shadow-md  py-2 capitalize place-items-center gap-2 text-sm  flex justify-center  px-4 border  font-medium rounded-md   ">

                                        <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask"
                                             className="h-5 w-5"/>
                                        Continue with Google
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className=" sm:hidden hidden   md:flex lg:flex z-10   place-items-center flex-col px-20  justify-center">
                <h1 className="font-extrabold text-6xl text-start text-white  Kerif">Pudoc West Child Malnutrition
                    Monitoring</h1>
                <Typography color={"white"} className={"mt-2 text-[16px]"}>This project focuses on monitoring and
                    supporting malnourished children in Pudoc West by regularly tracking their health
                    status.</Typography>
            </div>
        </section>
    );
}

export default Login;