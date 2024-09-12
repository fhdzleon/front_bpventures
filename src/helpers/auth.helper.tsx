const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const RegisterUser = async (userData: any) => {
  try {
    const response = await fetch(`${apiURL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      return response.json();
    } else {
      const errorData = await response.json();
      // alert(errorData.message || "User creation error");

      throw new Error(errorData.message || "User creation error");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const GetUserById = async (userId: any) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("User not found");
    }
    return response.json();
  } catch (error: any) {
    console.log(error);
  }
};

export const UpdateUser = async (userData: any, userId: string) => {
  try {
    const response = await fetch(`${apiURL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      return response.json();
    } else {
      const errorData = await response.json();
      alert(errorData.message || "User update error");
      throw new Error(errorData.message || "User update error");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const LoginUser = async (userData: any) => {
  try {
    const response = await fetch(`${apiURL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      return response.json();
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Error logging in");
      throw new Error(errorData.message || "Error logging in");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logoutUser = () => {
  localStorage.removeItem("userSession");
};

export const GetPermisos = async (DeliverableId: number) => {
  try {
    const response = await fetch(`${apiURL}/deliverables/permision/${DeliverableId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return response.json();
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Error in permissions");
      throw new Error(errorData.message || "Error in permission");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const UpdatePermission = async (permission: any, Deliverable: number) => {
  try {
    const response = await fetch(`${apiURL}/deliverables/permision/{deliverableId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(permission),
    });

    if (response.ok) {
      return response.json();
    } else {
      const errorData = await response.json();
      alert(errorData.message || "User update error");
      throw new Error(errorData.message || "User update error");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

// src/helpers/auth.helper.tsx
export const getAllInvoices = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log(await response.json)
      return response.json();
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Error in Invoices");
      throw new Error(errorData.message || "Error in Invoices");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserById = async (userId: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log(await response.json())
      return response.json();
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Error in Invoices");
      throw new Error(errorData.message || "Error in Invoices");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
