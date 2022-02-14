const router = require('koa-router')()
const api = require('./../controller/other') 


/**
 * 出版社相关api
 */
router.get('/getPublishers',api.getPublishers)
router.post('/addPublisher',api.addPublisher)

/**
 * 出品方相关api
 */
router.get('/getProducers',api.getProducers)
router.post('/addProducer',api.addProducer)


/**
 * 丛书相关api
 */
router.post('/addSeries',api.addSeries)

module.exports = router