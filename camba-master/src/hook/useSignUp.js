import { useFormik } from "formik";
import * as Yup from "yup";

export const useSignUp = (handleSubmit) => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Correo inválido").required("Campo requerido"),

    password: Yup.string()
      .min(5, "Mínimo 5 Caracteres")
      .max(20, "Máximo 20 Caracteres")
      // Eliminando la validación de la contraseña que requiere una letra mayúscula, una letra minúscula, un número y un carácter especial
      .required("Campo requerido"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return {
    formik,
  };
};