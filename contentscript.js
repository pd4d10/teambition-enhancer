var TIMEOUT = 500
var RETRY_MAX_TIME = 5
var currentTaskId = ''

var $copyDOM = $('<a href="#" class="btn url-handler" style="color: #">Copy Task URL</a>')

$copyDOM.on('click', function () {
  toastr.success('Task ID: ' + currentTaskId + '\nURL Copyed to clipboard')
  return false
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
  currentTaskId = $(this).data('id')
  console.log('Current task ID: ' + currentTaskId)
  setTimeout(append, TIMEOUT)
})
