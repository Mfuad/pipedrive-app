export default async (error, req, res, next) => {
  console.log(error);
  res.status(500).json(error.stack);
};
