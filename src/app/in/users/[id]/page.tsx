import React from "react";

import UserDetailView from "../../../../components/detailUserList/DetailUserList";
import { FunctionFetch } from "../../../../helpers/fetchUserList";

export interface User {
  id: number;
  email: string;
  Names: string;
  LastName: string;
  Position: string;
  statusId: number;
}

interface IdParams {
  params: {
    id: number;
  };
}

const DetailUser: React.FC<IdParams> = async ({ params }) => {
  const idUser = Number(params.id);

  const users = await FunctionFetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);

  const user = users.find((user: { id: number }) => user.id === idUser);

  return user ? (
    <UserDetailView user={user} />
  ) : (
    <div className="mt-10 flex flex-col justify-center text-center items-center">
      <h1 className="text-3xl font-futura mt-20 justify-center text-center text-amber-400 mb-4">USUARIO NO ENCONTRADO</h1>
      <img src="https://cdn-icons-png.flaticon.com/512/132/132244.png" alt="" className="max-w-sm" />
    </div>
  );
};

export default DetailUser;
