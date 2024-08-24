"use client";
import React, { useEffect, useState } from "react";

const BlockUser = () => {
  const [isBlock, setIsBlock] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const handleClick = () => {
    setIsBlock((prevState) => !prevState);
  };

  useEffect(() => {
    if (isMounted) {
      if (isBlock) {
        alert("Bloqueado");
      } else {
        alert("Desbloqueado");
      }
    } else {
      setIsMounted(true);
    }
  }, [isBlock, isMounted]);

  return (
    <div>
      {!isBlock ? (
        <button
          onClick={handleClick}
          className="flex space-x-2 bg-secundary px-4 py-1 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
          <p className="font-futura text-white">Bloquear</p>
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="flex space-x-2 bg-secundary px-4 py-1 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
          <p className="font-futura text-white">Desbloquear</p>
        </button>
      )}
    </div>
  );
};

export default BlockUser;
