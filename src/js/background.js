function addMessageListener(listener) {
  browser.runtime.onMessage.addListener(listener);
}

addMessageListener(function(message) {
  return new Promise(function(resolve, reject){
    switch(message.type) {
      case 'clipComplete':
        clipComplete(message);
        resolve();
        break;
      default: break;
    }
  })
});

function clipComplete(message) {
  postMessage(message.detail)
}

function postMessage(detail) {
  console.log(detail);
  // FIXME
  const api = "http://localhost:9292/clip/complete";
  const formData = new FormData();
  for(const k in detail) {
    formData.append(k, detail[k]);
  }
  const request = new XMLHttpRequest();
  request.open("POST", api);
  request.send(formData);
}

console.log('background script!');
