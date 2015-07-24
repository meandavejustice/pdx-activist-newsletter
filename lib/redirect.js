module.exports = function (req, res, path) {
  res.writeHead(302, {
    'Location': path
  });
  res.end();
}
