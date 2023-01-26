import {
  deleteObject,
  uploadBytes,
  ref,
  getDownloadURL,
} from "firebase/storage";

import { storage } from "./firebase";

// * replacing profile photo in firebase storage
export const changeProfilePhoto = async (
  uid,
  existingPhotoUrl,
  newProfilePhoto
) => {
  // * delete existing photo and upload new photo
  await deleteObject(ref(storage, existingPhotoUrl));
  // * uploading new profile photo to firebase storage
  return uploadProfilePhoto(uid, newProfilePhoto);
};

// * uploading profile photo to firebase storage
export const uploadProfilePhoto = async (uid, profilePhoto) => {
  // * uploading new profile photo to firebase storage
  const fileUploadResponse = await uploadBytes(ref(storage, uid), profilePhoto);
  // * getting download url of profile photo
  return getDownloadURL(fileUploadResponse.ref);
};
