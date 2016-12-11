var TIMEOUT = 500
var RETRY_MAX_TIME = 5

var $copyDOM = $('<a href="javascript:" class="btn url-handler" style="color: #fff">Copy Task URL</a>')

// Prevent default click event
$copyDOM.on('click', function () {
  return false
})

var clipboard = new Clipboard($copyDOM[0])
clipboard.on('success', function () {
  toastr.success('Task URL Copyed to clipboard')
})

function append(count) {
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
      return append(count + 1)
    }, TIMEOUT)
  }

  // DOM ready, append
  $parent.append($copyDOM)
}

$('body').on('click', [
  '.task-content-set',
  '.favorites-view .task-wrapper', // Me -> Favorites -> Task
  '.calendar-view .is-task', // Calendar
  // '.inbox-view .message-view', // Notifications
].join(','), function () {
  var currentTaskId = $(this).data('id')
  $copyDOM.attr('data-clipboard-text', currentTaskId)
  console.log('Current task ID: ' + currentTaskId)
  setTimeout(append, TIMEOUT)
})
