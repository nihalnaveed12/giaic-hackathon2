import { defineType , defineField} from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
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

  