let all_show = document.querySelector('.all-show');
let side_dis = document.querySelector('.side-dis')
let link = "https://books-backend.p.goit.global/books/top-books";
async function book_Details() {
    const response = await fetch(`${link}`);
    const data = await response.json();
    // console.log(data);
    // all_show.innerHTML=" ";
    data.forEach(element => {
        // console.log(element.books.id);
        let book_Category = document.createElement('div');
        book_Category.classList.add("book-category");
        book_Category.innerHTML = `
                <h2>${element.list_name}</h2>
                <div class="books">
                </div>
                <button class="book-catagory-btn">see more</button>
                
            `
        all_show.appendChild(book_Category)



        //
    });
    booksDiv(data)
    add_View_Buttons();
    show_More_Books();
    add_popup()







}
book_Details();


function booksDiv(data) {
    let books = document.querySelectorAll('.books');
    // console.log(data);
    for (let i = 0; i < books.length; i++) {
        // console.log(data[i].books);
        books[i].innerHTML = ''
        for (let j = 0; j < 5; j++) {
            // console.log(data[i].books[j].title);
            let single_Books = document.createElement('div');
            single_Books.classList.add("single-books");
            single_Books.innerHTML = `
             
                <img class="bookimgs" src="${data[i].books[j].book_image}" alt="">
                <span class="view">View</span>
                <h3>${data[i].books[j].title}</h3>
                <a href="">${data[i].books[j].contributor}</a>
            `
            books[i].appendChild(single_Books)
        }
    }


}


function add_View_Buttons() {
    const images = document.querySelectorAll('.single-books');
    // console.log(images);
    images.forEach((ele) => {
        ele.addEventListener('mouseover', () => {
            // ele.children[1].classList.remove('view-live')
            ele.children[1].style.display = "block"
            // console.log("in");


        })
        ele.addEventListener('mouseleave', function () {
            ele.children[1].style.display = "none"
            // console.log("out");
        })
    })


}


async function show_Books_More(new_Book, book_List) {
    const response = await fetch(`https://books-backend.p.goit.global/books/category?category=${new_Book}`);
    const data = await response.json();
    return data;
}


function show_More_Books() {
    const more_btn = document.querySelectorAll('.book-catagory-btn');
    // console.log(more_btn);
    more_btn.forEach((ele) => {
        ele.addEventListener('click', async function () {
            let book_List = ele.parentElement.children[0].textContent;
            let new_Book = split(book_List)
            let data = await show_Books_More(new_Book, book_List)
            // console.log(data);
            new_Section_Book(data);
        })
    })
    add_View_Buttons()

}
function split(book_List) {
    let arr = book_List.split(" ");
    // console.log(arr);
    let new_Book = arr.join("+")
    // console.log(new_Book);
    return new_Book;
}


function new_Section_Book(data) {
    side_dis.innerHTML = `
    <h1>${data[0].list_name}</h1> 
    <div class="all-show">
    <div class="books">

    </div
    </div>
    `
    single_Each_Books(data);
    add_View_Buttons()
    add_popup();
}




function single_Each_Books(data) {
    let books = document.querySelectorAll('.books');
    // console.log(data);
    data.forEach((ele) => {
        let single_Books = document.createElement('div');
        single_Books.classList.add("single-books");
        single_Books.innerHTML = `
             
                <img class="bookimgs" src="${ele.book_image}" alt="">
                <span class="view">View</span>
                <h3>${ele.title}</h3>
                <a href="">${ele.contributor}</a>
          `
        // console.log(single_Books);
        books[0].style.flexwarp = "wrap"
        books[0].appendChild(single_Books);
    })

}





function add_popup() {
    let single = document.querySelectorAll('.single-books');
    let popup = document.querySelector('.popup')
    // console.log(single);
    single.forEach((ele) => {
        ele.addEventListener('click', function () {
            // console.log(ele);
            let imge = ele.querySelector('.bookimgs')
            let book_name = ele.querySelector('h3');
            let boolLink = ele.querySelector('a')
            // console.log(boolLink);
            // console.log(book_name);
            let mess = document.createElement('div');
            mess.classList.add('mess');
            mess.innerHTML = `
            <div class="pop-messall">
                <div class="pop-mg"><img src="${imge.getAttribute('src')}" alt=""></div>
                <div class="pop-mess">
                    <h2>${book_name.textContent}</h2>
                <h3>${boolLink.textContent}  </h3>
                <p>There is No Description of this BOOk sed</p>
                </div>
            </div>
            <div class="btn">
                <button>Add to cart</button>
            </div>
            `;
            popup.append(mess);
            popup.style.display = "flex"
        })

    })
    popup.addEventListener('click', function () {
        popup.innerHTML = " "
        this.style.display = 'none'
    })
}



let side_bar = document.querySelector('.side-items')
async function aside() {
    const response = await fetch(`${link}`);
    const data = await response.json();
    // console.log(data);
    // side_bar.innerHTML=" ";
    data.forEach((ele) => {
        // console.log(ele.List_name);
        let list = document.createElement('li')
        list.classList.add('category-item');
        list.innerText = `${ele.list_name}`
        side_bar.appendChild(list);
    })

    side_addListerner();
}
aside()


function side_addListerner() {
    let list = document.querySelectorAll('.category-item')
    // console.log(list);
    list.forEach((ele) => {
        ele.addEventListener('click', async function () {
            if (ele.textContent === 'All categories') {
                location.reload()
            }
            else {
                let text = ele.textContent;
                let new_Book_String = split(text);
                // console.log(new_Book_String);
                let data = await show_Books_More(new_Book_String, text)
                // console.log(data);
                new_Section_Book(data);

            }

        })
    })
}






