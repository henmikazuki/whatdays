/*
let url = 'https://ja.wikipedia.org/w/api.php?';
url += 'format=json&utf8&action=query&prop=revisions&rvprop=content&titles=1月1日';
*/

$(function() {
  const selectMonth = document.getElementById('month');
  const selectDay = document.getElementById('day');

  for (var i = 1; i <= 12; i++) {
    var month = document.createElement('option');
    month.value = i;
    month.innerText = i;
    selectMonth.appendChild(month);
  }

  for (var i = 1; i <= 31; i++) {
    var day = document.createElement('option');
    day.value = i;
    day.innerText = i;
    selectDay.appendChild(day);
  }
  $('#btn').on('click', function() {
    let url = 'https://ja.wikipedia.org/w/api.php?';
    url += 'format=json';
    url += '&utf8';
    url += '&action=query';
    url += '&prop=revisions';
    url += '&rvprop=content';
    url += '&titles=' + document.selectDay.month.value + '月' + document.selectDay.day.value + '日';
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
  let result = '<p>' + JSON.stringify(data) + '</p>';
  $('#show').html(result);
}
