export class LoadBase64 {
    base64ToArrayBuffer(base64: string) {
        const binary_string = window.atob(base64)
        const length = binary_string.length
        const bytes = new Uint8Array(length)
        
        for (let index = 0; index < length; index++) {
            bytes[index] = binary_string.charCodeAt(index)
        }

        return bytes.buffer
         
    }
}