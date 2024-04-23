import Router from 'koa-router'
import getHealth from './health/health'
import  addpromotion from './promotions/promotions'


const router = new Router()

router.get('/health', getHealth)
router.post('/api/get-promotions', addpromotion.addpromotion)  
export default router
