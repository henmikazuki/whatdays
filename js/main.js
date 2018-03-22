/*
let url = 'https://ja.wikipedia.org/w/api.php?';
url += 'format=json&utf8&action=query&prop=revisions&rvprop=content&titles=1月1日';
*/
$(function() {
  $('#btn').on('click', function() {
    let url = 'https://ja.wikipedia.org/w/api.php?';
    url += 'format=json&utf8&action=query&prop=revisions&rvprop=content&titles=1月1日';
    $.ajax({
      url: url,
      dataType: 'jsonp',
    }).done(function(data) {
      if (data.query) {
        setData(data);
//        console.log(data);
      } else {
        alert('データが見つかりませんでした');
      }
    }).fail(function(data) {
      alert('通信に失敗しました');
    });
  });
});

function setData(data) {
  let result = data;
  $('#show').html(result);
}
