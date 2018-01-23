import PouchDB from 'pouchdb-react-native'

var database = {}

database.new = (databaseName) => {
    const db = new PouchDB(databaseName)
    return db
}
database.getDataById = (databaseName, id) => {
    return new Promise((resolve, reject) => {
        databaseName.get(id).then(doc => {
            resolve(doc)
        }).catch(err => {
            reject(err)
        });
    });
}

database.getAllData = (databaseName) => {
    return new Promise((resolve, reject) => {
        databaseName.allDocs({
            include_docs: true,
            attachments: true
        }).then(doc => {
            resolve(doc)
        }).catch(err => {
            reject(err)
        });
    });
}

database.insert = (databaseName, data) => {
    return new Promise((resolve, reject) => {
        databaseName.put(data).then(response => {
            resolve(response)
        }).catch(err => {
            reject(err)
        });
    });
}

database.post = (databaseName, data) => {
    return new Promise((resolve, reject) => {
        databaseName.post(data).then(response => {
            resolve(response)
        }).catch(err => {
            reject(err)
        });
    });
}

database.delete = (databaseName, id) => {
    return new Promise((resolve, reject) => {
        databaseName.get(id).then(doc => {
            return databaseName.remove(doc);
        }).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        });
    });
}

database.bulk = (databaseName, datas) => {
    return new Promise((resolve, reject) => {
        db.bulkDocs([datas]).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        });
    });
}

export default database

