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
    switch (document.select.month.value) {
      case 2:
        if (document.select.day.value < 29) {
          error();
          break;
        }
      case 4:
      case 6:
      case 9:
      case 11:
        if (document.select.day.value === 31) {
          error();
          break;
        }
      default:
        url += '&titles=' + document.select.month.value + '月' + document.select.day.value + '日';
    }
    $.ajax({
      url: url,
      dataType: 'jsonp',
    }).done(function(data) {
      if (data.query) {
        setData(data);
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

function error() {
  alert('日付は月の範囲内で選んでください。');
}
