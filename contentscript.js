var TIMEOUT = 500
var RETRY_MAX_TIME = 5

var $copyDOM = $('<a href="javascript:" class="btn url-handler" style="color: #eee">Copy Task URL</a>')

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
function append(taskId, count) {
  count = count || 1
  if (count > RETRY_MAX_TIME) {
    console.log('All fail, cancelled')
    return
  }

  console.log('Try ' + count + ' times')
  var $parent = $('.object-nav')

  // DOM not ready, try later
  if ($parent.length === 0) {
    return setTimeout(function () {
      return append(taskId, count + 1)
    }, TIMEOUT)
  }

  // DOM ready, set copied content
  var urlPrefix = location.protocol + '//' + location.host
  var taskPrefix = $('.object-nav').find('.btn').eq(1).attr('href')
  $copyDOM.attr('data-clipboard-text', urlPrefix + taskPrefix + '/task/' + taskId)
  // append
  $parent.append($copyDOM)
}

$('body').on('click', [
  '.task-content-set',
  '.favorites-view .task-wrapper', // Me -> Favorites -> Task
  '.calendar-view .is-task', // Calendar
  // '.inbox-view .message-view', // Notifications
].join(','), function () {
  var currentTaskId = $(this).data('id')
  console.log('Current task ID: ' + currentTaskId)
  setTimeout(function () {
    append(currentTaskId)
  }, TIMEOUT)
})
