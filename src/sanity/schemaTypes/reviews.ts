import { defineType } from "sanity"

// sanity/schemas/review.js
export default defineType({
    name: 'review',
    type: 'document',
    title: 'Review',
    fields: [
      {
        name: 'product',
        type: 'reference',
        to: [{ type: 'product' }], // Product ke saath reference
        title: 'Product',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'userName',
        type: 'string',
        title: 'User Name',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'rating',
        type: 'number',
        title: 'Rating',
        validation: (Rule) => Rule.required().min(1).max(5), // Rating 1 se 5 ke beech mein hi ho sakti hai
      },
      {
        name: 'comment',
        type: 'text',
        title: 'Comment',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'date',
        type: 'datetime',
        title: 'Date',
        initialValue: new Date().toISOString(), // Automatically set current date
      },
    ],
  });