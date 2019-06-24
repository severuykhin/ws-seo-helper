import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'
import serialize from 'serialize-javascript'
import Root from '../client/components/Root/Root.jsx'

export default (requestContext, initialStore) => {
  let requestUrl = requestContext.request.url

  const content = renderToString(
    <Provider store={ initialStore }>
      <StaticRouter location={ requestUrl } context={ {} }>
        <Root />
      </StaticRouter>
    </Provider>
  )

  // Meta tags
  const helmet = Helmet.renderStatic();

  return `
  <html>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">
        <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
        ${ helmet.title.toString() }
        ${ helmet.meta.toString() }
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
          <script id="preloaded_state">
              window._PRELOADED_STATE_ = ${serialize(initialStore.getState())}
          </script>
          <div id="root">${content}</div>
          <script src="bundle.js"></script>
      </body>
  </html>
  `
}
