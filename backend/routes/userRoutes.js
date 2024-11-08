const express = require('express');
const User = require('../models/user');
const router = express.Router()
const { jwtAuthMiddleware, generateToken } = require('./../jwt');
const bcrypt = require('bcrypt');

//Signup
router.post('/signup', async (req, res) => {
    try {
        const data = req.body

        // Create a new User decument using the Mongoose model
        const newUser = new User(data);

        // Save the new user in database
        const response = await newUser.save();
        console.log('data saved');

        const payload = {
            id: response.id,
        }
        
        const token = generateToken(payload)
        // console.log('Token is:', token);
        
        res.status(200).json({response:response, token:token})

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server Error' });

    }

})

// Login router
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Generate JWT token
        const payload = {
            id: user._id, // Use _id
        };

        const token = generateToken(payload);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Profile Route
router.get('/profile', jwtAuthMiddleware, async (req, res)=>{
    try {
        const userData = req.user;
        const userID = userData.userData.id;
        const user = await User.findById(userID);
        res.status(200).json(user)  ;    
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/profile/update-password', jwtAuthMiddleware, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
  
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Both current and new passwords are required' });
    }
  
    try {
      const user = await User.findById(req.user.userData.id); // Get the user by ID from JWT token
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Compare current password with the stored one
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the password in the database
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
  
    } catch (err) {
      console.error('Error updating password:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.delete('/:id', async (req, res) => {
    try {
        const UserId = req.params.id;

        const response = await User.findByIdAndDelete(UserId);
        if (!response) {
            return res.status(404).json({ error: 'User not found ' })
        }
        console.log('data deletes');
        res.status(200).json({ message: "User Deleted Successfully" })


    } catch (error) {

    }
})

module.exports = router