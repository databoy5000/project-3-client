import React from 'react'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

function ImageUpload({ onUpload }) {
  const [image, setImage] = React.useState('')

  function handleUpload() {

    window.cloudinary
      .createUploadWidget(
        {
          cloudName: uploadUrl,
          uploadPreset,
          sources: ['local'],
          multiple: false,
        }, (err, result) => {
          if (result.event === 'success') {
            setImage(result.info.secure_url)
            onUpload(result.info.secure_url)
          }
        }
      )
      .open()
  }

  return (
    <>
      {image && <img src={image} alt="uploaded profile"/>}
      {!image && <button onClick={handleUpload} type="button" className="button is-info is-fullwidth">Upload Image</button>}
    </>
  )
}

export default ImageUpload