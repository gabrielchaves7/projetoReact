let db;
let dbReq = indexedDB.open('myDatabase', 2);

dbReq.onupgradeneeded = function(event) {
  db = event.target.result;
  if (!db.objectStoreNames.contains('autores')) {
    db.createObjectStore('autores', { keyPath: "id", autoIncrement:true });
  } 

  if (!db.objectStoreNames.contains('livros')) {
    db.createObjectStore('livros', { keyPath: "id", autoIncrement:true });
  }     
}

dbReq.onsuccess = function(event) {
  db = event.target.result;
}

dbReq.onerror = function(event) {
  alert('error opening database ' + event.target.errorCode);
}

function addAutor(nome, email, senha) {
  let tx = db.transaction(['autores'], 'readwrite');
  let store = tx.objectStore('autores');
  let autor = {nome: nome, email: email, senha: senha};

  store.add(autor);
  
  tx.onerror = function(event) {
    alert('error storing autor ' + event.target.errorCode);
  }
}

function getAutores() {
  return new Promise((resolve) => {
      let dbreq = indexedDB.open('myDatabase', 2);
      dbreq.onsuccess = function(event) {
      db = event.target.result;
      let tx = db.transaction(['autores'], 'readonly');
      let store = tx.objectStore('autores');
      let req = store.openCursor();
      let allAutores = [];
    
      req.onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor != null) {
          allAutores.push(cursor.value);
          cursor.continue();
        } else {
          return resolve(allAutores);        
        }
      }

      req.onerror = function(event) {
        alert('error in cursor request ' + event.target.errorCode);
      }
    }
  });
}

function addLivro(nome, idAutor, preco) {
  let tx = db.transaction(['livros'], 'readwrite');
  let store = tx.objectStore('livros');
  let livro = {nome: nome, autor: idAutor, preco: preco};

  store.add(livro);
  
  tx.onerror = function(event) {
    alert('error storing livro ' + event.target.errorCode);
  }
}

function getLivros() {
  return new Promise((resolve) => {
      let dbreq = indexedDB.open('myDatabase', 2);
      dbreq.onsuccess = function(event) {
      db = event.target.result;
      let tx = db.transaction(['livros'], 'readonly');
      let store = tx.objectStore('livros');
      let req = store.openCursor();
      let allLivros = [];
    
      req.onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor != null) {
          allLivros.push(cursor.value);
          cursor.continue();
        } else {
          return resolve(allLivros);        
        }
      }

      req.onerror = function(event) {
        alert('error in cursor request ' + event.target.errorCode);
      }
    }
  });
}

exports.addAutor = addAutor;
exports.getAutores = getAutores;
exports.addLivro = addLivro;
exports.getLivros = getLivros;