const express = require("express")
const be = require("./be")
const bl = require("./bl")
const path = require("path")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("views"))
app.use(express.static("public"))

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));

let result = ""

const rejected = {
    nama:"Abdul Rafi",
    jabatan:"",
    keterangan:"STURI",
    wa:"",
    kadept:"",
    rejected:true
}

app.get("/", (req, res) => {
    res.render("search", {result})
})

const namas = [
    {id:1,nama:"Keyzar"},
    {id:2, nama:"Keyzar"}
]

app.post("/search", (req, res) => {
    const {nama} = req.body
    const resultBL = bl.find((staff) => staff.nama.toLowerCase().includes(nama.toLowerCase()))
    if(resultBL === undefined){
        const resultBE = be.find((staff) => staff.nama.toLowerCase().includes(nama.toLowerCase()));
        result = resultBE;
        if(resultBE === undefined){
            const obj = {}
            obj.nama = nama;
            obj.jabaran = "",
            obj.keterangan ="",
            result = obj
        }
        switch (result.keterangan) {
            case "Sekretaris":
                result.wa = "https://wa.me/6285392064099";
                result.kadept = "Izlal Chaidar";
                break;
            case "Bendahara":
                result.wa = "https://wa.me/6281382635606";
                result.kadept = "Auliya Rizky Ananda";
                break;
            case "PSDO":
                result.wa = "https://wa.me/6281462236231";
                result.kadept = "Muhamad Praja";
                break;
            case "PSDM":
                result.wa = "https://wa.me/6289660508305";
                result.kadept = "Permana Fadilah";
                break;
            case "SOSPOL":
                result.wa = "https://wa.me/6289602381513";
                result.kadept = "Tasya Syabila";
                break;
            case "STURI":
                result.wa = "https://wa.me/6285759040420";
                result.kadept = "Arditya Baskara";
                break;
            case "KOMINFO":
                result.wa = "https://wa.me/6285776816895";
                result.kadept = "Rizky Arghiya";
                break;
            case "ADKESMA":
                result.wa = "https://wa.me/6282122540285";
                result.kadept = "Nabilah Khairunnisa";
                break;
            case "KWU":
                result.wa = "https://wa.me/6285707400991";
                result.kadept = "Utsman Ahmad";
                break;
            default:
                // Handle default case if necessary
        }
        
    }else if(resultBL !== undefined){
        result = resultBL
        result.wa = "https://chat.whatsapp.com/BsOTVpmxCnbE62AL5XfYN1"
        result.kadept = "Grup WhatsApp BL"
    }
    if(result.jabatan === ""){
        result.jabatan = "Staff"
    }
    if(rejected.nama.toLowerCase().includes(result.nama.toLowerCase())){
        result.rejected = true;
    }else{
        result =""
    }

    console.log(result)
    res.redirect("/#anouncement")
})

app.listen(3000, '0.0.0.0',() => {
    console.log("Run")
})