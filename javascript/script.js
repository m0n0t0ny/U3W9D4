var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var CapoAbbigliamento = /** @class */ (function () {
    function CapoAbbigliamento(id, codprod, collezione, capo, modello, quantita, colore, prezzoivaesclusa, prezzoivainclusa, disponibile, saldo, url) {
        this.id = id;
        this.codprod = codprod;
        this.collezione = collezione;
        this.capo = capo;
        this.modello = modello;
        this.quantita = quantita;
        this.colore = colore;
        this.prezzoivaesclusa = prezzoivaesclusa;
        this.prezzoivainclusa = prezzoivainclusa;
        this.disponibile = disponibile;
        this.saldo = saldo;
        this.url = url;
    }
    CapoAbbigliamento.prototype.getPrezzoIvaInclusa = function () {
        return this.prezzoivainclusa;
    };
    CapoAbbigliamento.prototype.getSaldoCapo = function () {
        var prezzoScontato = this.prezzoivainclusa - (this.prezzoivainclusa / 100) * this.saldo;
        return prezzoScontato.toFixed(2);
    };
    return CapoAbbigliamento;
}());
fetch("https://mocki.io/v1/1a4289c8-f0bc-4b79-a4bc-4b2ee139c178")
    .then(function (response) {
    if (!response.ok) {
        throw new Error("Errore nella richiesta HTTP");
    }
    return response.json();
})
    .then(function (data) {
    console.log("Dati dall'API:", data);
    var capiAbbigliamento = data.map(function (item) {
        return new CapoAbbigliamento(item.id, item.codprod, item.collezione, item.capo, item.modello, item.quantita, item.colore, item.prezzoivaesclusa, item.prezzoivainclusa, item.disponibile, item.saldo, item.url);
    });
    capiAbbigliamento.forEach(function (capo) { return __awaiter(_this, void 0, void 0, function () {
        var get, col, card, cardBody, cardImg, h5, saldo, prezzoIniziale, prezzoScontato;
        return __generator(this, function (_a) {
            get = document.getElementById("get");
            col = document.createElement("div");
            col.className = "col-12 col-sm-6 col-md-4 col-lg-3 g-5";
            get.appendChild(col);
            card = document.createElement("div");
            card.className = "card border-0";
            col.appendChild(card);
            cardBody = document.createElement("div");
            cardBody.className = "card-body";
            card.appendChild(cardBody);
            cardImg = document.createElement("img");
            cardImg.className = "card-img-top mb-3 rounded-3";
            cardImg.src = capo.url;
            cardBody.appendChild(cardImg);
            h5 = document.createElement("h5");
            h5.className = "card-title mb-3";
            h5.style.textTransform = "capitalize";
            h5.innerText = capo.capo;
            cardBody.appendChild(h5);
            saldo = document.createElement("p");
            saldo.className = "card-text mb-1";
            saldo.innerHTML = "Saldo: <span class=\"text-danger fw-bold\">".concat(capo.saldo, "%</span>");
            cardBody.appendChild(saldo);
            prezzoIniziale = document.createElement("p");
            prezzoIniziale.className = "card-text mb-1";
            prezzoIniziale.innerHTML = "Prezzo iniziale: <del class=\"fw-bold\">".concat(capo.getPrezzoIvaInclusa(), "\u20AC</del>");
            cardBody.appendChild(prezzoIniziale);
            prezzoScontato = document.createElement("p");
            prezzoScontato.className = "card-text mb-1";
            prezzoScontato.innerHTML = "Prezzo scontato: <span class=\"text-success fw-bold\">".concat(capo.getSaldoCapo(), "\u20AC</span>");
            cardBody.appendChild(prezzoScontato);
            return [2 /*return*/];
        });
    }); });
})
    .catch(function (error) {
    console.error("Errore:", error);
});
