import "./Cameras.css";

function Cameras() {

const cameras = [

{
name:"Canon EOS R50",
price:"$699",
image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80"
},

{
name:"Sony Alpha A6400",
price:"$899",
image:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80"
},

{
name:"Nikon Z50",
price:"$799",
image:"https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=900&q=80"
},

{
name:"Fujifilm X-T30 II",
price:"$949",
image:"https://images.unsplash.com/photo-1495121553079-4c61bcce1894?auto=format&fit=crop&w=900&q=80"
},

{
name:"Canon EOS R6",
price:"$1499",
image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
},

{
name:"Sony A7 IV",
price:"$1899",
image:"https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=900&q=80"
}

]

return(

<div className="cameraPage">

<h1>Explore Cameras</h1>

<div className="cameraGrid">

{cameras.map((camera,index)=>(

<div className="cameraCard" key={index}>

<img src={camera.image}/>

<h2>{camera.name}</h2>

<h3>{camera.price}</h3>

<button>
Buy Now
</button>

</div>

))}

</div>

</div>

)

}

export default Cameras