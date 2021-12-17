

let cardArr = [];

const ids = ['first-name', 'img', 'last-name', 'specialities', 'title-name', 'street', 'city', 'zipcode', 'openinghours-mo', 'openinghours-di', 'openinghours-mi', 'openinghours -do', 'openinghours-fr']

async function request() {
  try {
    let response = await fetch('http://peter-rehmann.developerakademie.com/doc/get_doctors.php');
    let json = await response.json()
    if (json.status >= '200') {
      displayError(json);
    } else {
      renderProfileCards(json)
    }
  }
  catch (error) {
    console.log(error)
  }
}

function displayError(json) {
  document.getElementById('container').innerHTML = `<h2 class="text-center">${json.error}<br>${json.status}<br>${json.message}</h2>`
}


function renderProfileCards(profileInfo) {
  console.log(profileInfo);
  for (const [i, card] of profileInfo.entries()) {
    document.getElementById('container').innerHTML += getCardTamplate(i, card);
    cardArr.push(card);
  }
}
const getCardTamplate = (i, card) => {
  return `
  <div id="${i}" class=card><div class="d-flex justify-content-between card-body gap-2"><div class=info-container>
  <img alt=doctor-img class="img-fluid profile-img"src=${card.img}><div class="d-flex flex-column info-content justify-content-between">
  <div><h5 class=card-title><span>${card.title}</span> ${card.first_name} ${card.last_name}</h5>
  <h6 class="text-muted card-subtitle mb-2 text-opacity-85">${card.specialities}</h6></div><div class="d-flex flex-column"><span>${card.street}
  </span> <span>${card.zipcode}<span>${card.city}</span></span></div><div><button onclick="openFullview(${i})"
  class="d-flex align-items-center btn btn btn-primary"data-bs-target=#exampleModal data-bs-toggle=modal>
  <i class="far fa-list-alt pe-2"></i>Profil ansehen</button></div></div></div><div><div class="d-flex align-items-center 
  flex-column justify-content-center rating"><span>Note</span> <span class=fs-3>1,0</span>
  </div><div><div class="d-flex align-items-center justify-content-between"><span class=text-black-50>397</span>
  <i class="text-black-50 fa-comment far fs-5 me-3"></i></div><h6 class="text-black-50 fs-6">Bwertungen</h6></div></div></div>
  <div class="text-muted card-footer"><span>.......................</span> <span>...................</span>
  <span>...................................</span></div></div>`;
};

function openFullview(index) {
  const res = cardArr.find(id => id.id == index + 1);

  document.getElementById('first-name').innerHTML = res.first_name;
  document.getElementById('img').src = res.img;

  document.getElementById('last-name').innerHTML = res.last_name;
  document.getElementById('specialities').innerHTML = res.specialities;
  document.getElementById('title-name').innerHTML = res.title;

  document.getElementById('street').innerHTML = res.street;
  document.getElementById('city').innerHTML = res.city;
  document.getElementById('zipcode').innerHTML = res.zipcode;

  document.getElementById('openinghours-mo').innerHTML = res.opening_hours.monday;
  document.getElementById('openinghours-di').innerHTML = res.opening_hours.tuesday;
  document.getElementById('openinghours-mi').innerHTML = res.opening_hours.wednesday;
  document.getElementById('openinghours-do').innerHTML = res.opening_hours.thursday;
  document.getElementById('openinghours-fr').innerHTML = res.opening_hours.friday;
}








