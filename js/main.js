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
    var pageid = [];
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
        for( var id in data.query.pages ) {
          pageid.push( id );
        }
        setData(data, pageid);
      } else {
        alert('データが見つかりませんでした');
      }
    }).fail(function(data) {
      alert('通信に失敗しました');
    });
  });
});

function setData(data, pageid) {
  let parseString = JSON.stringify(data);
  let parse = JSON.parse(parseString);
  var content = data.query.pages[ pageid[0] ].revisions[0]["*"];  // キー*の値は["*"]で取り出す
  var dekigoto = content.match(/== できごと ==[\s\S]*== 誕生日 ==/);  // 改行文字を含む文字列には [\s\S]* を使う

  article = dekigoto[0].match(/\*.+\n/g);  // *の前に\が必要

  let result = '<p>' + article + '</p>';
  $('#show').html(result.replace(/\r?\n/g, '<br>').replace(/\*/g, '').replace(/\,/g, '').replace(/\[/g, ''). replace(/\]/g, ''));
}

function error() {
  alert('日付は月の範囲内で選んでください。');
}
