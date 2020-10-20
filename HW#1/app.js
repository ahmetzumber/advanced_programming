const numberOfEvents = 9; // number of events
const L = [0.5, 1, 1.5, 2, 2.5, 3]; // lambda
const p = [];

for (let λ of L) {
  p.push(Math.exp(-λ));
}

function makeRows(m, n) {
  let row = "<th></th>";

  for (let j = 0; j < L.length; j++) 
        row += "<th>" + "λ=" + L[j] + "</th>";

  let text = "<tr>" + row + "</tr>";
  for (let i = 0; i < m; i++) {
    row = "<th>" + "x=" + i + "</th>";
    if (i != 0) {   // ilk satir hazir verildigi icin
      for (let j = 0; j < p.length; j++) {
        p[j] = (p[j] * L[j]) / i;
      }
    }
    for (let k = 0; k < n; k++) {
        row += "<td>"+(p[k]).toFixed(4)+"</td>";
    }
    text += "<tr>" + row + "</tr>";
  }
  tablo.innerHTML = text;
}

title.innerText = document.title;
sample.innerText = makeRows.toString();
makeRows(numberOfEvents, L.length);
