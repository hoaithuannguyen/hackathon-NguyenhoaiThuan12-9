function uuid() {
    return Math.floor(Math.random() * 9999999999) + new Date().getMilliseconds();
}

let flag = true;
let cards = [
    { id: uuid(), number: 66666, date: "18 / 8", cvc: "***", img: "img" },
    { id: uuid(), number: 66666, date: "28 / 8", cvc: "***", img: "img" }
];

function showCards() {
    let result = "";
    for (let i = 0; i < cards.length; i++) {
        let cardNumber = String(cards[i].number);
        let hiddenNumber = "******" + cardNumber.slice(-4);
        let hiddenCVC = "***";

        result +=
            `
                <tr>
                    <td><img src="./images/z4686191427089_6bfc4335bcd1f0e86739f8b90c469db4.jpg" alt="" id="img1" class="img"></td>
                    <td>${hiddenNumber}</td>
                    <td>${cards[i].date}</td>
                    <td>${hiddenCVC}</td>
                    <td><button>View</button></td>
                    <td><button onclick="showFormUpdate(${cards[i].id})">Edit</button></td>
                    <td><button onclick="deleteCard(${cards[i].id})">Delete</button></td>
                </tr>
                `;
    }
    document.getElementById("tbody").innerHTML = result;
}

showCards();

function addCard() {
    let input1 = document.getElementById("input1").value;
    let input2 = document.getElementById("input2").value;
    let input3 = document.getElementById("input3").value;

    let card = {
        id: uuid(),
        number: input1,
        date: input2,
        cvc: input3,
        img: ""
    }
    cards.push(card);
    showCards();
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
}

function deleteCard(id) {
    console.log(id);
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].id == id) {
            if ((confirm("Bạn có muốn xóa không?"))) {
                cards.splice(i, 1);
            }
        }
        showCards();
    }
}

let selectedIndex;
function showFormUpdate(id) {

    flag = false;
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].id == id) {
            document.getElementById("input1").value = cards[i].number;
            document.getElementById("input2").value = cards[i].date;
            document.getElementById("input3").value = cards[i].cvc;
        }
    }
    selectedIndex = id;
}

function activeSave() {
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].id == selectedIndex) {
            cards[i].number = document.getElementById("input1").value;
            cards[i].date = document.getElementById("input2").value;
            cards[i].cvc = document.getElementById("input3").value;

        }
    }
    showCards();
    flag = true;
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
}

function addNewOrEdit(e) {
    e.preventDefault()

    if (flag) {
        addCard();
    } else {
        activeSave();
    }
}


