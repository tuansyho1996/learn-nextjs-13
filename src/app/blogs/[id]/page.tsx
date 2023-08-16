'use client'
import { useState } from "react";
import useSWR from "swr";


const page = ({ params }: { params: { id: string } }) => {
  const [blog, setBlog] = useState<IBlog | null>(null)
  const fetcher = (url: string) => fetch(url).then(r => r.json())
  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    });
  if (isLoading) {
    return (
      <div>loading</div>
    )
  }
  return (
    <div className="">
      <div>
        <ul className="list-group">
          <li className="list-group-item">{data.title}</li>
          <li className="list-group-item">{data.author}</li>
          <li className="list-group-item">{data.content}</li>
        </ul>
      </div>
    </div>
  )
}
export default page