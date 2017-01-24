var url = "https://spreadsheets.google.com/feeds/list/1fj1BaowFV-ba2XIyjbdbllZzfwnqbqxUMQykP03171E/od6/public/basic?alt=json";

var numbers = []

var pics = ['phone.jpg',
            'phone2.png',
            'phone3.jpg',
            'phone4.jpg',
            'phone5.jpg',
            'phone6.jpg',
            'phone7.jpg',
            'phone8.png']
var pic = -1

tinyGET(url, null, function(data) {
  window.numbers = data.feed.entry.map( function(el) {
    var obj = { location: el.title['$t'] },
        data = el.content['$t'].split(',')

    for (var i = data.length - 1; i >= 0; i--) {
      var key = data[i].split(':')[0].trim(),
          value = data[i].split(':')[1].trim()
      obj[key] = value
    }

    return obj
  }).filter(function(el) { return el.numberactive === 'Active' })

  anotherOne()
  document.getElementById('another').style.display = "block"
});

function anotherOne() {
  var current = document.getElementById('number').textContent
      number = window.numbers.filter(function(el) {
        return current !== el.phonenumber
      })[Math.floor(Math.random() * (numbers.length - 1))]

  document.getElementById('number').textContent = number.phonenumber
  document.getElementById('place').textContent = number.location

  pic += 1
  if( typeof pics[pic] === 'undefined' ) pic = 0
  document.getElementById('the_pic').src = 'images/'+pics[pic]

  return false
}

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
