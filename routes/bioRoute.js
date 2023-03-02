const router = require('../controller/biography');
const{ getBiography,updateBiography}=require('../controller/biography');

router.get('/users/:id/bio', async(req,res)=> {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const users = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.send(user.bio);
  });
router.put('/users/:id/bio', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    user.bio = req.body.bio;
    res.send('Biography updated successfully');
});

module.exports = router;