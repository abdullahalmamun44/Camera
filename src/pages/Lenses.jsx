import "./Cameras.css";

function Lenses() {

const lenses=[

{
name:"Canon RF 50mm",
price:"$399",
image:"https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&w=900&q=80"
},

{
name:"Sony FE 85mm",
price:"$599",
image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80"
},

{
name:"Nikon Z 24-70mm",
price:"$899",
image:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80"
},

{
name:"Sigma Art 35mm",
price:"$749",
image:"https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=900&q=80"
},

{
name:"Tamron 70-300mm",
price:"$699",
image:"https://images.unsplash.com/photo-1495121553079-4c61bcce1894?auto=format&fit=crop&w=900&q=80"
}

]

return(

<div className="cameraPage">

<h1>Explore Lenses</h1>

<div className="cameraGrid">

{lenses.map((lens,index)=>(

<div
className="cameraCard"
key={index}
>

<img
src={lens.image}
alt=""
/>

<div className="cameraInfo">

<h3>{lens.name}</h3>

<h4>{lens.price}</h4>

<button className="buyBtn">

Buy Now

</button>

</div>

</div>

))}

</div>

</div>

)

}

export default Lenses