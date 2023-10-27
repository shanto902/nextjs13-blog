import LoadingAnimation from "@/components/elements/LoadingAnimation";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className=" min-h-[60vh] flex justify-center items-center w-full ">
      <LoadingAnimation />
    </div>
  );
}
