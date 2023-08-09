'use client'

import AppTable from "@/components/app.table";
import useSWR from "swr";

export default function Home() {
  const fetcher = (url: string) => fetch(url).then(r => r.json())
  const { data, error } = useSWR(
    'http://localhost:8000/blogs',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    });
  console.log('check data', data)

  return (
    <div>
      <AppTable />
    </div>
  )
}


