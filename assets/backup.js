// ==UserScript==
// @name         Teambition Enhancer
// @namespace    https://github.com/pd4d10
// @version      0.1
// @description  Teambition Enhancer
// @author       You
// @match        https://www.teambition.com/*
// @grant        none
// ==/UserScript==

$(function () {
  const some = (node, cb) => [].some.call(node, cb)

  const ob2 = new MutationObserver(events => {
    console.log(events)
  })

  const ob = new MutationObserver(events => {
    console.log(events, 'body')

    if (some(events, event => some(event.addedNodes, node => node.classList.contains('inbox-view')))) {
      console.log(document.querySelector('.detail-panel'))
      ob2.observe(document.querySelector('.detail-panel'), { childList: true })
    }
  })

  ob.observe(document.body, { childList: true })
  window.a = (s) => {
   const ob = new MutationObserver(console.log)
   ob.observe(document.querySelector(s), {childList:true,attributes:true,characterData:true})
  }
  $('body').on('click', '.message-view', function () {
   const href = $('.url-handler').last().attr('href')
   setTimeout(function () {
     $('.detail-panel').prepend(href)
   }, 400)
  })
  var STORAGE_KEY = 'teambition-enhancer-array'
  //var data = localStorage.getItem(STORAGE_KEY) || []
  var data = [
   {id:'id',name:'name'},
  ]
  var clicked = false
  var generateItemDom = function (id, name, avatar) {
   return $('<li class="member-wrap" data-id="' + id + '"><a class="member" data-gta="{action: \'filter\', type: \'task\', control: \'task panel menu\', method: \'member\'}"><div class="avatar img-circle img-24" style="' + avatar + '"></div>' + name + '</a></li>')
  }
  $(document).on('click', '[data-menu="filter"]', function () {
   if (clicked) {
     return
   }
   clicked = true
   var $ul = $('<ul class="scrum-filter-executors list"></ul>')
     .prependTo($('.scrum-filter-wrap'))
   $.each(data, function (index, item) {
     $ul.append(generateItemDom(item.id, item.name, item.avatar))
   })
   $ul.scrollTop(0)
  })
})
