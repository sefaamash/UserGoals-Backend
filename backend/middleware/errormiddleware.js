const errhand = (err, req, res, next) => {
  const statuscode = res.statuscode ? res.statuscode : 500;
  res.status(statuscode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack, //this stack will only be shown if app is in development phase otherwise in produxtion it will be null
  });
};
module.exports = { errhand };

/* stack here in res.json  is a very helpful debugging tool. It is a list of the method calls that the application was in the 
middle of when an Exception was thrown. This is very useful because it doesn't only show you where the error happened, but also how the program ended 
up in that place of the code. Just like the reason we call it 'stack' is because stack is First in Last out (FILO)*/
