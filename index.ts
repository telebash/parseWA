import { Browsers } from "@adiwajshing/baileys"
import { connectToWhatsApp, getProfilePicUrl } from "./whatsapp"

const main = async () => {
    const sock = await connectToWhatsApp('my_session', Browsers.macOS('Safari'))

    const picKenya = await getProfilePicUrl(sock, '77004777490')
    console.log(picKenya)
}

main()
