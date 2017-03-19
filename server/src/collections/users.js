const schema = {
  email: String,

  password: {
    hash: String,
    algorithm: String,
    round: Number
  }
}