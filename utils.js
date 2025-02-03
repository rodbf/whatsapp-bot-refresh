export function normalize(str){
  return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/\beh\b/g, ' e ');
}