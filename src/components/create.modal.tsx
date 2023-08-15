import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from "swr"

interface IProps {
  show: boolean;
  handleClose: () => void;
}

const CreateModal = (props: IProps) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const handleClose = () => {
    props.handleClose()
  }
  const handleClickCreate = () => {
    let isValidate = true;

    let objValidate = { title, author, content }
    for (let i = 0; i < Object.keys(objValidate).length; i++) {
      if (!Object.values(objValidate)[i]) {
        toast(`Missing ${Object.keys(objValidate)[i]}`);
        isValidate = false
        break;
      }
    }
    if (isValidate) {
      fetch('http://localhost:8000/blogs', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title: title, author: author, content: content }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setTitle('');
            setAuthor('');
            setContent('');
            handleClose();
            toast.success('Create Blog Success');
            mutate('http://localhost:8000/blogs');
          }
        })
        .catch((error) => {
          console.error(error);
        });

    }

  }
  return (
    <div>
      <Modal show={props.show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Create New Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)}
                type="text" className="form-control" id="title" placeholder='...' />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">Author</label>
              <input value={author} onChange={(e) => setAuthor(e.target.value)}
                type="text" className="form-control" id="author" placeholder='...' />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)}
                className="form-control" id="content" placeholder='...' />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleClickCreate()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  )
}


export default CreateModal;

