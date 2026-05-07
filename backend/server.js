const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const Contact = require('./contact');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
dotenv.config();


app.post('/api/contacts', async (req, res) => {
    try {
        const { name, phone, email } = req.body;
        const contact = new Contact({ name, phone, email });
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}); 


app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.put('/api/contacts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, email } = req.body;
        const contact = await Contact.findByIdAndUpdate(id, { name, phone, email }, { new: true });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        } 
        res.json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



app.delete('/api/contacts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
