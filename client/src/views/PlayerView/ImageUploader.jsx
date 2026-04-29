import React from 'react';
import { imageSelectionHandler } from '../../util/avatarSelectionHandlers';

function ImageUploader({
  setPreviewUrl,
  reference,
  setAvatarSelection,
  _id,
  reset,
}) {
  function onChangeHandler(ev) {
    imageSelectionHandler(ev, setPreviewUrl, setAvatarSelection, _id, reset);
  }

  return (
    <div>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        capture="camera"
        onChange={function (ev) {
          onChangeHandler(ev);
        }}
        ref={reference}
      />
    </div>
  );
}

export default ImageUploader;
