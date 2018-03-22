const url = 'https://ja.wikipedia.org/w/api.php?format=json&utf8&action=query&prop=revisions&rvprop=content&titles=1%E6%9C%881%E6%97%A5'
$(function() {
  $('#btn').on('click', function() {
    $.ajax({
      url: url,
      dataType: 'jsonp',
    }).done(function(data) {
      if (data.results) {
        console.log(data);
      } else {
        alert('データが見つかりませんでした');
      }
    }).fail(function(data) {
      alert('通信に失敗しました');
    });
  });
});
