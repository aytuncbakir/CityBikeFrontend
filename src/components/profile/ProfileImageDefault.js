import React from 'react';
import defaultPicture from '../../assets/profile.png';

const ProfileImageDefault = (props) => {
  const { image, tempimage } = props;
  let imageSource = defaultPicture;
  if (image) {
    imageSource = 'images/profiles/' + image;
  }
  return (
    <img
      className="rounded-circle shadow"
      width="32"
      height="32"
      alt={`profile`}
      src={tempimage || imageSource}
      {...props}
      onError={(e) => {
        e.target.src = defaultPicture;
      }}
    />
  );
};

export default ProfileImageDefault;
