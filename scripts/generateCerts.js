const forge = require('node-forge');
const fs = require('fs');

const keys = forge.pki.rsa.generateKeyPair(2048);
const cert = forge.pki.createCertificate();
cert.publicKey = keys.publicKey;
cert.serialNumber = '01';
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

const attrs = [{ name: 'commonName', value: 'localhost' }];
cert.setSubject(attrs);
cert.setIssuer(attrs);

cert.sign(keys.privateKey);

const pemKey = forge.pki.privateKeyToPem(keys.privateKey);
const pemCert = forge.pki.certificateToPem(cert);

fs.mkdirSync('./gateway/certs', {recursive: true});
fs.writeFileSync('./gateway/certs/server.key', pemKey);
fs.writeFileSync('./gateway/certs/server.crt', pemCert);

console.log('Certificates generated via node-forge successfully.');
