'use client'

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import ModalUpdate from './update.modal';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import DeleteModal from './delete.modal';


interface Iprops {
  blogs: IBlog[]
}

const AppTable = (props: Iprops) => {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [currentBlogUpdate, setCurrentBlogUpdate] = useState<IBlog | null>(null);
  const handleCloseModalUpdate = () => {
    setShowModalUpdate(false);
  }
  const handleOpenModalUpdate = (item: IBlog) => {
    setCurrentBlogUpdate(item)
    setShowModalUpdate(true)
  }
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [currentBlogComfirmDelete, setCurrentBlogComfirmDelete] = useState<number | null>(null);
  const handleCloseModalDelete = () => {
    setShowModalDelete(false)
  }
  const handleClickDelete = (id: number) => {
    console.log('check', id)
    setCurrentBlogComfirmDelete(id)
    setShowModalDelete(true)
  }
  return (
    <div>
      <Container className='my-5'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              props.blogs.map(item => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>
                      <Button className='btn btn-primary me-2'>
                        <Link href={`/blogs/${item.id}`}>View</Link>
                      </Button>
                      <Button className='btn btn-warning me-2' onClick={() => handleOpenModalUpdate(item)}>Edit</Button>
                      <Button className='btn btn-danger me-2' onClick={() => handleClickDelete(item.id)} >Delete</Button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
        <ModalUpdate
          showModalUpdate={showModalUpdate}
          handleCloseModalUpdate={handleCloseModalUpdate}
          currentBlogUpdate={currentBlogUpdate}

        />
        <DeleteModal
          showModalDelete={showModalDelete}
          handleCloseModalDelete={handleCloseModalDelete}
          currentBlogComfirmDelete={currentBlogComfirmDelete}
        />
      </Container>
    </div>
  )
}
export default AppTable;