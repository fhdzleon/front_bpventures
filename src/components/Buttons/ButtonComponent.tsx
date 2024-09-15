"use client";
const ButtonComponent = ({ text }: { text: string }) => {
  return <button className="bg-[#2B4168] text-white py-2 px-4 rounded-full shadow-md hover:bg-[#4a9c80] transition duration-300 flex items-center">{text}</button>;
};

export default ButtonComponent;
