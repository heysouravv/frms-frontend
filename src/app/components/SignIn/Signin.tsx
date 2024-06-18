"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalShow from "../Modal/ModalShow";


export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
const [passEmail, setPassEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState("SignIn");
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();
  const [redirected, setRedirected] = useState(false);

  
 

  const [flag,setFlag] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // try {
    //   const response = await axios.post(BASE_URL+"/contractors/auth/signin", { email, password });
    //   console.log(response.data);
    //   const  data  = response.data;
    //   console.log(data);
    //   const authToken = data.tokenResponse.token;


    //   const ul = "/";
    //   const nullval = await setAuthToken(authToken, ul,router);
    //   Cookies.set('redirected', 'true');

    //   router.push("/");
      
    
//     } catch (error) {
//       setFlag(true);
//   }

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmitResetPassword = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     axiosInstance.post("/contractors/password/forgot", { email: passEmail }).then((response: { data: any; }) => {
//       console.log(response.data);
//   setStatus("Submitpassword");
//   console.log(passEmail);
  
// }).catch((error: any) => {
//   console.error("Error:", error);
// })
  }

  return (
    <>
          {flag && <ModalShow  label="Invalid email or password" />}

          {/* <div className="flex flex-col justify-start  items-start  w-full bg-[#F6F6F6] py-8 border border-[#DADADA]">
          <Image
            src={"/gravity-logo.png"}
            alt="Gravity Logo"
            width={100}
            height={300}
            className="absolute top-0 left-0 mt-4 ml-10 h-10 w-auto"
            ></Image>{" "}

            </div> */}
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="mx-auto text-center sm:w-full sm:max-w-sm">
          
          <h2
            className="mt-20 text-center text-2xl sm:text-3xl font-bold leading-9 text-gray-900 font-inter tracking-wide sm:mt-12 md:mt-8"
          >
            {status === "SignIn" ? "Welcome to SkyIjo" : "Forgot password"}
          </h2>
          <span className="text-sm  text-gray-900  ">
Lorem Ipsum Dipsum WitchSome coz you got nothing
          </span>
        </div>
        {status === "SignIn" && (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-0">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="johndoe@email.com"
                    onChange={handleChange}
                    required
                    value={email}
                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
       
              >
                    Password
                  </label>
                </div>
                <div className="mt-0 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="enter your password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    value={password}
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none"
                  >
                    {showPassword ? (
<img src="/assets/Images/eyesOpen.png" className="w-4"/>
                    ) : (
<img src="/assets/Images/closeEye.png"className="w-4"/>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md text-white bg-[#FF7645] px-3 py-2 text-sm font-semibold leading-6 shadow-sm hover:text-[#FF7645] hover:bg-white hover:border-[#FF7645]  hover:border-2 hover:py-1.5 hover:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7645] focus-visible:ring-opacity-50"
                >
                  Sign In
                </button>
                <div className="mt-4">
                  <p className="text-sm">
                    Don't remember the password?{" "}
                    <span
                      className="text-[FF7645] cursor-pointer hover:underline"
                      onClick={() => setStatus("SignUp")}
                    >
                      Forgot password
                    </span>
                  </p>
                </div>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              By clicking "Sign In“ you agree to our{" "}
              <a href="#terms" style={{ borderBottom: "1px solid #000" }}>
                terms of use
              </a>{" "}
              and{" "}
              <a href="#terms" style={{ borderBottom: "1px solid #000" }}>
                privacy policy
              </a>
            </p>
          </div>
        )}

        {status === "SignUp" && (
          <div className="flex flex-col justify-center items-center w-full">
            <form
              className="space-y-4 md:space-y-6 mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
              action="#"
              onSubmit={onSubmitResetPassword}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-0">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    required
                    value={email}
      onChange={e => setEmail(e.target.value)}
                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md text-white bg-[#FF7645] px-3 py-2 text-sm font-semibold leading-6 shadow-sm hover:text-[#FF7645] hover:bg-white hover:border-[#FF7645]  hover:border-2 hover:py-1.5 hover:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7645] focus-visible:ring-opacity-50"
                >
                  Submit
                </button>
                <div className="mt-2">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <span
                      className="text-[FF7645] cursor-pointer hover:underline"
                      onClick={() => setStatus("SignIn")}
                    >
                      Sign In
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        )}

        {status === "Submitpassword" && (
          <div className="flex py-5 flex-col gap-4 justify-center items-center w-full">
            <img src="/" />
<p className="text-center text-xl font-semibold lg:text-2xl">The link is shared to your email <br/>
kindly check it!
</p>
<p className="underline lg:text-xl text-lg cursor-pointer" onClick={()=>setStatus("SignIn")}>Back to Sign In</p>
          </div>
        )}
      </div>
    </>
  );
}