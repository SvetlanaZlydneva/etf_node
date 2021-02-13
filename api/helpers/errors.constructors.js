class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
exports.UnAuthorizedError = class UnAuthorizedError extends (
  MyError
) {
  constructor(message) {
    super(message);
    this.status = 401;
  }
};

exports.UnValidDataError = class UnValidDataError extends (
  MyError
) {
  constructor(message) {
    super(message);
    this.status = 400;
  }
};

exports.UnUniqError = class UnUniqError extends (
  MyError
) {
  constructor(message) {
    super(message);
    this.status = 409;
  }
};

exports.NotFoundError = class NotFoundError extends (
  MyError
) {
  constructor(message) {
    super(message);
    this.status = 404;
  }
};
