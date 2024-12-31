import { defineQuery } from "next-sanity";

// Query for multiple posts
export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug
}`);

// Query for a single post by slug
export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title, body, mainImage
}`);
