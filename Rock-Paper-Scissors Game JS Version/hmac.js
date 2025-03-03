class HMAC {
    constructor() {
        this.secretKey = this.generateKey();
    }

    generateKey() {
        return crypto.getRandomValues(new Uint8Array(32)).toString();
    }

    generateHMAC(move) {
        const encoder = new TextEncoder();
        const keyData = encoder.encode(this.secretKey);
        const moveData = encoder.encode(move);

        return crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
            .then(key => crypto.subtle.sign('HMAC', key, moveData))
            .then(signature => Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join(''));
    }
}