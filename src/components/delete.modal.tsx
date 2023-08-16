import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { mutate } from 'swr';


interface IProps {
  showModalDelete: boolean,
  handleCloseModalDelete: () => void,
  currentBlogComfirmDelete: number | null
}

const DeleteModal = (props: IProps) => {

  let { showModalDelete, currentBlogComfirmDelete, handleCloseModalDelete } = props

  const handleClickYesDeleteBlog = () => {
    fetch(`http://localhost:8000/blogs/${currentBlogComfirmDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((res) => {
        toast.success('Delete Blog Success')
        handleCloseModalDelete();
        mutate('http://localhost:8000/blogs');
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <>
      <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Comfirm Delete Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>You sure delete blog?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalDelete}>
            No
          </Button>
          <Button variant="primary" onClick={() => handleClickYesDeleteBlog()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteModal;



