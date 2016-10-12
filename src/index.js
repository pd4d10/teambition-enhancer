$(() => {
  const some = (node, cb) => [].some.call(node, cb)

  const observerForDetailPanel = new MutationObserver(() => {
    setTimeout(() => { // HACK
      const href = $('.url-handler').eq(1).attr('href')
      $('.activity-creator-wrapper').append(`<a href="${href}">复制</a>`)
    }, 1000)
  })

  const observerForBody = new MutationObserver(events => {
    if (some(events, event => some(event.addedNodes, node => node.classList.contains('inbox-view')))) {
      observerForDetailPanel.observe(document.querySelector('.detail-panel'), { childList: true })
    }
  })

  // $('.task.active-task-detail').attr('data-id')
  observerForBody.observe(document.body, { childList: true })
})
