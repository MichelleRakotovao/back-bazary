import qr from "qrcode";
// const data = {
//     libelle: "Robe moulante",
//     quantite: 1,
//     taille: "M"
// }
const data = "https://www.example.com"

const Options = {
    errorCorrectionLevel: 'H',
    type: "image/png",
    quality: 0.92,
    margin: 1,
}
qr.toFile("qrcode.png", data, Options, err => {
    if (err) {
        console.log(err);
    } else {
        console.log("qrcode crée avec succès")
    }
})