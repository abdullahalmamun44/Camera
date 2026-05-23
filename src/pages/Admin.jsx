import { useEffect, useState } from "react";
import "./Admin.css";

function Admin() {

const emptyForm={

id:null,
title:"",
description:"",
category:"camera",
price:"",
quantity:"",
image_url:""

};

const [form,setForm]=useState(
emptyForm
);

const [products,setProducts]=
useState([]);

const [editing,setEditing]=
useState(false);


const handleChange=(e)=>{

setForm({

...form,
[e.target.name]:
e.target.value

});

};


/* upload image from computer */

const uploadImage=
async(e)=>{

const file=
e.target.files[0];

if(!file) return;

const imageData=
new FormData();

imageData.append(
"image",
file
);

const res=
await fetch(
"http://localhost:8080/Camera/api/upload_image.php",
{
method:"POST",
credentials:"include",
body:imageData
}
);

const data=
await res.json();

alert(
data.message
);

if(
data.status==="success"
){

setForm({

...form,
image_url:
data.image_url

});

}

};


/* load products */

const loadProducts=
async()=>{

const res=
await fetch(
"http://localhost:8080/Camera/api/get_products.php"
);

const data=
await res.json();

if(
data.status==="success"
){

setProducts(
data.products
);

}

};


useEffect(()=>{

loadProducts();

},[]);



const saveProduct=
async()=>{

const url=
editing
?
"http://localhost:8080/Camera/api/update_product.php"
:
"http://localhost:8080/Camera/api/add_product.php";

const res=
await fetch(
url,
{
method:"POST",
credentials:"include",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(
form
)
}
);

const data=
await res.json();

alert(
data.message
);

if(
data.status==="success"
){

setForm(
emptyForm
);

setEditing(false);

loadProducts();

}

};


const editProduct=
(product)=>{

setEditing(true);

setForm(product);

window.scrollTo({
top:0,
behavior:"smooth"
});

};



const deleteProduct=
async(id)=>{

const res=
await fetch(
"http://localhost:8080/Camera/api/delete_product.php",
{
method:"POST",
credentials:"include",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
id
})
}
);

const data=
await res.json();

alert(
data.message
);

loadProducts();

};



return(

<div className="adminPage">

<div className="adminCard">

<h1>

Admin Dashboard

</h1>

<p>

Manage products

</p>

<input
name="title"
placeholder="Product Title"
value={form.title}
onChange={handleChange}
/>

<textarea
name="description"
placeholder="Product Information"
value={form.description}
onChange={handleChange}
/>

<select
name="category"
value={form.category}
onChange={handleChange}
>

<option value="camera">
Camera
</option>

<option value="lens">
Lens
</option>

<option value="accessory">
Accessory
</option>

</select>


<input
name="price"
type="number"
placeholder="Price"
value={form.price}
onChange={handleChange}
/>

<input
name="quantity"
type="number"
placeholder="Quantity"
value={form.quantity}
onChange={handleChange}
/>


<label className="imageLabel">

Select Photo From Computer

</label>

<input
type="file"
accept="image/*"
onChange={uploadImage}
/>


<label className="imageLabel">

Or Paste Internet Image Link

</label>

<input
name="image_url"
placeholder="https://image.com/photo.jpg"
value={form.image_url}
onChange={handleChange}
/>


{form.image_url && (

<img
src={form.image_url}
alt=""
className="previewImage"
/>

)}

<button
onClick={saveProduct}
>

{editing
?
"Update Product"
:
"Add Product"
}

</button>

</div>

</div>

)

}

export default Admin;