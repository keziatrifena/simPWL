const list = document.getElementById("listBuku");
const judul = document.getElementById("judul");
const pengarang = document.getElementById("pengarang");
const tahun = document.getElementById("tahun");

const getBuku = async() => {
    const response = await fetch("http://localhost:3000/buku");
    const result = await response.json();
    return result.data;
};

const renderBuku = (buku) => {
    buku.map((book)=>{
        const ul = document.createElement("ul");
        const li = document.createElement("li");
        const detailButton = document.createElement("button");
        detailButton.textContent = "Detail";
        li.textContent = book.judul+ " oleh "+ book.pengarang+ " ("+ book.tahun_terbit + ")" ;
        li.appendChild(detailButton);
        ul.appendChild(li);
        list.appendChild(ul);

        detailButton.onclick =async()=>{
            window.location = "./detail.html?id="
            bookId = book.id;
            judul.createElement("span").innerHTML = book.judul;
            pengarang.createElement("span").innerHTML = book.pengarang;
            tahun.createElement("span").innerHTML = book.tahun_terbit;
        }
    });
};

window.onload = async()=>{
    const buku = await getBuku();
    renderBuku(buku);
};
