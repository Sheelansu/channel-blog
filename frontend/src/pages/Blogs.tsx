import { useState } from "react";
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const [page, setPage] = useState(1);
    const { user, loading, totalPages, blogs } = useBlogs(page.toString());

    const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
        }
    } else {
        pages.push(1);

        if (page > 3) {
        pages.push("...");
        }

        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);

        for (let i = start; i <= end; i++) {
        pages.push(i);
        }

        if (page < totalPages - 2) {
        pages.push("...");
        }

        pages.push(totalPages);
    }

    return pages;
    };

    if (loading) {
        return <div>
            <Appbar userName="_"/> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar userName= {user}/>
        <div  className="flex justify-center">
            <div>
                {blogs.map(blog => <BlogCard
                    key={blog.id}
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
            </div>
        </div>
        <div className="flex justify-center items-center gap-2 my-6">
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-2 rounded bg-gray-200 disabled:opacity-50"
            >
                Prev
            </button>

            {getPageNumbers().map((item, index) =>
                item === "..." ? (
                <span key={index} className="px-2">
                    ...
                </span>
                ) : (
                <button
                    key={item}
                    onClick={() => setPage(Number(item))}
                    className={`px-3 py-2 rounded ${
                    page === item
                        ? "bg-gray-600 text-white"
                        : "bg-gray-200"
                    }`}
                >
                    {item}
                </button>
                )
            )}

            <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-2 rounded bg-gray-200 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    </div>

    
}

