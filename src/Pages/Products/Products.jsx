import Card from "../../Components/Card";

const Products = () => {
  const photoData = [
    {
      id: 1,
      photo: "images/2.jpg",
      price: "15",
      title: "Product 1",
    },
    {
      id: 2,
      photo: "images/3.jpg",
      price: "10",
      title: "Product 2",
    },
    {
      id: 3,
      photo: "images/4.jpg",
      price: "20",
      title: "Product 3",
    },
    {
      id: 4,
      photo: "images/5.jpg",
      price: "25",
      title: "Product 4",
    },
    {
      id: 5,
      photo: "images/6.jpg",
      price: "30",
      title: "Product 5",
    },
    {
      id: 6,
      photo: "images/7.jpg",
      price: "35",
      title: "Product 6",
    },
  ];
  return (
    <div className="p-5">
      <div className="grid grid-cols-3 gap-5">
        {photoData.map((ph) => (
          <Card key={ph.id} photo={ph} />
        ))}
      </div>
    </div>
  );
};

export default Products;
