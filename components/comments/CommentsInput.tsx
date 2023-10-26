"use client";
import directus from "@/lib/directus";
import React, { FormEvent, useState } from "react";

const CommentsInput = ({
  title,
  descriptionPlaceholder,
  inputName,
  inputEmail,
  submitButton,
  postId,
  postSlug,
}: {
  title: string;
  descriptionPlaceholder: string;
  inputName: string;
  inputEmail: string;
  submitButton: string;
  postId: string;
  postSlug: string;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await directus.items("comments").createOne({
        name,
        email,
        description,
        post: postId,
        status: "archived",
        post_slug: postSlug,
      });
      setIsLoading(false);
      setName("");
      setEmail("");
      setDescription("");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className=" flex-1 ">
      <h3 className=" text-xl font-bold mb-4">{title}</h3>
      <form
        name="description"
        className="flex flex-col gap-4"
        onSubmit={submitHandler}
      >
        <textarea
          className="textarea textarea-bordered w-full"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder={descriptionPlaceholder}
        ></textarea>
        <input
          type="text"
          placeholder={inputName}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="input input-bordered w-full"
        />
        <input
          type="email"
          placeholder={inputEmail}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="input input-bordered w-full"
        />
        <input
          className=" btn bg-red-700 text-white w-fit"
          type="submit"
          value={submitButton}
        />
      </form>
    </div>
  );
};

export default CommentsInput;
