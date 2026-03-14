declare global {
  interface Window {
    GetCommentBody: (commentId: number) => void
    ReplyComment: (commentId: number, replyTo: string) => void
    QuoteComment: (commentId: number, replyTo: string) => void
    DelComment: (commentId: number, _this: any, parentId: number) => void
    voteComment(
      commentId: number,
      voteType: 'Digg' | 'Bury',
      parentElement: any,
      isAbandoned: boolean,
    )
    currentPostId: number
    blogCommentManager: new () => {
      renderComments: (postId: number) => void
    }
    commentManager: {
      renderComments: (page: number, pageSize: number) => void
    }
  }
}

export {}
