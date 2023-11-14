"use client";

import directus from "@/lib/directus";
import React, { FormEvent, useEffect, useState } from "react";

const InputFormArchived = ({
  name,
  email,
  id,
  submitButton,
  message,
  hoverTitle,
}: {
  name: string;
  email: string;
  id: string;
  submitButton: string;
  message: string;
  hoverTitle: string;
}) => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const submitHandler = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await directus.items("request_archived").createOne({
        name: inputName,
        email: inputEmail,
        requested_archived: id,
        status: "pending",
      });
      setIsLoading(false);
      setShowSuccessMessage(true);
      setInputName("");
      setInputEmail("");
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 10000);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Clear the success message after 3 seconds
    if (showSuccessMessage) {
      const timeoutId = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 10000);

      // Clear the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [showSuccessMessage]);

  return (
    <>
      {showSuccessMessage ? (
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{message}</span>
        </div>
      ) : (
        <div>
          <h3 className=" mb-4 text-lg text-white text-center">{hoverTitle}</h3>
          <form
            className=" flex flex-col gap-4 justify-center items-center"
            onSubmit={submitHandler}
          >
            <input
              required
              type="text"
              placeholder={name}
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
              }}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              required
              type="email"
              placeholder={email}
              value={inputEmail}
              onChange={(e) => {
                setInputEmail(e.target.value);
              }}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              className=" w-fit self-center btn font-normal px-4 py-2 rounded-lg"
              type="submit"
              value={submitButton}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default InputFormArchived;
