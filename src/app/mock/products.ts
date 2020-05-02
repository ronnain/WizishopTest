import { Product, ProductDetail } from '../interfaces';


export const PRODUCTS : Product[] = [
    {
        id: 1,
        name: "Oreiller blanc",
        price: 75.00,
        desc: "Super oreiller, forme idéale pour dormir serein.",
        categories: ["pillow"],
        imgPath: "assets/oreiller.jpg"
    },
    {
        id: 2,
        name: "Oreiller blanc",
        price: 75.00,
        desc: "Super oreiller, forme idéale pour dormir serein.",
        categories: ["pillow"],
        imgPath: "assets/oreiller.jpg"
    },
    {
        id: 3,
        name: "Oreiller blanc",
        price: 75.00,
        desc: "Super oreiller, forme idéale pour dormir serein.",
        categories: ["pillow"],
        imgPath: "assets/oreiller.jpg"
    },
    {
        id: 4,
        name: "Oreiller blanc",
        price: 75.00,
        desc: "Super oreiller, forme idéale pour dormir serein.",
        categories: ["pillow"],
        imgPath: "assets/oreiller.jpg"
    }
]

const bigtext = `Haec ubi latius fama vulgasset missaeque relationes adsiduae Gallum Caesarem permovissent, quoniam magister equitum longius ea tempestate distinebatur, iussus comes orientis Nebridius contractis undique militaribus copiis ad eximendam periculo civitatem amplam et oportunam studio properabat ingenti, quo cognito abscessere latrones nulla re amplius memorabili gesta, dispersique ut solent avia montium petiere celsorum.

Et quoniam inedia gravi adflictabantur, locum petivere Paleas nomine, vergentem in mare, valido muro firmatum, ubi conduntur nunc usque commeatus distribui militibus omne latus Isauriae defendentibus adsueti. circumstetere igitur hoc munimentum per triduum et trinoctium et cum neque adclivitas ipsa sine discrimine adiri letali, nec cuniculis quicquam geri posset, nec procederet ullum obsidionale commentum, maesti excedunt postrema vi subigente maiora viribus adgressuri.

Fuerit toto in consulatu sine provincia, cui fuerit, antequam designatus est, decreta provincia. Sortietur an non? Nam et non sortiri absurdum est, et, quod sortitus sis, non habere. Proficiscetur paludatus? Quo? Quo pervenire ante certam diem non licebit. ianuario, Februario, provinciam non habebit; Kalendis ei denique Martiis nascetur repente provincia.`;

const text = `Raptim igitur properantes ut motus sui rumores celeritate nimia praevenirent, vigore corporum ac levitate confisi per flexuosas semitas ad summitates collium tardius evadebant. et cum superatis difficultatibus arduis ad supercilia venissent fluvii Melanis alti et verticosi, qui pro muro tuetur accolas circumfusus, augente nocte adulta terrorem quievere paulisper lucem opperientes. arbitrabantur enim nullo inpediente transgressi inopino adcursu adposita quaeque vastare, sed in cassum labores pertulere gravissimos.`;

export const PROUCTS_DETAILS : ProductDetail[] = [
    {
        id: 1,
        idProduct: 1,
        detailDesc: bigtext,
        technicalData: text,
    },
    {
        id: 2,
        idProduct: 2,
        detailDesc: bigtext,
        technicalData: text,
    },
    {
        id: 3,
        idProduct: 3,
        detailDesc: bigtext,
        technicalData: text,
    },
    {
        id: 4,
        idProduct: 4,
        detailDesc: bigtext,
        technicalData: text,
    }
]

