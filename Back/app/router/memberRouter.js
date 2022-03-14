const express = require('express');
//const jwt = require('../middleware/auth');

const memberController = require('../controllers/memberController');
const router = express.Router();

router.get('/', memberController.getAllMember);
//router.get('/', jwt, memberController.getAllMember);
router.get('/:memberId', memberController.getOneMember);
//router.get('/:memberId', jwt, memberController.getOneMember);
router.post('/', memberController.createMember);
router.patch('/', memberController.updateAllMember);

router.patch('/:memberId', memberController.updateOneMember); // toutes les infos sauf pw, profilephoto et bannnière eet la biography
router.patch('/profile_photo/:memberId', memberController.updateProfilePhoto);

// Nouvelle route pour mettre à jour la biographie, la localisation, la bannière
router.patch('/profile_infos/:memberId', memberController.updateProfileInfos);

//router.delete('/', memberController.deleteAllMember);
router.delete('/:memberId', memberController.deleteOneMember);

router.post('/login', memberController.loginMember);

module.exports = router;