var apiKey = '563492ad6f91700001000001f556569f07ac465680e108132b19c614';

document.addEventListener('DOMContentLoaded', photoSearch);

function photoDisplay(response) {
  var display = document.getElementById('results');
  display.removeChild(display.childNodes[0]);
  var row = document.createElement('div');
  display.appendChild(row).className = 'row';
  for (var i = 0; i < response.photos.length; i++){
    // create each results card
    var addCol = document.createElement('div');
    row.appendChild(addCol).className = 'col-4';
    var card = document.createElement('div');

    //append small picture
    addCol.appendChild(card).className = 'card';
    var thumbnail = document.createElement('img');
    card.appendChild(thumbnail).className = 'card-img-top img-fluid';
    thumbnail.setAttribute('src', response.photos[i].src.landscape);

    // append links of photo on Pexel and original size 
    var links = document.createElement('div');
    card.appendChild(links).className = 'card-body';
    var origPhoto = document.createElement('a');
    links.appendChild(origPhoto).className = 'btn btn-info btn-block';
    origPhoto.setAttribute('href', response.photos[i].src.original);
    origPhoto.setAttribute('target', '_blank');
    origPhoto.textContent = 'Original Size';

    var photoUrl = document.createElement('a');
    links.appendChild(photoUrl).className = 'btn btn-primary btn-block';
    photoUrl.setAttribute('href', response.photos[i].url);
    photoUrl.setAttribute('target', '_blank');
    photoUrl.textContent = 'View on Pexel';

    //append photographer info
    var photoInfo = document.createElement('div');
    card.appendChild(photoInfo).className = 'card-body';
    var desc = document.createElement('p');
    photoInfo.appendChild(desc).className = 'card-text';
    desc.textContent = 'Photo from: '
    var photographer = document.createElement('a');
    photoInfo.appendChild(photographer).className = 'card-link btn btn-outline-success btn-sm';
    photographer.setAttribute('href', response.photos[i].photographer_url);
    photographer.setAttribute('target', '_blank');
    photographer.textContent = response.photos[i].photographer;



  }
}


function photoSearch(){
  document.getElementById('search-submit').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var searchInput = document.getElementById('search-input').value;
    var url = 'https://api.pexels.com/v1/search?query=' + searchInput + "&per_page=16";

    req.open('GET', url, true);
    req.setRequestHeader('Authorization', apiKey);
    req.addEventListener('load', function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        console.log(response);
        photoDisplay(response);
      } else {
        console.log('Request Error: ' + req.statusText);
      }
    });
    req.send(null);
    event.preventDefault();
  });
  
}