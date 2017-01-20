var url = "https://spreadsheets.google.com/feeds/list/1fj1BaowFV-ba2XIyjbdbllZzfwnqbqxUMQykP03171E/od6/public/basic?alt=json";

var now = new Date;

tinyGET(url, null, function(data) {
  var numbers = data.feed.entry.map( function(el) {
    var obj = { location: el.title['$t'] },
        data = el.content['$t'].split(',')

    for (var i = data.length - 1; i >= 0; i--) {
      var key = data[i].split(':')[0].trim(),
          value = data[i].split(':')[1].trim()
      obj[key] = value
    }

    return obj
  }).filter(function(el) { return el.numberactive === 'Active' })

  var number = numbers[Math.round(Math.random() * numbers.length)]

  document.getElementById('number').textContent = number.phonenumber
  document.getElementById('place').textContent = number.location
});


function report(elem) {
  var did_it_work = elem.getAttribute('answer')

  tinyPOST(
    'https://docs.google.com/forms/d/e/1FAIpQLSdgft-WNMlhPAsngZUl5idXhYPxQIEmHZzMw7QWwFZR0qA2ow/formResponse',
    {
      'entry.1225496550': document.getElementById('number').textContent,
      'entry.1830234524': did_it_work
    }
  )

  alert('Thanks!')
  return false
}
