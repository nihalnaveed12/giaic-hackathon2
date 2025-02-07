// components/ui/ReviewForm.tsx
import { useState } from "react";
import StarRating from "./ui/Rating";

import { createClient } from "@sanity/client";
import { useToast } from "@/hooks/use-toast";

interface ReviewFormProps {
  productId: string;
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2023-02-03", // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN, // Needed for certain operations like updating content or accessing previewDrafts perspective
});

const ReviewForm = ({ productId }: ReviewFormProps) => {
  const { toast } = useToast();
  const [userName, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName || rating === 0 || !comment) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const review = {
      _type: "review",
      product: {
        _type: "reference",
        _ref: productId,
      },
      userName,
      rating,
      comment,
      date: new Date().toISOString(),
    };

    try {
      await client.create(review);
      toast({
        title: "Success",
        description: "Review submitted successfully",
        variant: "default",
      }); // Refresh reviews
      setName("");
      setRating(0);
      setComment("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive",
      });
      console.error("Error submitting review:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Rating
        </label>
        <StarRating
          rating={rating}
          onRatingChange={setRating}
          editable={true}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <button
        type="submit"
        className="bg-[#FB2E86] text-white rounded-xl px-4 py-2 hover:bg-[#FB2E86]/90"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
