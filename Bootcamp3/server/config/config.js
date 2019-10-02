//This file holds any configuration variables we may need 
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: 'mongodb+srv://guest:mRQVfocXlkvwjf3u@bootcamp3-rsdme.mongodb.net/test?retryWrites=true&w=majority'//URI of mongo database
  }, 
  openCage: {
    key: '1478a18f42bb402495ec665efb0f2572' // openCage public key
  },
  port: 8080
};