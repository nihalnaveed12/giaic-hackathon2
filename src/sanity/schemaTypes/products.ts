import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required().error("Name is required"),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
      description: "Upload an image of the product.",
    }),
    defineField({
      name: "images",
      type: "array",
      title: "Images",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "price",
      type: "string",
      title: "Price",
      validation: (Rule) => Rule.required().error("Price is required"),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      validation: (Rule) =>
        Rule.max(150).warning("Keep the description under 150 characters."),
    }),
    defineField({
      name: "content",
      type: "array",
      title: "Content",
      of: [
        defineArrayMember({
          type: "block",
        }),
      ],
    }),
    defineField({
      name: "additionalInfo",
      type: "array",
      title: "Addional Info",
      of: [
        defineArrayMember({
          type: "block",
        }),
      ],
    }),

    defineField({
      name: "discountPercentage",
      type: "number",
      title: "Discount Percentage",
      validation: (Rule) =>
        Rule.min(0).max(100).warning("Discount must be between 0 and 100."),
    }),
    defineField({
      name: "isFeaturedProduct",
      type: "boolean",
      title: "Is Featured Product",
    }),
    defineField({
      name: "stockLevel",
      type: "number",
      title: "Stock Level",
      validation: (Rule) =>
        Rule.min(0).error("Stock level must be a positive number."),
    }),
    defineField({
      name: "category",
      type: "reference",
      title: "Category",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required().error("Category is required"),
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      description: "Add tags for SEO",
      of: [{ type: "string" }],
    }),
  ],
});
