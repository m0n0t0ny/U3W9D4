class CapoAbbigliamento {
  id: number;
  codprod: number;
  collezione: string;
  capo: string;
  modello: number;
  quantita: number;
  colore: string;
  prezzoivaesclusa: number;
  prezzoivainclusa: number;
  disponibile: string;
  saldo: number;

  constructor(
    id: number,
    codprod: number,
    collezione: string,
    capo: string,
    modello: number,
    quantita: number,
    colore: string,
    prezzoivaesclusa: number,
    prezzoivainclusa: number,
    disponibile: string,
    saldo: number
  ) {
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
  }

  getPrezzoIvaInclusa(): number {
    return this.prezzoivainclusa;
  }

  getSaldoCapo(): string {
    const prezzoScontato =
      this.prezzoivainclusa - (this.prezzoivainclusa / 100) * this.saldo;
    return prezzoScontato.toFixed(2);
  }
}

fetch("https://mocki.io/v1/3381bee8-fea8-482e-a1e4-08ed54c2cae6")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Errore nella richiesta HTTP");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Dati dall'API:", data);

    const capiAbbigliamento: CapoAbbigliamento[] = data.map(
      (item: CapoAbbigliamento) => {
        return new CapoAbbigliamento(
          item.id,
          item.codprod,
          item.collezione,
          item.capo,
          item.modello,
          item.quantita,
          item.colore,
          item.prezzoivaesclusa,
          item.prezzoivainclusa,
          item.disponibile,
          item.saldo
        );
      }
    );

    capiAbbigliamento.forEach(async (capo: CapoAbbigliamento) => {
      const get = document.getElementById("get") as HTMLElement;

      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-md-4 col-lg-3 g-3";
      get.appendChild(col);

      const card = document.createElement("div");
      card.className = "card";
      col.appendChild(card);

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      card.appendChild(cardBody);

      const cardImg = document.createElement("div");
      cardImg.className = "card-img-top";
      cardBody.appendChild(cardImg);

      const h5 = document.createElement("h5");
      h5.className = "card-title mb-3";
      h5.style.textTransform = "capitalize";
      h5.innerText = capo.capo;
      cardBody.appendChild(h5);

      const saldo = document.createElement("p");
      saldo.className = "card-text mb-3";
      saldo.innerHTML = `Saldo: <span class="text-danger fw-bold">${capo.saldo}%</span>`;
      cardBody.appendChild(saldo);

      const prezzoIniziale = document.createElement("p");
      prezzoIniziale.className = "card-text";
      prezzoIniziale.innerHTML = `Prezzo iniziale: <span class="fw-bold">${capo.getPrezzoIvaInclusa()}€</span>`;
      cardBody.appendChild(prezzoIniziale);

      const prezzoScontato = document.createElement("p");
      prezzoScontato.className = "card-text";
      prezzoScontato.innerHTML = `Prezzo scontato: <span class="text-success fw-bold">${capo.getSaldoCapo()}€</span>`;
      cardBody.appendChild(prezzoScontato);
    });
  })
  .catch((error) => {
    console.error("Errore:", error);
  });
