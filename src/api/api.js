function debug(name, result) {

    console.log(`-----------------------${name}-----------------------`)
    console.log(result)
    console.log("-------------------------------------------------")

}

class Api {

    request(url, method = "GET", params = null, header = null) {

        debug("url", url)
        debug("params", params)
        debug("header", header)


        var options = {
            method: method.toUpperCase(),
            headers: header,
            mode: 'cors',
            cache: 'default'

        };

        if (method.toUpperCase() !== "GET") {
            options.body = params
        }

        // debug("options", options)

        return new Promise((resolve, reject) => {
            fetch(url, options).then(function (response) {
                let json = JSON.parse(response._bodyInit)

                // debug("response", json)

                resolve(json)

            }).catch(function (error) {

                // debug("error", JSON.parse(error))

                reject(error)
            })
        })
    }
}

let api = new Api()

export default api