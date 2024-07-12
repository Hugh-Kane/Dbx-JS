// Docs:
// https://dropbox.github.io/dropbox-sdk-js/Dropbox.html#filesListFolder__anchor
var form = document.getElementById('basic-form');
let ACCESS_TOKEN;
let dbx;

form.onsubmit = async function listFiles(e) {
    e.preventDefault();
    let keyFileInfo = []
    
    var folderName = document.getElementById('folderName').value;
    const parentFolderResponse = await filesListFolder('id:rSXK5ZjGvuAAAAAAAAMusw')

    const childFolderEntries = parentFolderResponse.entries.filter((entry) => entry.name == folderName);
    const childFolderId = childFolderEntries[0].id
    const childFolderResponse = await filesListFolder(childFolderId)
    for (const entry of childFolderResponse.entries) {
        keyFileInfo.push({
            Name: entry.name,
            Downloadlink: await filesGetTemporaryLink(entry.id)
        })
    }
    console.log(keyFileInfo)
    //childFolderResponse.entries[0]["HUGH"] = "HUGH"
    //console.log(childFolderResponse.entries)
    displayFiles(keyFileInfo)
}

async function filesListFolder(path) {
    ACCESS_TOKEN = document.getElementById('access-token').value;
    dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });
    let response = await dbx.filesListFolder({path: path})
    if (response.status === 200) {
        return response.result
    } else {
        console.error(`Error ${response}`)
    }
}

function displayFiles(files) {
    var filesList = document.getElementById('files');
    var li;
    filesList.innerHTML = ""
    files.forEach(file => {
        let liName = document.createElement('li');
        liName.appendChild(document.createTextNode( file.Name));
        filesList.appendChild(liName);
        let liDlLink = document.createElement('li');
        liDlLink.appendChild(document.createTextNode( file.Downloadlink));
        filesList.appendChild(liDlLink);
    });
}

async function filesGetTemporaryLink(fileId) {
    
    let response = await dbx.filesGetTemporaryLink({path: fileId})
    if (response.status === 200) {
        return response.result.link
    } else {
        console.error("error" + response)
    }
}