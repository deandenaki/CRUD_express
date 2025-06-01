// middleware/blockBrowser.js
function blockBrowser(req, res, next) {
  const accept = req.get('Accept') || '';

  if (accept.includes('text/html')) {
    return res.status(403).send('404 not found');
  }else{
    return next()
  }

}

module.exports = blockBrowser;
