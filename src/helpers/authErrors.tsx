export function ValidateLogin(email: string, password: string) {
  let validationErrors = { email: "", password: "" };

  if (!email) {
    validationErrors.email = "El email es obligatorio.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    validationErrors.email =
      "El correo electrónico no es válido, faltan signos o puntos";
  }

  if (!password) {
    validationErrors.password = "La contraseña es obligatoria.";
  } else if (password.length < 6) {
    validationErrors.password =
      "La contraseña debe tener al menos 6 caracteres.";

    // } else if ( !/(?=.*[a-z])(?=.*)(?=.*\d)(?=.*[@$!%*?&])\d@$!%*?&]{6,}$/.test(password) ) {
    //     validationErrors.password = 'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial.';
  }
  return validationErrors;
}
