import "./Cameras.css";

function Accessories() {
  const accessories = [
    {
      name: "Camera Tripod",
      price: "$79",
      image:
        "https://images.unsplash.com/photo-1589872307379-0ffdf9829123?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Camera Bag",
      price: "$59",
      image:
        "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Memory Card 128GB",
      price: "$29",
      image:
        "https://images.unsplash.com/photo-1615655024541-5c3f4f7a0f9e?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "External Flash",
      price: "$119",
      image:
        "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Lens Cleaning Kit",
      price: "$19",
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Camera Strap",
      price: "$25",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <div className="cameraPage">
      <h1>Explore Accessories</h1>

      <div className="cameraGrid">
        {accessories.map((item, index) => (
          <div className="cameraCard" key={index}>
            <img src={item.image} alt={item.name} />

            <div className="cameraInfo">
              <h3>{item.name}</h3>
              <h4>{item.price}</h4>
              <button className="buyBtn">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accessories;