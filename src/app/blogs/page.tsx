'use client'

import AppTable from "@/components/app.table";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import ModalCreate from "@/components/create.modal";
import { useState } from 'react';



const page = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fetcher = (url: string) => fetch(url).then(r => r.json())
  const { data, error, isLoading } = useSWR(
    'http://localhost:8000/blogs',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    });
  if (isLoading) {
    return (
      <div>IsLoading</div>
    )
  }
  if (error) {
    return (
      <div>Error fetch data</div>
    )
  }
  return (
    <div className="container">
      <div className="header-blog d-flex justify-content-between mt-5">
        <p className="fw-bold fs-1">My blogs</p>
        <div className="d-flex align-items-center">
          <Button className="btn-secondary " onClick={handleShow}>Add new</Button>
        </div>
      </div>
      <AppTable
        blogs={data?.sort((a: any, b: any) => b.id - a.id)}
      />
      <ModalCreate
        show={show}
        handleClose={handleClose}
      />
    </div>
  )
}
export default page;