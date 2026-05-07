
const ContactList = ({contacts, onDelete,onEdit}) => {
  return (
    <div className="contact-list-container">
      <h2>All Contacts</h2>
      <ul className="contact-list">
        {
          contacts.map(contact => (
            <li key={contact._id} className="contact-list-item">
              <span className="contact-name">{contact.name}</span>
              <span className="contact-details">- {contact.phone} - {contact.email}</span>
              <button  onClick={()=>onEdit(contact)}  >Edit</button>
              <button className="delete-button" onClick={() => onDelete(contact._id)}>Delete</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default ContactList