import { defineType , defineField } from 'sanity';

export default defineType({
  name: 'discountedItems',
  title: 'Discounted Items',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Category',
      to:[{type: 'category'}]
    }),
    defineField({
      name: "content",
      type: "text",
      title: "Short Description",
      validation: (Rule) => Rule.max(200)
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
  ],
});