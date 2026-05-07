import React from 'react'

const ContactForm = ({onSubmit}) => {

    const [name, setName] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [email, setEmail] = React.useState('')


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, phone, email });
      
    }

  return (
  <form className="contact-form" onSubmit={handleSubmit}>
    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
    <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <button type="submit">AddContact</button>
   </form>
  )
}

export default ContactForm