const python = require("../utils/python");


(async () => {
    console.log("Installing python dependencies ...")
    await python.run_python("src/python/install.py")
})();
