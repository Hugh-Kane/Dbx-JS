console.log("Hello World")

// Docs:
// https://dropbox.github.io/dropbox-sdk-js/Dropbox.html#filesListFolder__anchor
var form = document.getElementById('basic-form');

form.onsubmit = function listFiles(e) {
    e.preventDefault();

    var ACCESS_TOKEN = document.getElementById('access-token').value;
    var folderName = document.getElementById('folderName').value;
    var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });
    dbx.filesListFolder({path: 'id:rSXK5ZjGvuAAAAAAAAMusw'})
    .then(function(response) {
        const result = response.result
        console.log(response)
        const entries = result.entries.filter((entry) => entry.name == folderName);
        console.log(entries)
        const entryId = entries[0].id
        folderResults = dbx.filesListFolder({path: entryId}).then(
        function(response) {
            console.log(response.result.entries)
            displayFiles(response.result.entries);
        }
        )
    })
    .catch(function(error) {
        console.error(error.error || error);
    });
}

function displayFiles(files) {
    var filesList = document.getElementById('files');
    filesList.innerHTML = ""
    var li;
    for (var i = 0; i < files.length; i++) {
    li = document.createElement('li');
    li.appendChild(document.createTextNode(files[i].name));
    filesList.appendChild(li);
    }
}


