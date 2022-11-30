import { create, Whatsapp } from 'venom-bot'

create('testSession', (base64Qr, asciiQR, attempts, urlCode) => {
    console.log('Number of attempts to read the qrcode: ', attempts)
    console.log('Terminal qrcode: ', asciiQR)
    console.log('base64 image string qrcode: ', base64Qr)
    console.log('urlCode (data-ref): ', urlCode)
})
.then((client) => start(client))
.catch((erro) => {
    console.log(erro)
})

const start = async (client) => {
    const url = await client.getProfilePicFromServer('77479578434@c.us')
    console.log(url)
}
