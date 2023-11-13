"use client";
import directus from "@/lib/directus";
import React, { FormEvent, useEffect, useState } from "react";

const CommentsInput = ({
  title,
  descriptionPlaceholder,
  inputName,
  submitButton,
  postId,
  postSlug,
  loadingText,
  message,
}: {
  title: string;
  descriptionPlaceholder: string;
  inputName: string;
  inputEmail: string;
  submitButton: string;
  postId: string;
  postSlug: string;
  loadingText: string;
  message: string;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const submitHandler = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await directus.items("comments").createOne({
        name,
        description,
        post: postId,
        status: "pending",
        post_slug: postSlug,
      });
      setIsLoading(false);
      setName("");
      setDescription("");
      setShowSuccessMessage(true);
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
    <div className=" flex-1 ">
      <h3 className=" text-xl font-bold mb-4">{title}</h3>
      <form
        name="description"
        className="flex flex-col gap-4"
        onSubmit={submitHandler}
      >
        <textarea
          required
          className="textarea textarea-bordered w-full"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder={descriptionPlaceholder}
        ></textarea>
        <input
          required
          type="text"
          placeholder={inputName}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="input input-bordered w-full"
        />
        <input
          className=" btn bg-red-700 text-white font-normal w-fit"
          type="submit"
          value={isLoading ? loadingText : submitButton}
        />

        {showSuccessMessage && (
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
        )}
      </form>
    </div>
  );
};

export default CommentsInput;
