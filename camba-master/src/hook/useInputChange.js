// useInputChange.js
const useInputChange = (formik, fieldName) => {
  const handleChange = (event) => {
    formik.setFieldValue(fieldName, event.target.value);
  };

  return handleChange;
};

export default useInputChange;
