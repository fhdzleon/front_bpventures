"use client";
import Image from "next/image";
import "../../styles/style.css";
import { useState, ChangeEvent, FormEvent } from "react";
import { ValidateLogin } from "../../helpers/authErrors";

export default function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = ValidateLogin(
      formData.name,
      formData.email,
      formData.password
    );
    setErrors(validationErrors);

    if (
      validationErrors.email ||
      validationErrors.password ||
      validationErrors.name
    ) {
      return;
    }

    console.log("Formulario válido, procesando...", formData);

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className=" relative min-h-screen flex items-center justify-center">
      <div className=" flex">
        <div className=" h-screen w-full"></div>
        <div className="bg-white"></div>
      </div>
      {/* Imagen de fondo para móviles */}

      <div className="absolute inset-0 md:hidden">
        <Image
          src="/img/login-mobile-background.svg"
          alt="Login Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Imagen de fondo para escritorios */}
      <div className="flex justify-center">
        <div className="absolute inset-0 hidden md:block justify-center">
          <Image
            src="/img/fondocombinado.svg"
            alt="Login Background"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="hidden md:block absolute top-4 left-4">
            <Image
              src="/img/logobpventures.svg"
              alt="Logo"
              width={450}
              height={450}
            />
          </div>
          <div className="hidden md:block absolute bottom-0 left-12">
            <Image
              src="/img/avatar.svg"
              alt="People"
              width={400}
              height={400}
            />
          </div>
        </div>

        {/* Contenedor del formulario */}
        <div className="relative z-10 flex items-center justify-center custom-position md:absolute custom-position lg:top-1/4 lg:transform lg:-translate-y-80 md:right-4 md:top-1/3 md:transform md:-translate-y-1/2 mt-52 md:max-w-lg md:w-auto">
          <div className="p-6 max-w-sm w-full md:max-w-md md:w-auto">
            <h2 className="text-2xl font-futura font-bold text-gray-800 text-left mb-6 mt-34">
              INICIA SESIÓN
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block font-futura text-left text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Nombre
                </label>
                <input
                  className="appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">{errors.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block font-futura text-left text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  E-mail
                </label>
                <input
                  className="font-futura appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Ingresa tu e-mail"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic">{errors.email}</p>
                )}
              </div>

              <div className="mb-6">
                <label
                  className="font-futura block text-left text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  className="font-futura appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Ingresa tu password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                className="font-futura bg-[#2B4168] hover:bg-[#1e2a44] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Inicia Sesión
              </button>

              <div className="flex items-center my-6 border-black">
                <hr className="flex-grow border-black" />
                <span className="mx-4 text-gray-600">O</span>
                <hr className="flex-grow border-black" />
              </div>

              <div className="flex items-center space-x-2 mt-8 rounded-full p-3 bg-white border border-gray-300">
                <Image
                  src="/img/cromo.png"
                  alt="Imagen del celular"
                  width={30}
                  height={30}
                  layout="intrinsic"
                  className="rounded"
                />
                <button className="font-futura text-sm">
                  Accede con tu cuenta de Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
