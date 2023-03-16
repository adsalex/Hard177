var menutrig=false
var anc_color=null;
const new_anc_color="rgb(255, 165, 0)"
var mynav =document.getElementsByTagName("nav")
var menu_button=document.getElementById("menu_button")
var content_elem=document.getElementById("content")
menu_button.addEventListener("click",open_close)
for(let navig_sel of mynav)
{
navig_sel.addEventListener("mouseover",nav_down)
navig_sel.addEventListener("mouseout",nav_up)
}
anc_color=mynav[0].children[0].style.color;;
function nav_down(handler)
{
    handler.target.style.background=new_anc_color
   
}
function nav_up(handler)
{
   
    handler.target.style.background=anc_color
}
function open_close()
{
    
    if(menutrig)
    {
        mynav[0].style.display="none"
    }
    else
    {
        mynav[0].style.display="flex"
    }
    menutrig=!menutrig
}

