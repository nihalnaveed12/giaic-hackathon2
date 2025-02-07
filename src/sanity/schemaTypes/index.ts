import { type SchemaTypeDefinition } from 'sanity'
import category from './category'

import products from './products'
import discountedItems from './discountedItems'
import reviews from './reviews'
import order from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category , products, discountedItems, reviews, order],
}
