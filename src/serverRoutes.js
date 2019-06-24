import serverRenderer from './helpers/serverRenderer'
import createStore from './helpers/createStore'
import getRobotsTxt from './helpers/getRobotsTxt'
import getSitemap from './helpers/getSitemap'

module.exports = router => {
  router.get('/robots.txt', async ctx => {
    ctx.type = 'text/plain'
    ctx.body = getRobotsTxt(ctx)
  })

  router.get('/sitemap.xml', async ctx => {
    ctx.type = 'text/xml'
    ctx.body = await getSitemap(ctx)
  })

  // TO DO  - avoid double request ( favicon for example )
  router.get('*', async ctx => {
    try {
      // TO DO - INCAPSULATE THIS
      const store = createStore()
      ctx.body = serverRenderer(ctx, store)
    } catch (e) {
      console.log(e);
      ctx.body = '500 server error'
    }
  })
}
