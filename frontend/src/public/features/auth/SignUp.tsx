import React, { useState } from "react";
import { TextField, Button, Grid, styled } from "@mui/material";
import { useAuth } from "../../../AuthContext"; // Asegúrate de que sea la ruta correcta
import { useNavigate } from "react-router-dom";
import { Api } from "@mui/icons-material";
const apiUrl = "http://192.168.0.25";
const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

interface SignUpProps {
  onSubmit?: (data: Record<string, string>) => void; // Optional, in case you want to handle it externally
}

// Función para verificar si el usuario ya existe
const checkUserExists = async (user_name: string, email: string) => {
  try {
    const response = await fetch(`${apiUrl}:8080/Users`);
    if (!response.ok) {
      throw new Error("Error al obtener usuarios");
    }

    const data = await response.json();
    if (!data.success || !Array.isArray(data.users)) {
      throw new Error("Formato de respuesta inesperado");
    }

    const userExists = data.users.some(
      (user: { user_name: string; email: string }) =>
        user.user_name === user_name || user.email === email
    );

    return userExists;
  } catch (error) {
    console.error("Error en checkUserExists:", error);
    throw error;
  }
};

const SignUp: React.FC<SignUpProps> = ({ onSubmit }) => {
  const { login } = useAuth(); // Obtener la función de login del contexto
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    user_name: "",
    country: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    setIsSubmitting(true); // Indicar que el formulario está procesando
    try {
      const userExists = await checkUserExists(signUpData.user_name, signUpData.email);
      if (userExists) {
        alert("El usuario o correo ya está registrado. Por favor, usar otro.");
        setIsSubmitting(false);
        return;
      }
  
      const response = await fetch("http://192.168.1.69:8080/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar usuario");
      }
  
      const data = await response.json();
      alert("Usuario registrado con éxito");
      console.log(data);
  
      // Mapea el objeto para cumplir con el tipo `User`
      const userToSave = {
        username: signUpData.user_name,
        email: signUpData.email,
        country: signUpData.country,
        address: signUpData.address,
        password: signUpData.password,
      };
  
      // Guarda el usuario en tu sistema de autenticación
      onSubmit && onSubmit(userToSave); // Si `onSubmit` existe
      setSignUpData({
        user_name: "",
        country: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
      });
    } catch (error: any) {
      alert("Hubo un error: " + error.message);
      console.error(error);
    } finally {
      setIsSubmitting(false); // Terminar el estado de envío
    }
  };
  

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="user_name"
            label="UserName"
            id="username"
            value={signUpData.user_name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            id="email"
            value={signUpData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={signUpData.password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={signUpData.confirmPassword}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="country"
            label="Country"
            id="country"
            value={signUpData.country}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="address"
            label="Address"
            type="address"
            id="address"
            value={signUpData.address}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <SubmitButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Sign Up"}
      </SubmitButton>
    </StyledForm>
  );
};

export default SignUp;
