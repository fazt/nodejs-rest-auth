import { Router } from 'express'

const router = Router()

router.post('/signup', async (req, res, next) => {
  res.send('signup route')
})

router.post('/signin', async (req, res, next) => {
  res.send('signin route')
})

router.post('/refresh-token', async (req, res, next) => {
  res.send('refreshing a token')
})

router.post('/logout', async (req, res, next) => {
  res.send('logout')
})

export default router