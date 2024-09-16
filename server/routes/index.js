const Reward  = require('../controller')

const router = require('express').Router()

router.get('/api/rewardapp/getreward', Reward.find)

module.exports = router
