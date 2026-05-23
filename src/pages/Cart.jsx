import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {

const [products,setProducts]=useState([]);

useEffect(()=>{

loadCart();

},[]);

const loadCart=async()=>{

try{

const res=await fetch(
"http://localhost:8080/Camera/api/get_cart.php",
{
credentials:"include"
}
);

const data=await res.json();

if(data.status==="success"){

setProducts(data.products);

}

}catch(error){

console.log(error);

}

};


const total=products.reduce(

(sum,item)=>

sum+
(
Number(item.price)
*
Number(item.cart_quantity)
),

0

);


return(

<div className="cartPage">

<h1>

Shopping Cart

</h1>

{

products.length===0

?

<div className="emptyCart">

No Products In Cart

</div>

:

<>

{

products.map(item=>(

<div
className="cartItem"
key={item.id}
>

<img
src={item.image_url}
alt={item.title}
onError={(e)=>{

e.target.src=
"https://placehold.co/500x350?text=No+Image"

}}
/>

<div className="cartInfo">

<h2>

{item.title}

</h2>

<h3>

Price: ${item.price}

</h3>

<h4>

Quantity: {item.cart_quantity}

</h4>

<h4>

Subtotal:
$
{
Number(item.price)
*
Number(item.cart_quantity)
}

</h4>

</div>

</div>

))

}

<div className="cartBottom">

<h2>

Total: ${total}

</h2>

<Link
to={`/checkout/${products[0].product_id}`}
>

<button
className="checkoutBtn"
>

Proceed To Checkout

</button>

</Link>

</div>

</>

}

</div>

)

}

export default Cart;