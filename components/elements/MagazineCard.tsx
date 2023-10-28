import { Magazine } from "@/types/collection";
import { shimmer, toBase64 } from "@/utils/shimmer";
import Image from "next/image";
import React from "react";

const MagazineCard = ({
  magazine,
  collectMagazine,
  number,
  inputName,
  inputEmail,
  submitButton,
  locale,
}: {
  magazine: Magazine;
  collectMagazine: string;
  number: string;
  inputName: string;
  inputEmail: string;
  submitButton: string;
  locale: string;
}) => {
  const getLocalizedPageNumber = (pageNumber: number, locale: string) => {
    const numbersInEnglish = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const numbersInBengali = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    if (locale === "en") {
      return numbersInEnglish[pageNumber - 1] || pageNumber.toString();
    } else if (locale === "bn") {
      return numbersInBengali[pageNumber - 1] || pageNumber.toString();
    } else {
      return pageNumber.toString();
    }
  };

  const descriptionText = magazine.description;

  // Split the text by '\n' and create an array of lines
  const lines = descriptionText.split("\n");

  // Create a separate JSX element for each line
  const formattedDescription = lines.map((line, index) => (
    <p key={index} className="text-lg">
      {line}
    </p>
  ));

  return (
    <div className=" flex flex-row gap-10 items-center">
      <Image
        width={365}
        height={480}
        className="flex-1 max-w-[365px]"
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${magazine.image}?key=optimized`}
        alt="image"
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(365, 480))}`}
      />
      <div className="flex-1 flex flex-col gap-2">
        <h2 className=" text-5xl font-semibold">
          {number} {getLocalizedPageNumber(magazine.number, locale)}
        </h2>
        <h2 className=" text-3xl">{magazine.title}</h2>
        <div>{formattedDescription}</div>
        <p className=" text-xl">{collectMagazine}</p>
        <form className=" flex flex-col gap-5" action="">
          <input
            type="text"
            placeholder={inputName}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            placeholder={inputEmail}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            className=" btn text-secondary hover:text-accent bg-accent w-fit"
            type="submit"
            value={submitButton}
          />
        </form>
      </div>
    </div>
  );
};

export default MagazineCard;
