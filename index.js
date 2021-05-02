const gradient = require('gradient-string');
var rs = require("readline-sync");
const request = require("sync-request")

const gettoken = `
 ██████╗ ███████╗████████╗    ████████╗ ██████╗ ██╗  ██╗███████╗███╗   ██╗
██╔════╝ ██╔════╝╚══██╔══╝    ╚══██╔══╝██╔═══██╗██║ ██╔╝██╔════╝████╗  ██║
██║  ███╗█████╗     ██║          ██║   ██║   ██║█████╔╝ █████╗  ██╔██╗ ██║
██║   ██║██╔══╝     ██║          ██║   ██║   ██║██╔═██╗ ██╔══╝  ██║╚██╗██║
╚██████╔╝███████╗   ██║          ██║   ╚██████╔╝██║  ██╗███████╗██║ ╚████║
 ╚═════╝ ╚══════╝   ╚═╝          ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝
`
const erreur = `
███████╗██████╗ ██████╗ ███████╗██╗   ██╗██████╗ 
██╔════╝██╔══██╗██╔══██╗██╔════╝██║   ██║██╔══██╗
█████╗  ██████╔╝██████╔╝█████╗  ██║   ██║██████╔╝
██╔══╝  ██╔══██╗██╔══██╗██╔══╝  ██║   ██║██╔══██╗
███████╗██║  ██║██║  ██║███████╗╚██████╔╝██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝                                                   
`
const a2f2 = `
 █████╗ ██████╗ ███████╗
██╔══██╗╚════██╗██╔════╝
███████║ █████╔╝█████╗  
██╔══██║██╔═══╝ ██╔══╝  
██║  ██║███████╗██║     
╚═╝  ╚═╝╚══════╝╚═╝    
`
console.clear()
console.log(gradient.morning(gettoken));
console.log(gradient.morning("\n ===============================================\n| Get token discord a2f/no-a2f dev par punchnox |\n|              discord.gg/punchnox              |\n ===============================================\n"))

var email = rs.question(gradient.cristal("Email: "))
var password = rs.question(gradient.cristal("Password: ", {
    hideEchoBack: true
}))

let sltcv = JSON.parse(request("POST", 'https://discord.com/api/v8/auth/login', {
    json: {
        "email": email,
        "password": password
    }
}).body)

function a2f() {
    console.log(gradient.instagram(a2f2));
    var code = rs.question(gradient.cristal("Entrez le code d'authentification à deux facteurs:  "))
    let r = JSON.parse(request("POST", 'https://discord.com/api/v8/auth/mfa/totp', {
        json: {
            "code": code,
            "ticket": sltcv.ticket
        }
    }).body)
    if (r.message) {
        console.clear()
        console.log(gradient.instagram(erreur));
        console.log(gradient.instagram("Le code d'authentification à deux facteurs est incorrect.\n\n"));
        a2f()
    } else {
        console.clear()
        console.log(gradient.morning(gettoken));
        console.log(gradient.cristal("Votre token est : " + r.token))
        let res = JSON.parse(request('GET', 'https://discord.com/api/v9/users/@me', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': r.token
            }
        }).body)
        if (res.premium_type == 1) {
            var n = "nitro classic"
        } else if (res.premium_type == 2) {
            var n = "nitro boost"
        } else if (res.premium_type == undefined) {
            var n = "non"
        }
        console.log(gradient.vice.multiline(`
=====================Informations=======================
Pseudo : ${res.username + "#" + res.discriminator}
Identifiant : ${res.id}
E-Mail : ${res.email}
Langue : ${res.locale}
Base64 Avatar : ${res.avatar}
Vérifié : ${res.verified ? "oui": "non"}
A2f : ${res.mfa_enabled ? "oui" : "non"}
Flags : ${res.public_flags}
Nitro : ${n}
Nsfw activé : ${res.nsfw_allowed ? "oui" : "non"}
Portable sur le compte : ${res.phone}`));
        setTimeout(function () {
            let get = JSON.parse(request('GET', 'https://discord.com/api/v6/users/@me/settings', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': r.token
                }
            }).body)
            if (get.custom_status == null) {
                var statuscustom = "pas de status custom trouvé"
            } else {
                var statuscustom = get.custom_status.text
            }
            console.log(gradient.vice.multiline(`Status : ${get.status}
Status custom : ${statuscustom}
emojis animé : ${get.animate_emoji ? "oui" : "non"}
Temps afk : ${get.afk_timeout}
Convertir des emojis en emote : ${get.convert_emoticons ? "oui" : "non"}
Mode développeur : ${get.developer_mode ? "oui" : "non"}
Tts activé : ${get.enable_tts_command ? "oui" : "non"}
Joue les gifs automatiquement : ${get.gif_auto_play ? "oui" : "non"}
Stream notification : ${get.stream_notifications_enabled ? "oui" : "non"}
Montre le jeu en cours : ${get.show_current_game ? "oui" : "non"}
Thème actuel : ${get.theme}
Intégration native du portable : ${get.native_phone_integration_enabled ? "oui" : "non"}
Détéction des plateformes : ${get.detect_platform_accounts ? "oui" : "non"}
========================================================`));
        }, 1000)
        setTimeout(function () {
            process.exit()
        }, 10 * 10000)
    }
}
if (sltcv.code === 50035) {
    console.clear();
    console.log(gradient.instagram(erreur));
    console.log(gradient.instagram("Vos identifiants sont invalides."));
    setTimeout(function () {
        process.exit()
    }, 5000)
} else if (sltcv.captcha_key) {
    console.clear();
    console.log(gradient.instagram(erreur));
    console.log(gradient.instagram("Un captcha est demandé."));
    process.exit(1);
} else if (sltcv.ticket) {
    console.clear()
    a2f()
} else {
    console.clear()
    console.log(gradient.morning(gettoken));
    console.log(gradient.cristal("Votre token est : " + sltcv.token))
    let response = JSON.parse(request('GET', 'https://discord.com/api/v9/users/@me', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': sltcv.token
        }
    }).body)
    if (response.premium_type == 1) {
        var n = "nitro classic"
    }
    if (response.premium_type == 2) {
        var n = "nitro boost"
    }
    if (response.premium_type == undefined) {
        var n = "non"
    }
    console.log(gradient.vice.multiline(`
=====================Informations=======================
Pseudo : ${response.username + "#" + response.discriminator}
Identifiant : ${response.id}
E-Mail : ${response.email}
Langue : ${response.locale}
Base64 Avatar : ${response.avatar}
Vérifié : ${response.verified ? "oui": "non"}
A2f : ${response.mfa_enabled ? "oui" : "non"}
Flags : ${response.public_flags}
Nitro : ${n}
Nsfw activé : ${response.nsfw_allowed ? "oui" : "non"}
Portable sur le compte : ${response.phone}`))
    setTimeout(function () {
        let res2 = JSON.parse('GET', 'https://discord.com/api/v9/users/@me/settings', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: res.body.token
            }
        })
        if (res2.custom_status == null) {
            var statuscustom = "pas de status custom trouvé"
        } else {
            var statuscustom = res2.custom_status.text
        }
        console.log(gradient.vice.multiline(`Status : ${res2.status}
Status custom : ${statuscustom}
emojis animé : ${res2.animate_emoji ? "oui" : "non"}
Temps afk : ${res2.afk_timeout}
Convertir des emojis en emote : ${res2.convert_emoticons ? "oui" : "non"}
Mode développeur : ${res2.developer_mode ? "oui" : "non"}
Tts activé : ${res2.enable_tts_command ? "oui" : "non"}
Joue les gifs automatiquement : ${res2.gif_auto_play ? "oui" : "non"}
Stream notification : ${res2.stream_notifications_enabled ? "oui" : "non"}
Montre le jeu en cours : ${res2.show_current_game ? "oui" : "non"}
Thème actuel : ${res2.theme}
Intégration native du portable : ${res2.native_phone_integration_enabled ? "oui" : "non"}
Détéction des plateformes : ${res2.detect_platform_accounts ? "oui" : "non"}
========================================================`));
    }, 1000)
}
setTimeout(function () {
    process.exit()
}, 10 * 10000)
