export default (req, res, next) => {
  req.time = new Date(Date.now()).toUTCString();
  console.log(req.method, "\t", req.hostname, "\t", req.path, "\t\t", req.time);
  next();
};
