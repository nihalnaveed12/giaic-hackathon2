import { defineType } from "sanity";
export default defineType({
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'user',
        title: 'User',
        type: 'object',
        fields: [
          { name: 'email', title: 'Email', type: 'string' },
          { name: 'phone', title: 'Phone', type: 'string' },
          { name: 'firstName', title: 'First Name', type: 'string' },
          { name: 'lastName', title: 'Last Name', type: 'string' },
          { name: 'address', title: 'Address', type: 'string' },
          { name: 'city', title: 'City', type: 'string' },
          { name: 'state', title: 'State', type: 'string' },
          { name: 'postalCode', title: 'Postal Code', type: 'string' },
        ],
      },
      {
        name: 'products',
        title: 'Products',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'product',
                title: 'Product',
                type: 'reference',
                to: [{ type: 'product' }],
              },
              {
                name: 'name',
                title: 'Product Name',
                type: 'string',
              },
              {
                name: 'price',
                title: 'Product Price',
                type: 'number',
              },
              {
                name: 'quantity',
                title: 'Quantity',
                type: 'number',
              },
            ],
          },
        ],
      },
      {
        name: 'total',
        title: 'Total Amount',
        type: 'number',
      },
      {
        name: 'status',
        title: 'Order Status',
        type: 'string',
        options: {
          list: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
        },
        initialValue: 'Pending',
      },
      {
        name: 'shippingMethod',
        title: 'Shipping Method',
        type: 'string',
      },
      {
        name: 'paymentMethod',
        title: 'Payment Method',
        type: 'string',
        options: {
          list: ['cod', 'payOnline'],
        },
      },
      {
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime',
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm',
          timeStep: 1,
        },
        initialValue: new Date().toISOString(),
      },
      {
        name: 'paymentInfo',
        title: 'Payment Information',
        type: 'object',
        fields: [
          { name: 'paymentId', title: 'Payment ID', type: 'string' },
          { name: 'paymentStatus', title: 'Payment Status', type: 'string' },
          { name: 'paymentAmount', title: 'Payment Amount', type: 'number' },
          { name: 'paymentCurrency', title: 'Payment Currency', type: 'string' },
          { name: 'paymentDate', title: 'Payment Date', type: 'datetime' },
        ],
      },
    ],
  });