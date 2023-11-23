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
  url: string;

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
    saldo: number,
    url: string
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
    this.url = url;
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

fetch("https://mocki.io/v1/1a4289c8-f0bc-4b79-a4bc-4b2ee139c178")
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
          item.saldo,
          item.url
        );
      }
    );

    capiAbbigliamento.forEach(async (capo: CapoAbbigliamento) => {
      const get = document.getElementById("get") as HTMLElement;

      const col = document.createElement("div");
      col.className = "col-6 col-sm-6 col-md-4 col-lg-3 g-5";
      get.appendChild(col);

      const card = document.createElement("div");
      card.className = "card border-0";
      col.appendChild(card);

      const cardBody = document.createElement("div");
      cardBody.className = "card-body shadow-sm rounded-3";
      card.appendChild(cardBody);

      const cardImg = document.createElement("img");
      cardImg.className = "card-img-top mb-3 rounded-3";
      cardImg.src = capo.url;
      cardBody.appendChild(cardImg);

      const h5 = document.createElement("h5");
      h5.className = "card-title mb-3";
      h5.style.textTransform = "capitalize";
      h5.innerText = capo.capo;
      cardBody.appendChild(h5);

      const saldo = document.createElement("p");
      saldo.className = "card-text mb-1";
      saldo.innerHTML = `Saldo: <span class="text-danger fw-bold">${capo.saldo}%</span>`;
      cardBody.appendChild(saldo);

      const prezzoIniziale = document.createElement("p");
      prezzoIniziale.className = "card-text mb-1";
      prezzoIniziale.innerHTML = `Prezzo iniziale: <del class="fw-bold">${capo.getPrezzoIvaInclusa()}€</del>`;
      cardBody.appendChild(prezzoIniziale);

      const prezzoScontato = document.createElement("p");
      prezzoScontato.className = "card-text mb-1";
      prezzoScontato.innerHTML = `Prezzo scontato: <span class="text-success fw-bold">${capo.getSaldoCapo()}€</span>`;
      cardBody.appendChild(prezzoScontato);
    });
  })
  .catch((error) => {
    console.error("Errore:", error);
  });
