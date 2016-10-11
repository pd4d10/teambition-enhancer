$(() => {
  const some = (node, cb) => [].some.call(node, cb)

  const observerForDetailPanel = new MutationObserver(() => {
    $('.menu-handler').html($('.url-handler').eq(1).attr('href'))
  })

  const observerForBody = new MutationObserver(events => {
    console.log(events, 'body')

    if (!some(events, event => some(event.addedNodes, node => node.classList.contains('inbox-view')))) {
      return
    }

    observerForDetailPanel.observe($('.detail-panel')[0], { childList: true })
  })

  observerForBody.observe($('body')[0], { childList: true })
})
