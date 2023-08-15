import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { mutate } from "swr"

interface IProps {
  showModalUpdate: boolean;
  handleCloseModalUpdate: () => void;
  currentBlogUpdate: IBlog | null
}

const UpdateModal = (props: IProps) => {
  const { currentBlogUpdate } = props;
  const [id, setId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const handleCloseModalUpdate = () => {
    props.handleCloseModalUpdate()
  }
  useEffect(() => {
    if (currentBlogUpdate) {
      setId(currentBlogUpdate?.id)
      setTitle(currentBlogUpdate?.title)
      setAuthor(currentBlogUpdate?.author)
      setContent(currentBlogUpdate?.content);
    }
  }, [currentBlogUpdate])
  const handleClickUpdate = () => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ title: title, author: author, content: content }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          handleCloseModalUpdate();
          toast.success('Update Blog Success');
          mutate('http://localhost:8000/blogs');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div>
      <Modal show={props.showModalUpdate} onHide={handleCloseModalUpdate} size='lg'>
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
          <Button variant="warning" onClick={() => handleClickUpdate()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  )
}


export default UpdateModal;

