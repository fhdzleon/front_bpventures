import React from 'react'
import Image from 'next/image'
const page = () => {
  return (
    <div className='relative'>
      <div className="absolute inset-0 hidden md:block justify-center">
          <Image
            src="/img/fondocombinado.svg"
            alt="Login Background"
            layout="fill"
            objectFit="cover"
            className='rotate-180'
            priority
          />
        </div>
      <section className="relative">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        
      <Image
          src={"https://i.ibb.co/56pzqfC/bp-ventures-color.png"}
          alt="logo"
          width={220}
          height={10}
        />
      <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-secundary dark:border-secundary sm:p-8">
          <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Olvidaste tu contraseña?
          </h1>
          <p className="font-light text-gray-500 dark:text-gray-400">No te preocupes, Ingresa tu correo electrónico para restablecer tu contraseña.</p>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu Email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
              </div>
              <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                  </div>
              </div>
              <button type="submit" className="w-full text-secundary bg-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:text-white dark:hover:bg-slate-400 dark:focus:ring-primary-800">Reset password</button>
          </form>
      </div>
  </div>
</section>
    </div>
  )
}

export default page
