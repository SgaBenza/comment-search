export type Comment = {
  id: number
  postId: number
  name: string
  email: string
  body: string
}
export type CommentResponse = Comment[]

// Types for the response
export interface PaginationLinks {
  first?: string
  prev?: string
  next?: string
  last?: string
}

export interface GetDataResponse<T> {
  data: T[]
  pagination: {
    links: PaginationLinks
    totalCount?: number
  }
}
