export type UserType = {
    name: string,
    username: string,
    password: string,
    email: string
}

export type PostType = {
    title: string,
    summary: string,
    content: string,
    cover: string,
    likes: number,
    author: string,
    tags: string[]
}