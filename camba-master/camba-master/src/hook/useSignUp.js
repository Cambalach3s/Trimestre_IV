import { useFormik } from "formik";
import * as Yup from "yup";

const VALID_PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/;

export const useSignUp = (handleSubmit) => {
  const validationSchema = Yup.object({
    id_usuario: Yup.string().required("Campo requerido"),
    nom_persona: Yup.string().required("Campo requerido"),
    apell_persona: Yup.string().required("Campo requerido"),
    email: Yup.string().email("Correo inválido").required("Campo requerido"),

    password: Yup.string()
      .min(5, "Mínimo 5 Caracteres")
      .max(20, "Máximo 20 Caracteres")
      .matches(
        VALID_PASSWORD_REGEX,
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"
      )
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
