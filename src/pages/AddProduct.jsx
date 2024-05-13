import React,{useState} from 'react'
import "../css/addProduct.css"
import NavBar from "../components/NavBar"
import AWS from 'aws-sdk'
import axios from 'axios';





function AddProduct() {

const S3_BUCKET ='liveshoper-photos-bucket';
const REGION ='ap-south-1';

AWS.config.update({
  accessKeyId: 'AKIA6ODU6OMMA7JITWJG',
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
const [productData, setProductData] = useState({
  productId: -999,
  productName: "",
  productDescription: "",
  price: -999,
  tags: "",
  productImageKey: "",
  subCategoryId: -999,
  categoryIds: [
    0
  ]
})
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
            setProgress(Math.round((evt.loaded / evt.total) * 100));
        })
        .send((err) => {
            if (err) {
                console.log(err);
            } else {
                setProductData((previousData)=>({
                  ...previousData,
                  productImageKey: params.Key
                }))
                const data = {
                  productId: productData.productId,
                  productName: productData.productName,
                  productDescription: productData.productDescription,
                  price: productData.price,
                  tags: "snacks",
                  productImageKey: params.Key,
                  subCategoryId: productData.subCategoryId,
                  categoryIds: productData.categoryIds
                }
                axios.post(`http://65.2.73.20:8080/liveshoper/api/v1/product/save-or-update`,data)
                .then((response)=>{
                  alert(response.status)
                })
                .catch((error)=>{
                  console.log(error)
                  alert(error)
                })
                // Do something with the key, like storing it in state or passing it to another function
            }
        });
}


  return (
    <div className='add-product'>
        <NavBar/>
        <div className='add-product-right-content'>
          <div className='add-product-form'>
          <form>
             
             <pre>Enter Categoery Id</pre>
             <input type='text' value={productData.categoryIds} placeholder='enter Categoery Id' 
             onChange={(e)=>{

              const catgId = parseInt(e.target.value)
              setProductData((previousData)=>({
                ...previousData,
                categoryIds: [catgId]
              }))
             }}/>
             <pre>Enter subCategoery Id</pre>
             <input type='text' placeholder='enter subCategoery Id' 
              onChange={(e)=>{
                const subCategoery = parseInt(e.target.value);
                setProductData((previousData) => ({
                  ...previousData,
                  subCategoryId: subCategoery,
                }))
              }}
             />
             <pre>Enter product Id</pre>
             <input type='text' placeholder='enter product id'
             onChange={(e)=>{
              const productId = parseInt(e.target.value);
              setProductData((previousData)=>({
                ...previousData,
                productId: productId,
              }))
             }}
             />
             <pre>Enter product Name</pre>
             <input type='text' placeholder='Enter product Name'
             onChange={(e)=>{
              
              setProductData((previousData)=>({
                ...previousData,
                productName: e.target.value
              }))
             }}
             />
             <pre>Enter product Actual price</pre>
             <input type='text' placeholder='Enter product Actual price'
             onChange={(e)=>{
              const productPrice = parseFloat(e.target.value);
              setProductData((previousData)=>({
                ...previousData,
                price: productPrice
              }))
             }}
             />
             {/* <pre>Enter product Discount price</pre>
             <input type='text' placeholder='Enter product Discount price'/> */}
             <pre>Enter product Description</pre>
             <textarea placeholder='Enter description here'
             onChange={(e)=>{
              const productDescription = e.target.value;
              setProductData((previousData)=>({
                ...previousData,
                productDescription: productDescription
              }))
             }}
             ></textarea>

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