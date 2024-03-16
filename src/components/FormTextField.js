import React from "react";
import { Field, ErrorMessage } from "formik";

export default function FormTextField({
  isRow = false,
  type,
  name,
  placeholder,
  styling = "",
  maxLength,
}) {
  return (
    <div className={`flex ${!isRow ? "flex-col" : ""} ${styling}`}>
      <Field
        type={type}
        name={name}
        maxLength={maxLength}
        placeholder={placeholder}
        className="mt-3 w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
      />
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
  );
}
