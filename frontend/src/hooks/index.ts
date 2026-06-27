import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { atom, useSetRecoilState } from "recoil";




export interface Blog {
    "userName": {
        "name": string;
    };
    "content": string;
    "createdAt": string,
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: "Bearer " +  localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }

}

export const userState = atom({
  key: 'TodoList',
  default: "",
});

export const useBlogs = (page: string) => {
    const [user, setuser] = useState("");
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setLoading(true);

        axios.get(`${BACKEND_URL}/api/v1/blog/bulk?page=${page}&limit=5`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            setBlogs(response.data.blogs);
            setuser(response.data.userName.name);
            setTotalPages(response.data.totalPages);
            setLoading(false);
        });
    }, [page]);
    
    const setUserState = useSetRecoilState(userState);
    setUserState(user)
    return {
        user,
        loading,
        totalPages,
        blogs
    }
    
}





