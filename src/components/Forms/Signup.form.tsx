import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import { User } from "../../interfaces/User"
import instance from "../../services/apis"
import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi"
import { Banner } from "../../utils/assets"
const userSchema = Joi.object({
  // name: Joi.string().min(2),
  email: Joi.string().email({ tlds: false }).required().min(5),
  password: Joi.string().min(6)
})
const SignupForm = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<User>({ resolver: joiResolver(userSchema) })
  const onSumbit = (user: User) => {
    (async () => {
      try {


        const { data } = await instance.post("/auth/register", user)
        console.log(data);

        const check = confirm("Go to login ?")
        if (check) {
          navigate("/signin")
        }

      } catch (error) {
        console.log(error);

      }
    })()
  }
  return (
    <section className="signup mt-14 mb-56 w-full">
      <div className="signup-row flex">
        <div className="signup-col basis-4/6">
          <img src={Banner.bannerAuthen} alt="banner" className="min-w-full min-h-min" />
        </div>
        <div className="signup-col basis-2/6">
          <div className="signup-col__form my-20 ml-32 mr-4">
            <h1 className="font-medium text-4xl">Create an account</h1>
            <p className="mt-6 mb-12">Enter your details below</p>
            <form className="flex flex-col" onSubmit={handleSubmit(onSumbit)}>
              {/* <div className="mb-10 ">
                <input className=" focus:outline-none focus:ring-0 border-b-2 py-2 min-w-full mb-5" type="text" placeholder="Name" {...register("name", { minLength: 1 })} />
                {errors.name && <div className="text-red-600 font-bold inline-block">{errors.name.message}</div>}

              </div> */}
              <div className="mb-10">
                <input className=" focus:outline-none focus:ring-0 border-b-2 py-2 min-w-full mb-5" type="text" placeholder="Email or Phone Number"  {...register("email", { required: true, minLength: 1 })} />
                {errors.email && <div className="text-red-600 font-bold inline-block'">{errors.email.message}</div>}

              </div>
              <div className="mb-10">
                <input className=" focus:outline-none focus:ring-0 border-b-2 py-2 min-w-full mb-5" type="text" placeholder="Password" {...register("password", { required: true, minLength: 1 })} />
                {errors.password && <div className="text-red-600 font-bold inline-block">{errors.password.message}</div>}

              </div>
              <button className="py-4 px-30 text-white bg-blue-500 hover:bg-blue-700 ease-in-out transition rounded font-sans font-medium">
                Create Account
              </button>
              <button className="border-2 mt-4 mb-8 py-4 px-16 flex flex-row rounded justify-center gap-4 hover:bg-slate-300 hover:text-white ease-in-out transition">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 262">
                  <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
                  <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" />
                  <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z" />
                  <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" />
                </svg>
                Sign up with Google
              </button>
              <p className="text-center">
                Already have account?
                <Link className="border-b-2 pb-1 hover:border-b-gray-200" to="/signin">Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
