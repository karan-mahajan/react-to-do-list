import PropertyDetails from "./PropertyDetails";

const Properties = ({ properties, onDelete, onEdit }) => {
  return (
    <>
      {properties.map((property) => (
        <PropertyDetails key={property.id} property={property} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </>
  );
};

export default Properties;
