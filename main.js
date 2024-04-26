import {getData} from "./util.js"
import { verifyUserPw } from "./verifyUserPw.js";
import {userExist} from "./userExist.js";
import {apiKey} from "./apiKey.js";
document.querySelectorAll('button').forEach((obj)=>{
    obj.addEventListener('click',auth)
})
function auth(e){
    console.log(e.target);
    if(document.querySelector('input').classList.contains('hidden')){
        document.querySelectorAll('input').forEach((obj)=>{
            obj.classList.remove('hidden');
        })
        return
    }
    let username=document.getElementById('username').value
    let pw=document.getElementById('pw').value
    if(!username||!pw || !verifyUserPw(username,pw)){
        document.querySelector('#msg').innerHTML="Hibás adatok!..."
        return
    }
    let users=JSON.parse(localStorage.getItem('users')) || []
    if(e.target.textContent=='Register'){
        //Nem szeretnénk 2 egyforma felhasználónevet eltárolni
        if(userExist(users,'username',username)){
            document.querySelector('#msg').innerHTML="Foglalt felhasználónév!"
            return
        }
        users.push({username,pw})
        localStorage.setItem('users',JSON.stringify(users))
        document.querySelector('#msg').innerHTML="Sikeres regisztráció!"
    }else{
        let isValidUser=users.find(obj=>obj.username==username&&obj.pw==pw)
        if(isValidUser) {
            document.querySelector('#msg').innerHTML="Sikeres bejelentkezés!"
            localStorage.setItem('authUser',username)
            hideInputs()
            
            verifyAuth()
        }

        else{

       document.querySelector('#msg').innerHTML="Hibás felhasználónév/jelszó páros!" 
    } 
    }

    function hideInputs(){
        document.querySelectorAll('input').forEach((obj)=>obj.classList.remove('hidden'))
    }
}
function verifyAuth(){
    if(localStorage.getItem('authUser')){
        console.log('van bejelentkezés');
        let uName=localStorage.getItem('')
        document.querySelector('.login').classList.add('hidden')
        document.querySelector('.register').classList.add('hidden')
        document.querySelector('.logout').classList.remove('hidden')
        document.querySelector('.logout').addEventListener('click',logoutUser)   
    }
    
}
function logoutUser(){
    localStorage.removeItem('authUser')
    document.querySelector('.login').classList.remove('hidden')
    document.querySelector('.register').classList.remove('hidden')
    document.querySelector('.logout').classList.add('hidden')
    document.querySelector('#msg').innerHTML=''
}
verifyAuth
let page=1
const url=`https://api.unsplash.com/search/photos?client_id=${apiKey}&page=`
let qString='&query='
getData(url+page+qString,renderImages)
document.querySelector('.asd').addEventListener('click',search)

function search(){
    qString+=document.querySelector(".search").value
    console.log(qString);
    getData(url+page+qString,renderImages)
    
}
document.querySelector('.del').addEventListener('click',del)
function del(){
    qString=document.querySelector(".search").innerHTML="&query="
    getData(url+page+qString,renderImages)
    location.reload()

}
function renderImages(data){
    document.querySelector('.loading').style.display='none'
    console.log(data);
    data.results.forEach(obj=>{
        const imageElement = document.createElement('img');
        imageElement.src=obj.urls.small
        imageElement.alt=obj.alt_description
        document.querySelector('.image-gallery').appendChild(imageElement);
        let search = document.querySelector(".search").value
    })
    console.log(page);
    page++
    
    

window.addEventListener('click',click)
function click(){
    document.querySelector('.loading').style.display='block'
    getData(url+qString,renderImages)
}

}