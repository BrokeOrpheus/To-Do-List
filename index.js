// API
const key = '?api_key=54';

$(document).on('click', '.remove', function () {
  let id = $(this).closest('tr').attr('id');

  $.ajax({
    type: 'DELETE',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + key,
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
      $('tbody').empty();
      get();
    },
    error: function (reponse, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
});

let get = function () {
  $.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks' + key,
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response.tasks);
      let tasks = response.tasks;
      tasks.sort(function compareNumber(a, b) {
        return a.id - b.id;
      });
      tasks.forEach(function (index) {
        let box = $('<td><input type="checkbox" class="box"/></td>');
        if (index.completed === true) {
          $(box).find('input').prop('checked', true);
        }
        let task = $('<td></td>').append(index.content);
        let remove = $('<td></td>').append('<button class="btn btn-danger remove">X</button');
        let newRow = $('<tr></tr>').append(box, task, remove);
        $(newRow).attr('id', index.id);
        $('tbody').append(newRow);
      });
    },
    error: function(response, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

$('form').submit(function (event) {
  event.preventDefault();
  let input = $('#search').val();

  $.ajax({
    type: 'POST',
    url: 'https://fewd-todolist-api.onrender.com/tasks' + key,
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: input
      }
    }),
    success: function (response, textStatus) {
      console.log(response);
      $('#search').val('');
      $('tbody').empty();
      get();
    },
    error: function(response, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
});

$(document).on('click', '.box', function () {
  let id = $(this).closest('tr').attr('id');

  if ($(this).prop('checked') === true) {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete' + key,
      dataType: 'json',
      success: function (response, textStatus) {
        console.log(response);
        $('tbody').empty();
        get();
      },
      error: function (response, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  } else {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active' + key,
      dataType: 'json',
      success: function (response, textStatus) {
        console.log(response);
        $('tbody').empty();
        get();
      },
      error: function (response, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }
});

// Filter Buttons

let showAll = function () {
  $('tbody').children().show();
}

let showActive = function () {
  $('tbody').children().hide();
  $('input').not(':checked').closest('tr').show();
}

let showComplete = function () {
  $('tbody').children().hide();
  $(':checked').closest('tr').show();
}

// Startup

get();