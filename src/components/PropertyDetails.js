import { FaTimes, FaEdit } from 'react-icons/fa'

const PropertyDetails = ({ property, onDelete, onEdit }) => {
    return (
        <div className='task' >
            <div className='property-header'>
                <div className='property-name'>
                    <h3>{property.name}</h3>
                </div>
                <div className='action-buttons'>
                    <FaEdit className='edit-button' onClick={() => onEdit(property.id)} />
                    <FaTimes style={{ color: 'red' }} onClick={() => onDelete(property.id)} />
                </div>
            </div>
            <p>{property.size}</p>
            <p>{property.description}</p>
        </div >
    )
}
export default PropertyDetails