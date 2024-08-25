"use client";
import Image from "next/image";
import "../../styles/style.css";
import { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { ValidateLogin } from "../../helpers/authErrors";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { AuthContextType, useAuth } from "../../context/AuthContext";
import { PATHROUTES } from "@/helpers/pathRoutes";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Login Step, 2: 2FA Step
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const { user, setUser }: AuthContextType = useAuth();
  const [remember, setRemember] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mfa: "",
    remember: false,
  });

  const [errors, setErrors] = useState<{
    email: string;
    password: string;
    mfa: string;
  }>({
    email: "",
    password: "",
    mfa: "",
  });

  useEffect(() => {
    if (formData.remember) {
      setFormData({ ...formData, email: user.email });
    } else {
      setFormData({ ...formData, email: "" });
    }
  }, [remember]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const newOtp = [...otp];
    newOtp[index] = e.target.value;

    // Move to next input if not last input
    if (e.target.value.length === 1 && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    // Handle backspace to move to previous input
    if (e.target.value.length === 0 && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    setOtp(newOtp);
    const mfa = newOtp.join("");

    setFormData({ ...formData, [name]: value, mfa: mfa });

    const validationErrors = ValidateLogin(
      name === "email" ? value : formData.email,
      name === "password" ? value : formData.password,
      name === "mfa" ? value : formData.mfa
    );

    setErrors(validationErrors);
  };

  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      remember: !formData.remember,
    });

    setRemember(!formData.remember);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 1) {
      // Step 1: Validate user credentials
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          }
        );

        const json = await response.json();

        if (!response.ok) {
          if (json.message === "Two factor code is required!") {
            setStep(2);
          } else {
            throw new Error("Credenciales inválidas");
          }
        } else {
          const tokenCookie = JSON.stringify(json.token);
          document.cookie = `token=${tokenCookie};`;
          sessionStorage.setItem("user", JSON.stringify(json.userPayload));
          setUser(json.userPayload);
          toast.success("¡Inicio de sesión exitoso!");
          router.push(PATHROUTES.HOME);
        }
      } catch (error) {
        toast.error("Error en el inicio de sesión. Verifica tus credenciales.");
      }
    } else if (step === 2) {
      // Step 2: Validate the 2FA code
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
              mfa: formData.mfa,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Código 2FA inválido");
        }

        const json = await response.json();
        console.log(json);
        const tokenCookie = JSON.stringify(json.token);
        document.cookie = `token=${tokenCookie};`;
        sessionStorage.setItem("user", JSON.stringify(json.userPayload));
        setUser(json.userPayload);
        toast.success("¡Inicio de sesión exitoso!");
        router.push(PATHROUTES.HOME);
      } catch (error) {
        toast.error("Error en la verificación 2FA. Verifica tu código.");
      }
    }
  };

  return (
    <div className=" relative min-h-screen flex items-center justify-center">
      <Toaster richColors />
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
              src="https://i.ibb.co/pJVrW93/image-5.png"
              alt="People"
              width={400}
              height={400}
            />
          </div>
        </div>

        {/* Contenedor del formulario */}
        <div
          className={`relative bg-prim  z-10 flex items-center justify-center custom-position md:absolute custom-position lg:top-1/4 lg:transform lg:-translate-y-80 md:right-1/3 md:top-1/3 md:transform md:-translate-y-1/2 mt-52 md:mt-72 xl:mt-60 md:-mr-32  md:max-w-lg md:w-auto`}
        >
          <div className={`p-6 max-w-sm w-full md:max-w-md md:w-auto`}>
            <h2 className="text-2xl font-futura font-bold text-gray-800 text-left mb-6 mt-34">
              {step === 1 ? "INICIA SESIÓN" : "VERIFICAR 2FA"}
            </h2>
            {step === 2 && (
              <p className="mb-9">
                Ingresa el codigo de 6 dígitos que aparece en tu app de
                autenticacion{" "}
              </p>
            )}
            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <>
                  <div className="mb-9">
                    <label
                      className="block font-futura text-left text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      E-mail
                    </label>
                    <input
                      className="relative font-futura border-[0.5px] border-gray-300 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Ingresa tu e-mail"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="absolute text-red-500 text-xs italic">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="mb-9">
                    <label
                      className="font-futura block text-left text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Contraseña
                    </label>
                    <input
                      className=" relative font-futura border-[0.5px] border-gray-300 appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Ingresa tu password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <p className="absolute text-red-500 text-xs italic mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  {/* Remember me checkbox */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                      <input
                        className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.25rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-gray-700 checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-gray-700 checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
                        type="checkbox"
                        checked={formData.remember}
                        onChange={handleCheckboxChange}
                        id="remember"
                      />
                      <label
                        className="inline-block ps-[0.15rem] hover:cursor-pointer text-gray-700 font-futura"
                        htmlFor="remember"
                      >
                        Remember me
                      </label>
                    </div>
                    {/* Forgot password link */}
                    <Link
                      href="/forgotPassword"
                      className="text-gray-700 px-4 focus:outline-none dark:text-primary-400 font-futura hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <button
                    className="font-futura bg-[#2B4168] hover:bg-[#1e2a44] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
                    type="submit"
                  >
                    Inicia Sesión
                  </button>
                </>
              ) : (
                <>
                  {/* Formulario de Verificación 2FA */}
                  <div className="mb-9 flex gap-2 items-center justify-center">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        ref={(el) => (inputsRef.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={otp[index]}
                        onChange={(e) => handleChange(e, index)}
                        className="w-12 h-12 text-center border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      />
                    ))}

                    {/* <label
                      className="block font-futura text-left text-gray-700 text-sm font-bold mb-2"
                      htmlFor="mfa"
                    >
                      Código 2FA
                    </label>
                    <input
                      className="relative font-futura border-[0.5px] border-gray-300 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent"
                      id="mfa"
                      name="mfa"
                      type="text"
                      placeholder="Ingresa tu código 2FA"
                      value={formData.mfa}
                      onChange={handleChange}
                    />
                      {errors.password && (
                      <p className="absolute text-red-500 text-xs italic mt-1">
                        {errors.mfa}
                      </p>
                    )} */}
                  </div>
                  <button
                    className="font-futura bg-[#2B4168] hover:bg-[#1e2a44] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
                    type="submit"
                  >
                    Verificar Código
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
