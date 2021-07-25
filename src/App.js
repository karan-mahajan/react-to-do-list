import Header from "./components/Header";
import Properties from "./components/Properties";
import { useState, useEffect } from 'react'
import AddProperty from "./components/AddProperty";

function App() {
  const [properties, setProperties] = useState([]);
  const [editedProperty, setEditedProperty] = useState({})

  useEffect(() => {
    const properties = async () => {
      const propertiesFromServer = await proper();
      setProperties(propertiesFromServer)
    }
    properties()
  }, [])

  const proper = async () => {
    const data = await fetch('http://localhost:5000/properties')
    const result = await data.json();
    return result;
  }

  const onDelete = async (id) => {
    await fetch(`http://localhost:5000/properties/${id}`, {
      method: 'DELETE'
    })
    setProperties(properties.filter((property) => property.id !== id))
  }

  const addProperty = async (property) => {
    const res = await fetch(`http://localhost:5000/properties`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(property),
    })

    const data = await res.json()
    setProperties([...properties, data])

  }

  const onEdit = async (id) => {
    const editProperty = await fetch(`http://localhost:5000/properties/${id}`, {
      method: 'GET'
    })
    const result = await editProperty.json()
    setEditedProperty(result)
  }

  const editDBValues = async (values) => {
    const getEditProperty = await fetch(`http://localhost:5000/properties/${values.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    const data = await getEditProperty.json()
    const newProperties = properties.map((property) => {
      if (property.id === data.id) {
        property = data
      }
      return property
    })
    setProperties(newProperties)
    setEditedProperty({})
  }

  return (
    <div className="container">
      <Header />
      <AddProperty onAdd={addProperty} editedProperty={editedProperty} editDBValues={editDBValues} />
      {properties.length > 0 ? <Properties properties={properties} onDelete={onDelete} onEdit={onEdit} /> : 'No Property to Show'}
    </div>
  );
}

export default App;
