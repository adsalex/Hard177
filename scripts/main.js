//hard177
var menutrig=false
var anc_color=null;
var cross="../resources/cross.svg"
var burger="../resources/burger.svg"
const new_anc_color="rgb(255, 165, 0)"
var mynav =document.getElementsByTagName("nav")
var menu_button=document.getElementById("menu_button")
var content_elem=document.getElementById("content")
var page_name= window.location.href
page_name=page_name.substring(page_name.lastIndexOf("/")+1,page_name.length)

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
//}
/////////
function show_hide_art(handler){
   let show_hide_st = articles[Array.from(hiders).indexOf(handler.target)].style
   
   if(show_hide_st.maxHeight !=MAX_HEIGHT){show_hide_st.maxHeight =MAX_HEIGHT}
   else{show_hide_st.maxHeight ="none"}

   //даже если объявить сразу как массив
   //все равно нужно преобразование
}
}
//////////////////////////
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


