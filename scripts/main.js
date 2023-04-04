//hard177

var menutrig=false
var anc_color=null;
var cross="../resources/cross.svg"
var burger="../resources/burger.svg"
const new_anc_color="rgb(255, 165, 0)"
var mynav =document.getElementsByTagName("nav")
var menu_button=document.getElementById("menu_button")
var content_elem=document.getElementById("content")
var pageref= window.location.href

if(pageref.includes("#"))
{
    page_name=pageref.substring(pageref.lastIndexOf("/")+1,pageref.lastIndexOf("#"))
}
else{page_name=pageref.substring(pageref.lastIndexOf("/")+1,pageref.length)}

console.log(pageref)
menu_button.addEventListener("click",open_close)

for(let navig_sel of mynav)
{
navig_sel.addEventListener("mouseover",nav_down)
navig_sel.addEventListener("mouseout",nav_up)
}
anc_color=mynav[0].children[0].style.color;;
////////////////////////
if(page_name=="articles.html"){
let articles= document.getElementsByTagName("article")
const MAX_HEIGHT = articles[0].style.maxHeight
for(let art of articles)
{  
   art.insertAdjacentHTML("afterend",
   "<div class='hide_but'>скрыть/показать статью</div>")
}
hiders=document.getElementsByClassName('hide_but')

//hiders[0].style.color="red"
for(let hider of hiders)
{hider.addEventListener("mousedown",show_hide_art)}

function show_hide_art(handler){
   let show_hide_st = articles[Array.from(hiders).indexOf(handler.target)].style
   
   if(show_hide_st.maxHeight !=MAX_HEIGHT){show_hide_st.maxHeight =MAX_HEIGHT}
   else{show_hide_st.maxHeight ="none"}

   //даже если объявить сразу как массив
   //все равно нужно преобразование
}
}
//////////////////////////

//console.log(page_name)
if(page_name=="index.html" || page_name=="")
{
let parce=new DOMParser()
let content="";
const filename="cats.xml"
let catfile
let request=new XMLHttpRequest()
request.open("GET","cats.xml",true )
request.send()
request.onreadystatechange = function() 
{
 if (request.readyState == 4 && request.status == 200) {
 catfile=request.responseXML
console.log(request.responseXML)
let xmlcode=catfile//parce.parseFromString(catfile,'text/xml')
console.log(xmlcode)
let rootxml=xmlcode.getElementsByTagName("catalog")[0]
//console.log(rootxml)
for(let elem=0; elem< rootxml.childElementCount;elem++)
{
    //if(rootxml.childNodes[0].tag)
    content+=("<figure>"
    +"<img alt='photo not found' src='"+rootxml.getElementsByTagName("photo")[elem].innerHTML  +"'/>"
    +"<figcaption> <a href=goods.html#" +rootxml.getElementsByTagName("name")[elem].innerHTML + ">"
    +rootxml.getElementsByTagName("name")[elem].innerHTML
    +"</a> </figcaption>"
    +"</figure>")
}
console.log(rootxml)
document.getElementsByClassName("content")[0].innerHTML=content
}}
}
///parce end

//parce2 start
if(page_name=="goods.html")
{
let parce=new DOMParser()
let content="";
const filename=pageref.substring(pageref.lastIndexOf("#")+1,pageref.length)+".xml"
let catfile
let request=new XMLHttpRequest()
request.open("GET",filename,true )
request.send()
request.onreadystatechange = function() 
{
 if (request.readyState == 4 && request.status == 200) {
 catfile=request.responseXML
console.log(request.responseXML)
let xmlcode=catfile//parce.parseFromString(catfile,'text/xml')
console.log(xmlcode)
let rootxml=xmlcode.getElementsByTagName("catalog")[0]
//console.log(rootxml)
for(let elem=0; elem< rootxml.childElementCount;elem++)
{
    //if(rootxml.childNodes[0].tag)
    content+=("<article class='goodbar'>"
    +"<img alt='photo not found' src='"+rootxml.getElementsByTagName("photo")[elem].innerHTML  +"'/>"
    +"<p>"+rootxml.getElementsByTagName("goodname")[elem].innerHTML+"</p>"
    +"<p>"+"$" +rootxml.getElementsByTagName("price")[elem].innerHTML+"</p>"
    +"<p>"+rootxml.getElementsByTagName("articul")[elem].innerHTML+"</p>"
    +"<div>"+rootxml.getElementsByTagName("description")[elem].innerHTML+"</div>"
    +"<button value="+elem+" class='addbutton' onClick='addtocart("+elem+")' "+">добавить в корзину </button>"
    +"</article>")
}

document.getElementsByClassName("content")[0].innerHTML=content
}}

if(window.localStorage.getItem("cart_items")==null)
{
window.localStorage.setItem("cart_items",[])
}

let buttongeter=( document.getElementsByTagName("button"))
let butt_array=[...buttongeter]

function addtocart(elem)
{

//alert("helll")
let buff={}
if((window.localStorage.getItem("cart_items"))){buff = JSON.parse(window.localStorage.getItem("cart_items"))}
console.log(buff)
let buff_obj=
{   
    goodname:catfile.getElementsByTagName("goodname")[elem].innerHTML,
    description:catfile.getElementsByTagName("description")[elem].innerHTML,
    articul:catfile.getElementsByTagName("articul")[elem].innerHTML,
    price:catfile.getElementsByTagName("price")[elem].innerHTML,
    photo:catfile.getElementsByTagName("photo")[elem].innerHTML,
    count:1
}

buff[elem]=buff_obj
console.log(buff)
//buff.push(11)
window.localStorage.setItem("cart_items",JSON.stringify(buff))
console.log(JSON.parse(window.localStorage.getItem("cart_items")))
}

}
///parce2 end


////cart part
if(page_name=="cart.html")
{

    function updater()
    {
        let totprice=0
        let content_buff=""
        let order_list=JSON.parse(window.localStorage.getItem("cart_items"))
        
        for(let elem in order_list)
        {
            
            content_buff+="<article class='goodbar'>"+ "<img alt='photo not found' src='"
            +order_list[elem].photo+"'/> "+"<div class='texthold'>"+"<p>"+order_list[elem].goodname+"</p>"
            +"<p>"+order_list[elem].articul+"</p>"+"<p>$"+order_list[elem].price+"</p>"
            +"<div>"+order_list[elem].description+"</div>"
            +"</div>"+"<input type='text' value=1 width=6em/>" 
            +"<button OnClick=delete_item("+elem+")> удалить </button>"
            +"</article>"
            totprice+=Number(order_list[elem].price)
        }
    
        content_buff+="<section> <button id='order'> оформить заказ </button>"
        +"<p> Итоговая цена "+totprice+"</p>"
        +"<p> Телефон "+"<input type='text' id='phone'/>"+"</p> </section>"
        document.getElementsByClassName("content")[0].innerHTML=content_buff
    }

 /*    let totprice=0
    let content_buff=""
    let order_list=JSON.parse(window.localStorage.getItem("cart_items"))
    
    for(let elem in order_list)
    {
        
        content_buff+="<article class='goodbar'>"+ "<img alt='photo not found' src='"
        +order_list[elem].photo+"'/> "+"<div class='texthold'>"+"<p>"+order_list[elem].goodname+"</p>"
        +"<p>"+order_list[elem].articul+"</p>"+"<p>$"+order_list[elem].price+"</p>"
        +"<div>"+order_list[elem].description+"</div>"
        +"</div>"+"<input type='text' value=1 width=6em/>" 
        +"<button OnClick=delete_item("+elem+")> удалить </button>"
        +"</article>"
        totprice+=Number(order_list[elem].price)
    }

    content_buff+="<section> <button id='order'> оформить заказ </button>"
    +"<p> Итоговая цена "+totprice+"</p>"
    +"<p> Телефон "+"<input type='text' id='phone'/>"+"</p> </section>"
    document.getElementsByClassName("content")[0].innerHTML=content_buff*/
    updater()
    document.getElementById("order").addEventListener("click",confirm_order)
    function confirm_order()
    {
        let filename="orders.json"
        let request= new XMLHttpRequest()
        request.open("POST","//localhost:5500/pages/node_back",true )
        request.setRequestHeader('Content-Type', 'application/json')
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        request.send("{'hello':66}")
    }
    function delete_item(elem)
    {
        let buffer_delet=JSON.parse(window.localStorage.getItem("cart_items")) 
        delete buffer_delet[elem]
        window.localStorage.setItem("cart_items",JSON.stringify(buffer_delet))
        updater()
        
    }
}
////cart end


function nav_down(handler)
{
    handler.target.style.background=new_anc_color
   
}
function nav_up(handler)
{
   
    handler.target.style.background=anc_color
}
function open_close(handler)
{
    
    if(menutrig)
    {
        mynav[0].style.display="none"
        handler.target.src=burger
    }
    else
    {
        mynav[0].style.display="flex"
        mynav[0].style.position="flex"
        handler.target.src=cross
    }
    menutrig=!menutrig
}


