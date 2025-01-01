import bcrypt from 'bcrypt';
import AdminUser from '../models/adminData.js';



export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AdminUser.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password.' });

    res.redirect('/issues/getall');
  } catch (error) {
    console.error('Sign-in error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await AdminUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new AdminUser({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Admin user registered successfully.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};