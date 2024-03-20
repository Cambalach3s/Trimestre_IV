import { useFormik } from "formik";
import * as Yup from "yup";

export const useSignUp = (handleSubmit) => {
  const validationSchema = Yup.object({
    id_usuario: Yup.string().required("Campo requerido"),
    nom_persona: Yup.string().required("Campo requerido"),
    apell_persona: Yup.string().required("Campo requerido"),
    email: Yup.string().email("Correo inválido").required("Campo requerido"),

    password: Yup.string()
      .min(5, "Mínimo 5 Caracteres")
      .max(20, "Máximo 20 Caracteres")
      // Eliminando la validación de la contraseña que requiere una letra mayúscula, una letra minúscula, un número y un carácter especial
      .required("Campo requerido"),
  });

  const initialValues = {
    id_usuario: "",
    nom_persona: "",
    apell_persona: "",
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