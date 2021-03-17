export default function documentReady() {
  return new Promise((resolve, reject) => {
    if (document.body) {
      return resolve();
    } else {
      var _documentReadyInterval = window.setInterval(function() {
        if (document.body) {
          window.clearInterval(_documentReadyInterval);
          return resolve();
        }
      }, 10);
    }
  });
}