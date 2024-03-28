import { useState } from "react";
import { supabase } from "./Client";
import { Footer } from "./Footer";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormTextField from "./FormTextField";

function SignUp() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const validationSchema = Yup.object().shape({
    fname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Enter your First name"),
    lname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Enter your Last name"),
    email: Yup.string().required("Enter your E-mail"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            fname: formData.fname,
            lname: formData.lname,
          },
        },
      });
      if (error) {
        throw error;
      }
      alert("Check Your email for verification");
    } catch (error) {
      alert(error.message);
    }
  }

  const validate = (
    values,
    props /* only available when using withFormik */
  ) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    //...

    return errors;
  };

  return (
    <>
      <div>
        <Formik
          initialValues={{
            fname: "",
            lname: "",
            email: "",
            address: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting, values, setFieldValue, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-black mb-5 mt-5 ml-5">
                Create your account
              </h1>
              <FormTextField
                type="fname"
                name="fname"
                placeholder="First Name"
                styling="text-sm sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full sm:w-1/2 lg:w-1/4 p-2.5 text-black"
              />
              <FormTextField
                type="lname"
                name="lname"
                placeholder="Last Name"
                styling="text-sm sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full sm:w-1/2 lg:w-1/4 p-2.5 text-black"
              />

              <FormTextField
                type="email"
                name="email"
                placeholder="E-mail"
                validate={validate}
                styling="text-sm sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full sm:w-1/2 lg:w-1/4 p-2.5 text-black"
              />

              <FormTextField
                type="password"
                name="psw"
                placeholder="Password"
                styling="text-sm sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full sm:w-1/2 lg:w-1/4 p-2.5 text-black"
              />
            </Form>
          )}
        </Formik>
        <button
          onClick={handleSubmit}
          className=" mt-10 bg-black hover:bg-white text-white font-semibold hover:text-black py-2 px-24 border border-black hover:border-black rounded mb-10 ml-5"
        >
          CREATE ACCOUNT
        </button>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
