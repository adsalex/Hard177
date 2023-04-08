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
    +rootxml.getElementsByTagName("realname")[elem].innerHTML
    +"</a> </figcaption>"
    +"</figure>")
}

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
    let articul_buffer=rootxml.getElementsByTagName("articul")[elem].innerHTML
    console.log(rootxml.getElementsByTagName("articul")[elem].innerHTML)
    content+=("<article class='goodbar'>"
    +"<img alt='photo not found' src='"+rootxml.getElementsByTagName("photo")[elem].innerHTML  +"'/>"
    +"<p>"+rootxml.getElementsByTagName("goodname")[elem].innerHTML+"</p>"
    +"<p>"+"$" +rootxml.getElementsByTagName("price")[elem].innerHTML+"</p>"
    +"<p> артикул: "+rootxml.getElementsByTagName("articul")[elem].innerHTML+"</p>"
    +"<div>"+rootxml.getElementsByTagName("description")[elem].innerHTML+"</div>"
    +"<button value="+articul_buffer+" class='addbutton' "+">добавить в корзину </button>"
    +"</article>")
}
console.log(rootxml.getElementsByTagName("articul")[0].innerHTML)
document.getElementsByClassName("content")[0].innerHTML=content

for(let button of document.getElementsByClassName("addbutton"))
{
    button.addEventListener("click",addtocart)
}

}}

if(window.localStorage.getItem("cart_items")==null)
{
window.localStorage.setItem("cart_items",[])
}



function addtocart(handler)
{

let elem=0



//alert("helll")
let buff={}
if((window.localStorage.getItem("cart_items"))){buff = JSON.parse(window.localStorage.getItem("cart_items"))}

for(let prop in buff ){if(buff[prop].articul==handler.target.value){break};elem++}

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
        let count_holders
        
        if(Object.keys(order_list).length==0)
        {
            content_buff="<section> <p>Увы, ваша корзина пуста, положите товар в корзину </p> </section>"
            console.log(33)
            document.getElementsByClassName("content")[0].innerHTML=content_buff
            return
        }
        for(let elem in order_list)
        {
            
            content_buff+="<article class='goodbar'>"+ "<img alt='photo not found' src='"
            +order_list[elem].photo+"'/> "+"<div class='texthold'>"+"<p>"+order_list[elem].goodname+"</p>"
            +"<p>артикул: "+order_list[elem].articul+"</p>"+"<p>$"+order_list[elem].price+"</p>"
            +"<div>"+order_list[elem].description+"</div>"
            +"</div>"+"<input type='text' class='count' value="+order_list[elem].count+" width=6em/>" 
            +"<button OnClick=delete_item("+elem+")> удалить </button>"
            +"</article>"
            totprice+=Number(order_list[elem].price)*order_list[elem].count
        }

        content_buff+="<section> <button id='order'> оформить заказ </button>"
        +"<p> Итоговая цена $<span id='price_show'>"+totprice+"</span></p>"
        +"<p> Телефон "+"<input type='text' id='phone'/>"+"</p> </section>"
        document.getElementsByClassName("content")[0].innerHTML=content_buff
        count_holders = document.getElementsByClassName("count")
        let index_counter=0
        
        //for(let prop in buff ){if(buff[prop].articul==handler.target.value){break};elem++}
        for(let elem of count_holders){const buffer=index_counter;elem.addEventListener("change",(handler)=>{update_count(handler,buffer)});index_counter++;}
        
    }

    updater()
    document.getElementById("order").addEventListener("click",confirm_order)
    function confirm_order()
    {
        let filename="orders.json"
        let request= new XMLHttpRequest()
        request.open("POST","//localhost:5500/pages/node_back",true )
        request.setRequestHeader('Content-Type', 'application/json')
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        request.send(JSON.stringify(window.localStorage.getItem("cart_items")))
        window.localStorage.setItem("cart_items")="{ }"
        document.getElementsByClassName("content")[0].innerHTML ="<section><p>ваш заказ отправлен,"
        +"наш менеджер созвонится с вами в ближашее время </p></section>"
    }
    function delete_item(elem)
    {
        let buffer_delet=JSON.parse(window.localStorage.getItem("cart_items")) 
        delete buffer_delet[elem]
        window.localStorage.setItem("cart_items",JSON.stringify(buffer_delet))
        updater()
        
    }
    function update_count(handler,pos)
    {

        let index =0
        let articul
        
       
        let buffer_mod=JSON.parse(window.localStorage.getItem("cart_items")) 

        /*for(let prop in buffer_mod ){if(index==pos){articul=prop;break};index++}

        console.log(articul,pos)//*/
        console.log(pos)
        buffer_mod[pos].count=handler.target.value
        

        //price count ends
        window.localStorage.setItem("cart_items",JSON.stringify(buffer_mod))
        console.log(buffer_mod)
        let total_price_changed=0
        let order_list=JSON.parse(window.localStorage.getItem("cart_items"))
        for(let price_elem in order_list)
        {
            total_price_changed+=(Number(order_list[price_elem].price*order_list[price_elem].count))
        }
        document.getElementById("price_show").innerHTML=total_price_changed
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