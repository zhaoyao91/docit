const schema = {
  email: String,

  password: {
    hash: String,
    encryptOptions: Object
  }
}