'use client'

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import ModalUpdate from './update.modal';
import { useState } from 'react';


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
                      <Button className='btn btn-primary me-2'>View</Button>
                      <Button className='btn btn-warning me-2' onClick={() => handleOpenModalUpdate(item)}>Edit</Button>
                      <Button className='btn btn-danger me-2'>Delete</Button>
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
      </Container>
    </div>
  )
}
export default AppTable;