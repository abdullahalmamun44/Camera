import { useEffect, useState } from "react";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Cameras from "./pages/Cameras";
import Lenses from "./pages/Lenses";
import Accessories from "./pages/Accessories";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import {
  FaShoppingCart,
  FaCamera,
  FaUserCircle
} from "react-icons/fa";

function App() {

const [user,setUser]=useState(null);

const [homeProducts,setHomeProducts]=useState({

camera:[],
lens:[],
accessory:[]

});

useEffect(()=>{

fetch(
"http://localhost:8080/Camera/api/profile.php",
{
credentials:"include"
}
)

.then(res=>res.json())

.then(data=>{

if(data.status==="success"){

setUser(
data.user
);

}

})

.catch(err=>console.log(err));

loadHomeProducts();

},[]);



const loadHomeProducts=async()=>{

const cam=await fetch(
"http://localhost:8080/Camera/api/get_products.php?category=camera"
);

const lens=await fetch(
"http://localhost:8080/Camera/api/get_products.php?category=lens"
);

const acc=await fetch(
"http://localhost:8080/Camera/api/get_products.php?category=accessory"
);

const camData=await cam.json();
const lensData=await lens.json();
const accData=await acc.json();

setHomeProducts({

camera:camData.products.slice(0,3),
lens:lensData.products.slice(0,3),
accessory:accData.products.slice(0,3)

});

};



const ProductSection=({

title,
text,
products,
link,
buttonText

})=>{

return(

<section className="products">

<div className="homeSectionTop">

<div>

<h2>{title}</h2>

<p className="sectionText">

{text}

</p>

</div>

<Link to={link}>

<button className="viewBtn">

{buttonText}

</button>

</Link>

</div>

<div className="productGrid">

{
products.length===0
?

<p>No products added yet</p>

:

products.map(product=>(

<div
className="card"
key={product.id}
>

<img
src={product.image_url}
alt={product.title}
onError={(e)=>{

e.target.src=
"https://placehold.co/500x350?text=No+Image"

}}
/>

<h3>

{product.title}

</h3>

<p>

{
product.description &&
product.description.length>50

?

product.description.substring(0,50)+"..."

:

product.description
}

</p>

<h4>

${product.price}

</h4>

<span
className={
product.stock_status==="in_stock"
?
"stockIn"
:
"stockOut"
}
>

{
product.stock_status==="in_stock"
?
`In Stock (${product.quantity})`
:
"Stock Out"
}

</span>

<Link
to={`/product/${product.id}`}
>

<button>

View Details

</button>

</Link>

</div>

))

}

</div>

</section>

)

};



return(

<BrowserRouter>

<div className="home">

<nav className="navbar">

<div className="logo">

<FaCamera/>

LensHub

</div>

<ul>

<li>
<Link to="/">
Home
</Link>
</li>

<li>
<Link to="/cameras">
Cameras
</Link>
</li>

<li>
<Link to="/lenses">
Lenses
</Link>
</li>

<li>
<Link to="/accessories">
Accessories
</Link>
</li>

</ul>


<div className="navButtons">

{

user

?

<button className="profileIconBtn">

<FaUserCircle/>

{user.name}

</button>

:

<>

<Link to="/login">

<button className="loginBtn">

Login

</button>

</Link>

<Link to="/register">

<button className="signupBtn">

Sign Up

</button>

</Link>

</>

}


<Link to="/cart">

<button className="cart">

<FaShoppingCart/>

Cart

</button>

</Link>

</div>

</nav>



<Routes>

<Route
path="/"
element={
<>

<section className="hero">

<div className="heroText">

<span className="tag">

Premium Camera Store

</span>

<h1>

Capture Every Moment Like a Pro

</h1>

<p>

Explore professional cameras, lenses and accessories with a clean modern shopping experience.

</p>

<div className="buttons">

<Link to="/cameras">

<button className="primary">

Shop Now

</button>

</Link>

<Link to="/accessories">

<button className="secondary">

Explore Collection

</button>

</Link>

</div>

</div>

<div className="heroImage">

<img
src="https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1000&q=80"
alt=""
/>

</div>

</section>


<ProductSection
title="Latest Cameras"
text="Newest cameras added by admin"
products={homeProducts.camera}
link="/cameras"
buttonText="View All Cameras"
/>

<ProductSection
title="Latest Lenses"
text="Newest lenses added by admin"
products={homeProducts.lens}
link="/lenses"
buttonText="View All Lenses"
/>

<ProductSection
title="Latest Accessories"
text="Newest accessories added by admin"
products={homeProducts.accessory}
link="/accessories"
buttonText="View All Accessories"
/>

</>
}
/>

<Route path="/cameras" element={<Cameras/>}/>
<Route path="/lenses" element={<Lenses/>}/>
<Route path="/accessories" element={<Accessories/>}/>
<Route path="/product/:id" element={<ProductDetails/>}/>
<Route path="/checkout/:id" element={<Checkout/>}/>
<Route path="/cart" element={<Cart/>}/>
<Route path="/admin" element={<Admin/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>

</Routes>

</div>

</BrowserRouter>

)

}

export default App;