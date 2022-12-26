const Router = require('express')
const presentationController = require('./presentation.controller.js')
const authMiddleware = require('#common/middlewares/auth.middleware.js')

const router = Router()

router.get('/', authMiddleware.authenticateToken, presentationController.getAllPresentaionOfOneUser)
router.get(
    '/group/:groupId',
    authMiddleware.authenticateToken,
    presentationController.getAllPresentaionOfGroup
)
router.delete(
    '/:presentationId',
    authMiddleware.authenticateToken,
    presentationController.deletePresentationById
)
router.get(
    '/:presentationId',
    authMiddleware.authenticateToken,
    presentationController.getPresentationById
)
router.post('/checkCode', presentationController.checkCode)
router.get(
    '/:presentationId/host',
    authMiddleware.authenticateToken,
    presentationController.getPresentationForHostById
)
router.get('/:presentationId/member', presentationController.getPresentationForMemberById)
router.post('/add', authMiddleware.authenticateToken, presentationController.addPresentation)
router.put(
    '/updateName',
    authMiddleware.authenticateToken,
    presentationController.updatePresentationName
)
router.post(
    '/createCode/:presentationId',
    authMiddleware.authenticateToken,
    presentationController.createPresentationCode
)

module.exports = router
