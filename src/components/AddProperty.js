import { useEffect, useState } from "react";

const AddProperty = ({ onAdd, editedProperty, editDBValues }) => {
  const [values, setValues] = useState({
    name: "",
    size: "",
    description: "",
    // id: 0,
  });
  useEffect(() => {
    if (editedProperty.name) {
      setValues(editedProperty);
    }
  }, [editedProperty]);
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, size, description } = values;
    if (name && size && description) {
      if (editedProperty.name) {
        editDBValues(values);
      } else {
        onAdd(values);
      }
      setValues({ name: "", size: "", description: "" });
    } else {
      alert("Please add all the values");
      return;
    }
  };

  const addValues = (e, key) => {
    setValues((values) => ({
      ...values,
      [key]: e.target.value,
    }));
  };

  const { name, size, description } = values;
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Property Name</label>
        <input
          value={name}
          type="text"
          placeholder="Property Name"
          onChange={(e) => addValues(e, "name")}
        ></input>
      </div>
      <div className="form-control">
        <label>Property Size</label>
        <input
          value={size}
          type="text"
          onChange={(e) => addValues(e, "size")}
          placeholder="Property Size"
        ></input>
      </div>
      <div className="form-control">
        <label>Property Description</label>
        <input
          value={description}
          type="text"
          onChange={(e) => addValues(e, "description")}
          placeholder="Property Description"
        ></input>
      </div>
      {!editedProperty.name ? (
        <input
          type="submit"
          value="Add Property"
          className="btn btn-block"
        ></input>
      ) : (
        <input
          type="submit"
          value="Update Property"
          className="btn btn-block"
        ></input>
      )}
    </form>
  );
};
export default AddProperty;
