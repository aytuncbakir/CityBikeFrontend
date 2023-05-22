import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileImageDefault from '../profile/ProfileImageDefault';
import { postBlog, postBlogAttachment } from '../../api/apiCalls';
import { useApiProgress } from '../../shared/ApiProgress';
import Spinner from '../Spinner';
import Input from '../Input';
import AutoImageUpload from '../AutoImageUpload';

const BlogSubmit = () => {
  const { image } = useSelector((store) => ({ image: store.image }));
  const [focused, setFocused] = useState(false);
  const [blog, setBlog] = useState('');
  const [errors, setErrors] = useState({});
  const [newImage, setNewImage] = useState();
  const [attachmentId, setAttachmentId] = useState();

  useEffect(() => {
    if (!focused) {
      setBlog('');
      setNewImage();
      setAttachmentId();
      setErrors({});
    }
  }, [focused]);

  useEffect(() => {
    setErrors({});
  }, [blog]);

  const pendingApiCall = useApiProgress('post', '/api/1.0/blogs', true);
  const pendingFileUpload = useApiProgress(
    'post',
    '/api/1.0/blog-attachments',
    true
  );

  const onClickPostBlog = async () => {
    const body = {
      content: blog,
      attachmentId: attachmentId,
    };
    try {
      await postBlog(body);
      setFocused(false);
    } catch (error) {
      if (error.response.data.validationErrors)
        setErrors(error.response.data.validationErrors);
    }
  };

  const onChangeFile = (e) => {
    if (e.target.files.length < 1) {
      return;
    }
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
      uploadFile(file);
    };
    fileReader.readAsDataURL(file);
  };

  const uploadFile = async (file) => {
    const attachment = new FormData();
    attachment.append('file', file);

    const response = await postBlogAttachment(attachment);
    setAttachmentId(response.data.id);
  };

  return (
    <div className="card p-1 flex-row">
      <ProfileImageDefault
        image={image}
        width="32"
        height="32"
        className="rounded-circle me-2"
      />
      <div className="flex-fill">
        <textarea
          className={
            errors.content ? 'form-control is-invalid' : 'form-control'
          }
          rows={focused ? '3' : '1'}
          onFocus={() => setFocused(true)}
          onChange={(e) => setBlog(e.target.value)}
          value={blog}
        />
        <div className="invalid-feedback">{errors.content}</div>
        {focused && (
          <>
            {!newImage && <Input type="file" onChange={onChangeFile} />}
            {newImage && (
              <AutoImageUpload image={newImage} uploading={pendingFileUpload} />
            )}
            <div className="text-end mt-1">
              <button
                className="btn btn-success d-inline-flex text-center mt-2 loatt-end"
                onClick={onClickPostBlog}
                disabled={pendingApiCall || pendingFileUpload}
              >
                {pendingApiCall ? (
                  <Spinner small={true} />
                ) : (
                  <i className="material-icons">send</i>
                )}
                Send
              </button>
              <button
                className="btn btn-danger d-inline-flex text-center ms-1 mt-2 loatt-end"
                onClick={() => setFocused(false)}
                disabled={pendingApiCall || pendingFileUpload}
              >
                <i className="material-icons">cancel</i>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogSubmit;
