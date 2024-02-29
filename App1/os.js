const os = require('os');

// console.log(os.userInfo());
// console.log(os.uptime());

console.table ({
    uptime : os.uptime(),
    os : os.platform()
})
