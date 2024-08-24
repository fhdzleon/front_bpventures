const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const RegisterUser = async (userData: any) => {
    try {
        const response = await fetch(`${apiURL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            return response.json();
        } else {
            const errorData = await response.json();
            alert(errorData.message || "User creation error");
            throw new Error(errorData.message || "User creation error");

        }
    } catch (error: any) {
        throw new Error(error);
    }
};

export const GetUserById = async (userId: string) => {
    try {
        const response = await fetch(`${apiURL}/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            return response.json();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || "User not found");

        }
        
    } catch (error: any) {
        throw new Error(error);
        
    }
}

export const UpdateUser = async (userData: any, userId: string) => {
    try {
        const response = await fetch(`${apiURL}/users/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
}


export const logoutUser = () => {
    localStorage.removeItem('userSession');
};
