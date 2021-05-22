//Skore
let score = 0;

//Pole otazok na kviz
const otazky = [
    {
        otazka: 'Co je ikonická hračka z 80.let?', 
        odpovedi: {
            0: 'Kočičák',
            1: 'Mončičák',
            2: 'Opičák'
        },
        obrazek: 'obrazky/moncicak.jpg',
        odpoved: 1,
        tvojeOdpoved: 0
    },
    {
        otazka: 'Jaké je Matějovo nejoblíbenější ovoce?', 
        odpovedi: {
            0: 'Kokos',
            1: 'Molounek',
            2: 'Jahoda',
            3: 'Ani jedna z možností'
        },
        obrazek: 'obrazky/ovoce.jpg',
        odpoved: 2,
        tvojeOdpoved: 0
    },
    {
        otazka: 'Pro úspěšné absolvování kurzu je potřeba..', 
        odpovedi: {
            0: 'Umět JavaScript',
            1: 'Chodit po kurzu do hospody'
        },
        obrazek: 'obrazky/pivo.jpg',
        odpoved: 0,
        tvojeOdpoved: 0 
    },
    {
        upperText: 'Tvoje hodnocení',
        lowerText: ''
    }
];

//Cislo otazky
let questionNumber = 0;
let storedSpan = document.getElementById("cislo");

//Zobrazenie otazky
let otazkaHTML = document.getElementById('otazka');


//Foto
let foto = document.createElement('img');
foto.setAttribute("id","obrazek");
let classFoto = document.getElementById('classFoto');

//Odpovedi v li
let listView = document.getElementById('odpovedi');

reload();

listView.addEventListener("click", function(e) {
    if(e.target.id.toString() == (questionNumber.toString() +  otazky[questionNumber]?.odpoved)) // score evaluation under construct
    {
        score++;
    }
    console.log(e.target.id);

    otazky[questionNumber].tvojeOdpoved = parseInt(e.target.id[1]);
    console.log(e.target.id);

    console.log(score);
    console.log(otazky[questionNumber].odpoved)
    console.log(e.target.id);

    questionNumber++;
    console.log(questionNumber);
    if(questionNumber > 2)
    {
        console.log("called!");
        renderLastPage();
    }
    else
    {
        console.log("called else");
        reload();
    }
});

function reload() {
    otazkaHTML.firstChild.remove();
    classFoto.firstChild.remove();

    storedSpan.innerHTML = "";
    let contentSpan = document.createTextNode(questionNumber + 1);
    storedSpan.appendChild(contentSpan);
    listView.innerHTML = "";

    for(let index in otazky[questionNumber].odpovedi)
    {
        let liElement = document.createElement('li');
        liElement.innerHTML = otazky[questionNumber].odpovedi[index];
        liElement.id = questionNumber.toString() + index.toString()
        listView.appendChild(liElement);
    }

    let fotoSRC = otazky[questionNumber].obrazek;
    foto.src = fotoSRC;
    if(fotoSRC)
    {
        classFoto.appendChild(foto);
    }
    let otazka = document.createTextNode(otazky[questionNumber].otazka);
    otazkaHTML.appendChild(otazka);
}

function returnLowerText(points)
{
    let text = 'Správně ' + points.toString() + ' ze 3 otázek, úspěšnost ';

    switch(points)
    {
        case 0:
            return text + '0 %.';
        case 1:
            return text + '33 %.';
        case 2:
            return text + '67 %.';
        case 3:
            return text + '100 %.';
        default: return 'undefined';
    }
}

function renderLastPage()
{
    console.log(otazky);
    let whiteRectangle = document.getElementsByClassName('kviz')[0];
    whiteRectangle.innerHTML = "";
    otazky[3].lowerText = returnLowerText(score);
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    h2.innerText = otazky[3].upperText;
    div.appendChild(h2);
    for(let index in otazky)
    {
        if(index < otazky.length - 1)
        {
            let li = document.createElement('li');
            let div1 = document.createElement('div'); 
            div1.innerText = otazky[index].otazka;
            let div2 = document.createElement('div'); 
            let i = otazky[index].tvojeOdpoved;
            div2.innerText = otazky[index].odpovedi[i];
            let p = document.createElement('p');
            let div3 = document.createElement('div');
            div3.innerText = "";
            if(otazky[index].tvojeOdpoved == otazky[index].odpoved)
            {
                div3.innerText = "To je SPRÁVNĚ";
            }
            else
            {
                div3.innerText = "Správná odpověď: " + otazky[index].odpovedi[otazky[index].odpoved];
            }
            li.appendChild(div1);
            //li.appendChild(p);
            li.appendChild(div2);
            //li.appendChild(p);
            li.appendChild(div3);
            div.appendChild(li);
        }
    }
    let h22 = document.createElement('h2');
    h22.innerText = otazky[questionNumber].lowerText;
    div.appendChild(h22);
    console.log(div);
    whiteRectangle.appendChild(div);
    console.log(whiteRectangle);
}