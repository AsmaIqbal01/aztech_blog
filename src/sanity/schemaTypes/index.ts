import { type SchemaTypeDefinition } from 'sanity'
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'
import commentType from './commentType'; // Default import

// Define the Sanity schema types array
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,  // Block content type for rich text
    categoryType,      // Category type for organizing posts
    postType,          // Post type for blog posts
    authorType,        // Author type for author data
    commentType,       // Comment type for comment data
  ],
}
