import { Boom } from "@hapi/boom";
import makeWASocket, { DisconnectReason, useMultiFileAuthState, Browsers, WABrowserDescription } from "@adiwajshing/baileys";
import { sleep } from "./utils";

export const connectToWhatsApp = async (sessionName: string, browser?: WABrowserDescription | undefined) => {
    const { state, saveCreds } = await useMultiFileAuthState(sessionName);
    const sock = makeWASocket({
        auth: state,
        browser: browser || Browsers.macOS('Safari'),
        connectTimeoutMs: 30_000,
    })

    await sleep(5000)

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect)
            if(shouldReconnect) {
                connectToWhatsApp(sessionName)
            }
        } else if(connection === 'open') {
            console.log('opened connection')
        }
    })
    sock.ev.on('creds.update', saveCreds)

    return sock
}

export const getProfilePicUrl = async (sock: any, number: string): Promise<string> => {
    const jid = number + '@s.whatsapp.net'
    try {
        const url = await sock.profilePictureUrl(jid, 'image')
        return url
    } catch (error) {
        console.log(error)
        return ''
    }
}
