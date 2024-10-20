import React from "react"

export interface UserType {
    name: string,
    username: string,
    password: string,
    email: string,
    token: string,
    loggedIn: boolean,
    icon: string
}

export type AppContextType = {
    user: UserType,
    setUser: (user: UserType) => void,
}

export type SeachProps = {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
    OnSearchHandler: (...args: any[]) => void
}

export type UserListItemProp = {
    to: string,
    text: string,
    children: React.ReactNode
}

export type PostCardType = {
    title: string,
    cover: string,
    summary: string,
    author: string,
    date: string,
    likes: string,
    authorProfile: string,
    postID: string
}

export type Editor = {
    content: string,
    setContent: React.Dispatch<React.SetStateAction<string>>
}