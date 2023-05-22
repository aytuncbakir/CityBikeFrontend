import React, { useState } from 'react';
import ProfileImageDefault from '../profile/ProfileImageDefault';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deleteBlog } from '../../api/apiCalls';
import Modal from '../Modal';
import { useApiProgress } from '../../shared/ApiProgress';

const BlogView = (props) => {
  const { blog, onDeleteBlog } = props;
  const { id } = blog;
  const { user, content, timestamp, fileAttachment } = blog;
  const { username, displayName, image } = user;
  const loggedInUser = useSelector((store) => store.username);
  const [modelVisible, setModalVisible] = useState(false);
  const { t, i18n } = useTranslation();

  const pendingApiCall = useApiProgress('delete', '/api/1.0/blogs/' + id, true);

  const formatted = format(timestamp, i18n.language);
  const isUserOwnerofBlog = loggedInUser === username;

  const onClickDelete = async () => {
    try {
      try {
        await deleteBlog(id);
        onDeleteBlog(id);
      } catch (error) {}
    } catch (error) {}
  };

  const onClickCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className="card p-3">
        <div className="d-flex ">
          <ProfileImageDefault
            image={image}
            width="32"
            height="32"
            className="rounded-circle m-1"
          />
          <div className="flex-fill m-auto ms-2">
            <Link
              to={`user/${username}`}
              className="text-dark"
              style={{ textDecoration: 'none' }}
            >
              <h6 className="d-inline me-2">
                {displayName}@{username}
              </h6>
              <span>{formatted}</span>
            </Link>
          </div>
          {isUserOwnerofBlog && (
            <button
              className="btn btn-delete-link btn-sm"
              onClick={() => setModalVisible(true)}
            >
              <i className="material-icons">delete_outline</i>
            </button>
          )}
        </div>
        <div className="ps-5">
          <p>{content}</p>
          {fileAttachment && (
            <div>
              {fileAttachment.fileType.startsWith('image') && (
                <img
                  className="img-thumbnail img-fluid"
                  src={'images/attachments/' + fileAttachment.name}
                  alt="blog-attachment"
                />
              )}
              {!fileAttachment.fileType.startsWith('image') && (
                <strong>blog has unknown attachment</strong>
              )}
            </div>
          )}
        </div>
      </div>
      <Modal
        visible={modelVisible}
        onClickCancel={onClickCancel}
        onClickOk={onClickDelete}
        pendingApiCall={pendingApiCall}
        title={t('Delete Blog')}
        message={
          <div>
            <div>
              <strong>{t('Are you sure to delete blog?')}</strong>
            </div>
            <span>{content}</span>
          </div>
        }
      />
    </>
  );
};

export default BlogView;
