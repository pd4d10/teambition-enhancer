var TIMEOUT = 500
var RETRY_MAX_TIME = 5

var $copyDOM = $('<a href="#" class="btn url-handler">Copy Task URL</a>')

// Prevent default click event
$copyDOM.on('click', function () {
  return false
})

// Init clipboard
var clipboard = new Clipboard($copyDOM[0])
clipboard.on('success', function () {
  toastr.success('Task URL Copyed to clipboard')
})

// Append copy button
function append(taskId, type, count) {
  count = count || 1
  if (count > RETRY_MAX_TIME) {
    console.log('All fail, cancelled')
    return
  }

  console.log('Try ' + count + ' times')

  var $parent
  if (type === 'notifications') {
    $parent = $('.detail-header')
  } else if (type === 'projects') {
    $parent = $('<div class="object-nav"></div>').appendTo($('.object-modal-view'))
  } else {
    $parent = $('.object-nav')
  }

  // DOM not ready, try later
  if ($parent.length === 0) {
    return setTimeout(function () {
      return append(taskId, type, count + 1)
    }, TIMEOUT)
  }

  // DOM ready, set copied content
  var urlPrefix = location.protocol + '//' + location.host
  var taskPrefix = $parent.find('.btn').eq(1).attr('href')

  var taskURL
  if (type === 'notifications') {
    taskURL = urlPrefix + taskPrefix
  } else if (type === 'projects') {
    taskURL = location.href
  } else {
    taskURL = urlPrefix + taskPrefix + '/task/' + taskId
  }
  console.log('Task URL: ' + taskURL)

  $copyDOM.attr('data-clipboard-text', taskURL)
  // append
  $parent.append($copyDOM)
}

$('body').on('click', [
  '.task-content-set',
  '.favorites-view .task-wrapper', // Me -> Favorites -> Task
  '.calendar-view .is-task', // Calendar
  '.inbox-view .message-view', // Notifications
].join(','), function () {
  var currentTaskId = $(this).data('id')
  console.log('Current task ID: ' + currentTaskId)

  if (typeof currentTaskId === 'undefined') {
    console.log('Can\'t find task id')
    return
  }

  var $this = $(this)
  var type
  if ($this.hasClass('message-view')) {
    type = 'notifications'
  } else if ($this.hasClass('open-detail')) {
    type = 'projects'
  }

  setTimeout(function () {
    append(currentTaskId, type)
  }, TIMEOUT)
})
