import React from "react";

const InputFormArchived = ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  return (
    <div className=" flex flex-col gap-4 justify-center items-center">
      <input
        type="text"
        placeholder={name}
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        placeholder={email}
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  );
};

export default InputFormArchived;
