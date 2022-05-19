const { PythonShell } = require("python-shell")


async function run_python(filepath, args=[]) {
    return new Promise((res, rej) => {
        PythonShell.run(filepath, { args: args }, (err, rep) => {
            if (err) rej(err)
            else res(rep)
        })
    })
}


module.exports = { run_python }
