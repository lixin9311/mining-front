export function getUrlParam(key: string): string {
  const str = window.location.hash.substring(2).split('?');
  if (str.length !== 2) {
    return '';
  }
  const temp = decodeURIComponent(str[1]).split('&')
    .map((v) => v.split('='))
    .filter((v) => (v[0] === key) ? true : false);
  if (temp.length < 1) {
    return '';
  }
  return temp[0][1];
}

export function str2char(str: string): Uint8Array {
  const buf = new Uint8Array(str.length);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
}

export function char2str(buf: Uint8Array): string {
  return String.fromCharCode.apply(null, buf);
}
