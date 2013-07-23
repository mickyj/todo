 $(document).ready(function () {

var create_task = function () {
    var title = $('#title').val();
    var description = $('#description').val();
    var duedate = $('#duedate').val();
    var is_complete= $('#is_complete').val();
    var address = $('#address').val();
    var priority_id = $('#priority_id').val();
    var token = $('input[name="authenticity_token"]').val();

    $.ajax({
      dataType: 'json',
      type: 'POST',
      url: '/tasks',
      data: {
        'authenticity_token': token,
        'priority_id': priority_id,
        'address': address,
        'title': title,
        'description': description,
        'duedate': duedate,
        'is_complete': is_complete}
    }).done(display_task);

    return false;
  };

var display_task = function (task) {
  var $li1 = $('<li/>').addClass('title');
  var $li2 = $('<li/>').addClass('description');
  var $li3 = $('<li/>').addClass('duedate');
  var $li4 = $('<li/>').addClass('is_complete');
  var $li5 = $('<li/>').addClass('address');
  var $li6 = $('<li/>').addClass('priority');

  var $li7  = $('<li/>');
  var $ul = $('<ul/>');

   $li1.text(task.title);
   $li2.text(task.description);
   $li3.text(task.duedate);
   $li4.text(task.is_complete);
   $li5.text(task.address);
   $li6.text(task.priority);

    $ul.append([$li1, $li2, $li3, $li4, $li5, $li6]);
    $li7.append($ul);
    $('#top').append($li7);
}

var edit_task = function () {
    if ($('.form').is(':hidden'))
      toggle_form();

    $('#create_task').hide();
    $('#update_task').show();

    var title = $(this).siblings('.title').text();
    var description = $(this).siblings('.description').text();
    var duedate = $(this).siblings('.duedate').text();
    var address = $(this).siblings('.address').text();
    var is_complete = $(this).siblings('.is_complete').text();
    var priority_id = $(this).siblings('.priority').text();

    $('#title').val(title);
    $('#description').val(description);
    $('#duedate').val(duedate);
    $('#address').val(address);
    $('#is_complete').val(is_complete);
    $('#priority_id').val(priority_id);
  };

var update_task = function () {
  var title = $('#title').val();
    var description = $('#description').val();
    var duedate = $('#duedate').val();
    var is_complete= $('#is_complete').val();
    var address = $('#address').val();
    var priority_id = $('#priority_id').val();
    var token = $('input[name="authenticity_token"]').val();

    $.ajax({
      dataType: 'json',
      type: 'POST',
      url: '/tasks/' + priority_id,
      data: {
        '_method': 'put',
        'authenticity_token': token,
        task: {
          title: title,
          description: description,
          is_complete: is_complete,
          address: address,
          priority_id: priority_id
        }
      }
    }).done(display_task);


    return false;
  };



var new_task = function () {
      if ($('.taskform').is(':hidden'))
      toggle_form();

      $('#create_task').show();
      // $('#update_priority').hide(); need to update
  }


var toggle_form = function () {
      $('#new_task').toggle();
      $('.taskform').toggleClass('invisible');

      clear_form();

      return false;
  }

  var clear_form = function () {
    // Clear out the form values.

      $('#title').val();
      $('#description').val();
      $('#duedate').val();
      $('#is_complete').val();
      $('#address').val();
      $('#priority_id').val();
  }

      $('#create_task').click(create_task);
      $('#update_task').click(update_task);
      $('#top').on('click', '.edit_button', edit_task);
       // $('#new_task').click(new_task); not done yet










  });