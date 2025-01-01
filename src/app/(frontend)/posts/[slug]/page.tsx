import { sanityFetch } from "@/sanity/lib/live"
import { POST_QUERY } from '@/sanity/lib/queries'
import { Post } from '@/components/Post'
import CommentSection from '@/components/CommentSection'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: { slug: string }
}) {
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: { slug: params.slug }
  })

  if (!post) {
    notFound()
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Post {...post} />
      
      {/* Comments Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <CommentSection postId={post._id} comments={post.comments || []} />
      </section>
    </main>
  )
}
