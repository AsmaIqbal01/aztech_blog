// /schemas/commentType.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'comment',
  type: 'document',
  title: 'Comment',
  fields: [
    defineField({
      name: 'text',
      type: 'text',
      title: 'Comment Text',
      validation: (Rule) => Rule.required().min(2).max(500),
    }),
    defineField({
      name: 'author',
      type: 'string',
      title: 'Author Name',
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Author Email',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'post',
      type: 'reference',
      title: 'Related Post',
      to: [{ type: 'post' }],
    }),
    defineField({
      name: 'approved',
      type: 'boolean',
      title: 'Approved',
      description: 'Approve or hide this comment',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'text',
      date: 'createdAt',
    },
    prepare(selection) {
      const { title, subtitle, date } = selection
      return {
        title,
        subtitle: subtitle ? `${subtitle.substring(0, 30)}...` : 'No text',
        date,
      }
    },
  },
})
