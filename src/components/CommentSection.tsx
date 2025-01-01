'use client'

import { useState } from 'react'
import { createClient } from '@sanity/client'
import { useRouter } from 'next/navigation'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-06-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

interface Comment {
  _id: string
  text: string
  author: string
  createdAt: string
}

interface CommentSectionProps {
  postId: string
  comments: Comment[]
}

export default function CommentSection({ postId, comments: initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState({ author: '', text: '', email: '' })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Add a new comment
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const createdComment = await client.create({
        _type: 'comment',
        text: newComment.text,
        author: newComment.author,
        email: newComment.email,
        post: { _type: 'reference', _ref: postId },
        createdAt: new Date().toISOString(),
        approved: false,
      })
      setComments([...comments, { ...createdComment, _id: createdComment._id }])
      setNewComment({ author: '', text: '', email: '' })
    } catch (error) {
      console.error('Error submitting comment:', error)
    } finally {
      setIsLoading(false)
      router.refresh()
    }
  }

  return (
    <div className="p-6 border rounded-md shadow-md bg-white mt-6">
      {/* Display Comments */}
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="mb-4 border-b pb-2">
            <p className="font-medium">{comment.author}</p>
            <p className="text-gray-700">{comment.text}</p>
            <p className="text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
      )}

      {/* Add New Comment */}
      <form onSubmit={handleSubmit} className="mt-6">
        <input
          type="text"
          placeholder="Your Name"
          value={newComment.author}
          onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={newComment.email}
          onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          placeholder="Your Comment"
          value={newComment.text}
          onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
