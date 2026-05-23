import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails(){

const {id}=useParams();

const [product,setProduct]=
useState(null);

useEffect(()=>{

fetch(
"http://localhost:8080/Camera/api/get_products.php"
)

.then(res=>res.json())

.then(data=>{

const found=
data.products.find(
p=>p.id==id
);

setProduct(found);

});

},[id]);


if(!product){

return <h1>Loading...</h1>

}

return(

<div
style={{
padding:"140px 8%"
}}
>

<img
src={product.image_url}
alt=""
style={{
width:"450px",
borderRadius:"30px"
}}

onError={(e)=>{

e.target.src=
"https://placehold.co/500x350?text=No+Image"

}}
/>

<h1>
{product.title}
</h1>

<h2>
${product.price}
</h2>

<p>

{product.description}

</p>

<h3>

Stock:

{
product.quantity
}

</h3>

<button>

Add To Cart

</button>

</div>

)

}

export default ProductDetails;