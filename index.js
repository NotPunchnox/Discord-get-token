const gradient = require('gradient-string');
var snekfetck = require("snekfetch");
var rs = require("readline-sync");
const request = require("request")

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
var password = rs.question(gradient.cristal("Password: "))


snekfetck.post("https://discord.com/api/v8/auth/login").send({
    "email": email,
    "password": password
}).end((err, res) => {
    function a2f() {
        console.log(gradient.instagram(a2f2));
        var code = rs.question(gradient.cristal("Entrez le code d'authentification à deux facteurs:  "))
        snekfetck.post("https://discord.com/api/v8/auth/mfa/totp").send({
            "code": code,
            "ticket": res.body.ticket
        }).end((err, res2) => {
            if (res2.body.message) {
                console.clear()
                console.log(gradient.instagram(erreur));
                console.log(gradient.instagram("Le code d'authentification à deux facteurs est incorrect.\n\n"));
                a2f()
            } else {
                console.clear()
                console.log(gradient.morning(gettoken));
                console.log(gradient.cristal("Votre token est : " + res2.body.token))
                request({
                    uri: `https://discord.com/api/v6/users/@me`,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: res2.body.token
                    },
                    json: true,
                    method: "GET"
                }, function (err, response, status) {
                    var response = response.body;
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
Portable sur le compte : ${response.phone}`));
                })
                setTimeout(function () {
                    request({
                        uri: `https://discord.com/api/v6/users/@me/settings`,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: res2.body.token
                        },
                        json: true,
                        method: "GET"
                    }, function (err, response, status) {
                        var response = response.body;
                        if (response.custom_status == null) {
                            var statuscustom = "pas de status custom trouvé"
                        } else {
                            var statuscustom = response.custom_status.text
                        }
                        console.log(gradient.vice.multiline(`Status : ${response.status}
Status custom : ${statuscustom}
emojis animé : ${response.animate_emoji ? "oui" : "non"}
Temps afk : ${response.afk_timeout}
Convertir des emojis en emote : ${response.convert_emoticons ? "oui" : "non"}
Mode développeur : ${response.developer_mode ? "oui" : "non"}
Tts activé : ${response.enable_tts_command ? "oui" : "non"}
Joue les gifs automatiquement : ${response.gif_auto_play ? "oui" : "non"}
Stream notification : ${response.stream_notifications_enabled ? "oui" : "non"}
Montre le jeu en cours : ${response.show_current_game ? "oui" : "non"}
Thème actuel : ${response.theme}
Intégration native du portable : ${response.native_phone_integration_enabled ? "oui" : "non"}
Détéction des plateformes : ${response.detect_platform_accounts ? "oui" : "non"}
========================================================`));
                    });
                }, 1000)
                setTimeout(function () {
                    process.exit()
                }, 10 * 10000)
            }
        })
    }

    if (res.body.code === 50035) {
        console.clear();
        console.log(gradient.instagram(erreur));
        console.log(gradient.instagram("Vos identifiants sont invalides."));
        setTimeout(function () {
            process.exit()
        }, 5000)
    } else if (res.body.captcha_key) {
        console.clear();
        console.log(gradient.instagram(erreur));
        console.log(gradient.instagram("Un captcha est demandé."));
        process.exit(1);
    } else if (res.body.ticket) {
        console.clear()
        a2f()
    } else {
        console.clear()
        console.log(gradient.morning(gettoken));
        console.log(gradient.cristal("Votre token est : " + res.body.token))
        request({
            uri: `https://discord.com/api/v6/users/@me`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: res.body.token
            },
            json: true,
            method: "GET"
        }, function (err, response, status) {
            var response = response.body;
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
Portable sur le compte : ${response.phone}`));
        })
        setTimeout(function () {
            request({
                uri: `https://discord.com/api/v6/users/@me/settings`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: res.body.token
                },
                json: true,
                method: "GET"
            }, function (err, response, status) {
                var response = response.body;
                if (response.custom_status == null) {
                    var statuscustom = "pas de status custom trouvé"
                } else {
                    var statuscustom = response.custom_status.text
                }
                console.log(gradient.vice.multiline(`Status : ${response.status}
Status custom : ${statuscustom}
emojis animé : ${response.animate_emoji ? "oui" : "non"}
Temps afk : ${response.afk_timeout}
Convertir des emojis en emote : ${response.convert_emoticons ? "oui" : "non"}
Mode développeur : ${response.developer_mode ? "oui" : "non"}
Tts activé : ${response.enable_tts_command ? "oui" : "non"}
Joue les gifs automatiquement : ${response.gif_auto_play ? "oui" : "non"}
Stream notification : ${response.stream_notifications_enabled ? "oui" : "non"}
Montre le jeu en cours : ${response.show_current_game ? "oui" : "non"}
Thème actuel : ${response.theme}
Intégration native du portable : ${response.native_phone_integration_enabled ? "oui" : "non"}
Détéction des plateformes : ${response.detect_platform_accounts ? "oui" : "non"}
========================================================`));
            });
        }, 1000)
        setTimeout(function () {
            process.exit()
        }, 10 * 10000)
    }
})