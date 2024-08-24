"use client";
import { useAuth } from '@/context/AuthContext';
import { UpdateUser } from '@/helpers/auth.helper';
import React, { useState } from 'react';


interface User {
 "email": string;
  "password": string;
  "Names": string;
  "LastName": string;
  "Position": string;
}

const UpdateUserComponent: React.FC = () => {
  const { user, setUser  } = useAuth();

  const [userData, setUserData] = useState<User>({
"email": "",
  "password": "",
  "Names": "",
  "LastName": "",
  "Position": "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   const userId = "03f5136d-eac0-4807-b2d5-43d0f2b09f33";
    try {
        await UpdateUser(userData, userId);
        alert('User registered successfully');
      } catch (error: any) {
        console.error('Error registering user:', error);
      }
    };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div className="w-4/5 max-w-md p-5 bg-white shadow-lg rounded-lg">
        <h2 className="mb-5 text-center">Editar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-2.5 mb-2.5 border border-gray-300 rounded-md"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input 
            className="w-full p-2.5 mb-2.5 border border-gray-300 rounded-md"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required            
          />
          <input 
            className="w-full p-2.5 mb-2.5 border border-gray-300 rounded-md"
            type="text"
            name="Names"
            value={userData.Names}
            onChange={handleInputChange}
            placeholder="Names"
            required
          />
          <input
            className="w-full p-2.5 mb-2.5 border border-gray-300 rounded-md"
            type="text"
            name="LastName"
            value={userData.LastName}
            onChange={handleInputChange}
            placeholder="LastName"
            required
          />
          <input
            className="w-full p-2.5 mb-2.5 border border-gray-300 rounded-md"
            type="text"
            name="Position"
            value={userData.Position}
            onChange={handleInputChange}
            placeholder="Position"
            required
          />
          <button
            className="w-full p-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-800"
            type="submit"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserComponent;
