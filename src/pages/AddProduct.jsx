import React,{useState} from 'react'
import "../css/addProduct.css"
import NavBar from "../components/NavBar"
import AWS from 'aws-sdk'





function AddProduct() {

const S3_BUCKET ='liveshoper-admin-file-store';
const REGION ='us-east-1';

AWS.config.update({
  accessKeyId: 'AKIA5FTY7Q4YMUO35DOU',
  secretAccessKey: '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'
})

//const ACCESS_KEY ='AKIA5FTY7Q4YMUO35DOU';
//const SECRET_ACCESS_KEY ='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';

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET},
  region: REGION,
})



const [progress , setProgress] = useState(0);
const [selectedFile, setSelectedFile] = useState(null);

const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
}

const uploadFile = (file) => {

    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name
    };

    myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err) => {
            if (err) console.log(err)
        })
}


  return (
    <div className='add-product'>
        <NavBar/>
        <div className='add-product-right-content'>
          <div className='add-product-form'>
          <form>
             <pre>Enter product Id</pre>
             <input type='text' placeholder='enter product id'/>
             <pre>Enter product Name</pre>
             <input type='text' placeholder='Enter product Name'/>
             <pre>Enter product Actual price</pre>
             <input type='text' placeholder='Enter product Actual price'/>
             <pre>Enter product Discount price</pre>
             <input type='text' placeholder='Enter product Discount price'/>
             <pre>Enter product Description</pre>
             <textarea placeholder='Enter description here'></textarea>

          </form>
        <div className='image-upload-div'>
            <input type='file' onChange={handleFileInput}/>
            {
              progress > 0 &&(
                <p className='upload-progress'>file Uploaded  {progress}%</p>
              )
            }
        </div>
        <div onClick={() => uploadFile(selectedFile)} className="submit-btn">Submit</div>
          </div>
        </div>
    </div>
  )
}

export default AddProduct