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
var page_name=pageref.substring(pageref.lastIndexOf("/")+1,pageref.lastIndexOf("#"))

menu_button.addEventListener("click",open_close)

for(let navig_sel of mynav)
{
navig_sel.addEventListener("mouseover",nav_down)
navig_sel.addEventListener("mouseout",nav_up)
}
anc_color=mynav[0].children[0].style.color;;
////////////////////////
if(page_name=="articles.html"){
var articles= document.getElementsByTagName("article")
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

console.log(page_name)
if(page_name=="categories.html")
{
var parce=new DOMParser()
//var doc=parce.parseFromString
//var filesyst=require('fs');
var content="";
const filename="cats.xml"

//var myfile=new File(["cats"],"cats.xml")
//reader.readAsText(myfile)

var catfile/*='<?xml version="1.1" encoding="UTF-8" ?>'
+'<catalog>' +
'<categ>' +
    '<name>cpus</name>' +
    '<photo>../resources/burger.svg</photo>' +
'</categ>' +
'<categ>' +
    '<name>laptops</name>' +
    '<photo>../resources/cart.svg</photo>' +
'</categ>' +
'<categ>' +
    '<name>laptops</name>' +
    '<photo>../resources/burger.svg</photo>' +
'</categ>' +
'</catalog>';*/
//var url_var=new URL('http://localhost/cats.xml')
//var catfile=fetch(url_var).then(x=>x.text())
var request=new XMLHttpRequest()
request.open("GET","cats.xml",true )
request.send()
request.onreadystatechange = function() 
{
 if (request.readyState == 4 && request.status == 200) {
 catfile=request.responseXML
console.log(request.responseXML)
var xmlcode=catfile//parce.parseFromString(catfile,'text/xml')
console.log(xmlcode)
var rootxml=xmlcode.getElementsByTagName("catalog")[0]
//console.log(rootxml)
for(let elem=0; elem< rootxml.childElementCount;elem++)
{
    //if(rootxml.childNodes[0].tag)
    content+=("<figure>"
    +"<img alt='photo not found' src='"+rootxml.getElementsByTagName("photo")[elem].innerHTML  +"'>"
    +"<figcaption> <a href=categories.html#" +rootxml.getElementsByTagName("name")[elem].innerHTML + ">"
    +rootxml.getElementsByTagName("name")[elem].innerHTML
    +"</a> </figcaption>"
    +"</figure>")
}
console.log(rootxml)
document.getElementsByClassName("content")[0].innerHTML=content
}}
}
///parce end
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


