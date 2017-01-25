var url = "https://spreadsheets.google.com/feeds/list/1fj1BaowFV-ba2XIyjbdbllZzfwnqbqxUMQykP03171E/od6/public/basic?alt=json";

var numbers = []
var called = []

var pics = ['phone.jpg',
            'phone2.png',
            'phone3.jpg',
            'phone4.jpg',
            'phone5.jpg',
            'phone6.jpg',
            'phone7.jpg',
            'phone8.png',
            'phone9.png']
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
  document.getElementById('total').textContent = numbers.reduce(function(sum, el) {
    return sum += parseInt(el.callsmade)
  }, 0)
  document.getElementById('made_calls').style.display = "inline-block"

});

function anotherOne(did_call) {
  if( !!did_call ) called.push(did_call)

  var number = window.numbers.filter(function(el) {
        return called.indexOf(el.phonenumber) === -1
      })[Math.floor(Math.random() * (numbers.length - called.length))]

  document.getElementById('number').textContent = number.phonenumber
  document.getElementById('place').textContent = number.location

  pic += 1
  if( typeof pics[pic] === 'undefined' ) pic = 0
  document.getElementById('the_pic').src = 'images/'+pics[pic]

  return false
}

function report(elem) {
  var did_it_work = elem.getAttribute('answer'),
      number = document.getElementById('number').textContent

  tinyPOST(
    'https://docs.google.com/forms/d/e/1FAIpQLSdgft-WNMlhPAsngZUl5idXhYPxQIEmHZzMw7QWwFZR0qA2ow/formResponse',
    {
      'entry.1225496550': number,
      'entry.1830234524': did_it_work
    }
  )

  alert('Thanks!')
  anotherOne(number)
  return false
}
