$(() => {
  const some = (node, cb) => [].some.call(node, cb)

  const observerForDetailPanel = new MutationObserver(events => {
    console.log(events, 'from notify panel')
    setTimeout(() => { // HACK
      if (events[0].addedNodes.length) {
        const href = $('.url-handler').eq(1).attr('href')
        $('.detail-header').append(`<a class="btn url-handler" href="${href}">复制</a>`)
      }
    }, 1000)
  })

  const observerForBody = new MutationObserver(events => {
    console.log(events, 'from body')
    // 通知
    if (some(events, event => some(event.addedNodes, node => node.classList.contains('inbox-view')))) {
      observerForDetailPanel.observe(document.querySelector('.detail-panel'), { childList: true })
    }

    // 我的
    if (some(events, event => some(event.addedNodes, node => node.classList.contains('modal')))) {
      setTimeout(() => { // HACK
      const prefix = $('.url-handler').eq(1).attr('href')
      const href = $('.task.active-task-detail').attr('data-id')
      $('.object-nav').append(`<a class="btn url-handler" href="${prefix}/task/${href}">复制</a>`)
      }, 1000)
    }
  })

  observerForBody.observe(document.body, { childList: true })
})
