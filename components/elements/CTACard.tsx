/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";

const CTACard = () => {
  return (
    <div className=" px-6 py-10 rounded-md bg-slate-100 relative overflow-hidden">
      {/* Overlay  */}
      <div className=" absolute inset-0 bg-gradient-to-br from-white/95 via-white/70 to-white/30 z-10 "></div>
      {/* Image  */}
      <Image
        fill
        alt="CTA Image"
        className="object-center object-cover"
        src="https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ix"
      />
      <div className=" relative z-20">
        <div className=" text-lg font-medium">#exploretheworld</div>
        <h3 className="mt-3 text-4xl font-semibold">
          Explore the world with Me!{" "}
        </h3>
        <p className=" max-w-lg mt-2 text-lg">
          Explore the world with me! I'm traveling around the world. I've
          visited most of the great cities of America and currently I'm
          traveling in Bangladesh. Join me!
        </p>
        <form className=" mt-6 flex items-center gap-2 w-full" action="">
          <input
            className=" bg-white/80 px-3 py-2 placeholder:text-sm rounded-md outline-none focus:ring-2 ring-neutral-600 w-full md:w-auto"
            type="text"
            placeholder="Write your email"
          />
          <button className="px-3 py-2 rounded-md bg-neutral-900 text-neutral-200 whitespace-nowrap">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default CTACard;
