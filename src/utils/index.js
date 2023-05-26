// a function for converting  base64 to ArrayBuffer
export  function base64ToArrayBuffer(base64) {
    let binary_string =  window.atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array( len );
    for (let i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}
// a function for adding the every number in the array
export function arrayAdd(a){return a.reduce((i,a)=>i+a,0)}