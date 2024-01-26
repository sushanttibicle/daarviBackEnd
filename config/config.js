require('dotenv').config()
const config={
    jwtSecretKey:"DarviIsInAccentNextTechNoloGies",
    mongoDBUrl:process.env.mongoDBUrl
    
}
module.exports=config;