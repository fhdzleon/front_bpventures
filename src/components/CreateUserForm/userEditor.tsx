// import React, { useState } from 'react';

// interface User {
//   id: number;
//   username: string;
//   email: string;
//   role: string;
// }

// const EditUserPage: React.FC = () => {
//   const [user, setUser] = useState<User>({
//     id: 1, // ID del usuario que se está editando (esto debería obtenerse dinámicamente)
//     username: 'john_doe',
//     email: 'john@example.com',
//     role: 'user',
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({ ...prevUser, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Aquí harías la lógica para enviar los datos actualizados al servidor.
//     console.log('Datos de usuario actualizados:', user);
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="w-4/5 max-w-md p-5 bg-white shadow-lg rounded-lg">
//         <h2 className="mb-5 text-center">Editar Usuario</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             className="w-full p-2.5 mb-2.5 border border-gray-300 rounded-md"
//             type="text"
//             name="username"
//             value={user.username}
//             onChange={handleInputChange}
//             placeholder="Username"
//             required
//           />
//           <input
//             className="w-full p-2.5 mb-2.5 border border-gray-300 rounded-md"
//             type="email"
//             name="email"
//             value={user.email}
//             onChange={handleInputChange}
//             placeholder="Email"
//             required
//           />
//           <input
//             className="w-full p-2.5 mb-2.5 border border-gray-300 rounded-md"
//             type="text"
//             name="role"
//             value={user.role}
//             onChange={handleInputChange}
//             placeholder="Role"
//             required
//           />
//           <button
//             className="w-full p-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-800"
//             type="submit"
//           >
//             Guardar Cambios
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditUserPage;
