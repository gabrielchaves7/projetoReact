let db;
let dbReq = indexedDB.open('myDatabase', 2);

dbReq.onupgradeneeded = function(event) {
  db = event.target.result;
  if (!db.objectStoreNames.contains('livros')) {
    db.createObjectStore('livros', { keyPath: "id", autoIncrement:true });
  } else {
    dbReq.transaction.objectStore('livros');
    getLivros(db);
  }  
}

dbReq.onsuccess = function(event) {
  db = event.target.result;
}

dbReq.onerror = function(event) {
  alert('error opening database ' + event.target.errorCode);
}



exports.addLivro = addLivro;
exports.getLivros = getLivros;
