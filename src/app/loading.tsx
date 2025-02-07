import Loader from "@/components/loader";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.

    return (
        <div className="flex justify-center w-full p-20">
            <Loader />
        </div>
    ) 
  }