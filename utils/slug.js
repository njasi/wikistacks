const alpha = "abcdefghijklmnopqrstuvwxyz 123456789"
function slug(title){
  let remove_non_alpha = "";
  for(let i = 0; i < title.length;i++){
    if(alpha.indexOf(title[i].toLowerCase()) != -1){
      remove_non_alpha += title[i];
    }
  }
  return remove_non_alpha.split(" ").join("_");
}

module.exports = slug;
