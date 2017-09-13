
function downloadOptions(config){
  const { enabled } = config.get("downloadOptions");

  if(enabled){
    return function(res){
      res.setHeader('X-Download-Options', 'noopen');
    }
  }
}

export default downloadOptions;
