import { useState } from "react";
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js'


export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length < 7){
      const promises = []; 

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
    }
  }
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name; // Added "+" to concatenate the timestamp
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        
      )
        }
      );
    };
  }
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>CreateListing</h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className="flex flex-col gap-4 flex-1">
          <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required />
          <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required />
          <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' required />
          <div className='flex gap-6 flex-wrap'>
            {/* ... other input fields ... */}
          </div>
          <div className='flex flex-wrap gap-6'>
            {/* ... other input fields ... */}
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>Images:
            <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
            <div className='flex p-3 gap-4'>
              <input onChange={(e) => setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type='file' id='images' accept='image/*' multiple />
              <button type='button' onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
            </div>
          </p>
          <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
        </div>
      </form>
    </main>
  );
}