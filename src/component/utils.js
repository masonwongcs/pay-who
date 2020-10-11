export const convertToBase64 = (string) => {
  return btoa(string)
}

export const convertFromBase64 = (string) => {
  return atob(string)
}

export const isEmpty = (obj) => {
  for(let key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

export const injectToSearch = ()=> {

}
