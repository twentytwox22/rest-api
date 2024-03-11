const {Router} = require('express');
const controller = require('./controller');
const { getStudentByID } = require('./quries');
const router = Router();

router.get('/', controller.getStudents);
router.get('/:id', controller.getStudentById);
router.post('/', controller.addStudent);
router.put('/:id', controller.updateStudent);
router.delete("/:id", controller.removeStudent);

module.exports = router; 
