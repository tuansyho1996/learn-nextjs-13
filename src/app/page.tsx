'use client'

import AppTable from "@/components/app.table";
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const fectData = async () => {
      let res = await fetch('http://localhost:8000/blogs');
      let data = await res.json()
      console.log('check res', data)
    }
    fectData();
  }, [])
  return (
    <div>
      <AppTable />
    </div>
  )
}


