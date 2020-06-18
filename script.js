
let btn = document.querySelectorAll('.root');

let _URL1 ='https://swapi.dev/api/people/?page=1';
let _URL2 ='https://swapi.dev/api/people/?page=2';
let _URL3 ='https://swapi.dev/api/people/?page=3';
let _URL4 ='https://swapi.dev/api/people/?page=4';
let _URL5 ='https://swapi.dev/api/people/?page=5';

class asynLesson{
        
    constructor(){
        this.__URL1 = 'https://swapi.dev/api/people/?page=1'; 
        //this.__URL1 = URL;
        this.userStorage = [];
      console.log('asynlesson constructor works');
    }
    async Request(){
       let response = await fetch(this.__URL1);
       let data = await response.json();
       console.log(data.results);
       this.SaveUserList(data.results);
    }

    SaveUserList(userList){
        let count = 0;
        let user = userList.map(item=>{
            count++;
            //item = item.id+item.name+item.username;  
            item={
                name:item.name,
                height:item.height,
                mass:item.mass,
                hair_color:item.hair_color,
                skin_color:item.skin_color,
                eye_color:item.eye_color,
                birth_year:item.birth_year,
                gender:item.gender,
            }
            
            return item;
       });

       console.log('userstorage', user);
       localStorage.clear();
       localStorage.setItem('Users',JSON.stringify(user));
    }
    GetUserList(){
        let userList = JSON.parse(localStorage.getItem('Users'));
        return userList;
    }
    BuildList(array){
       let table = document.querySelectorAll('.table_1 tr');
       
        

       for(let i = 1; i<11; i++){

       table[i].innerHTML=null;

       let name = document.createElement('td');
       let height = document.createElement('td');
       let mass = document.createElement('td');
       let hair_color = document.createElement('td');
       let skin_color = document.createElement('td');
       let eye_color = document.createElement('td');
       let birth_year = document.createElement('td');
       let gender = document.createElement('td');

        name.innerText = array[i-1].name;
        height.innerText = array[i-1].height;
        mass.innerText = array[i-1].mass;
        hair_color.innerText = array[i-1].hair_color;
        skin_color.innerText = array[i-1].skin_color;
        eye_color.innerText = array[i-1].eye_color;
        birth_year.innerText = array[i-1].birth_year;
        gender.innerText = array[i-1].gender;
        
        table[i].appendChild(name);        
        table[i].appendChild(height);
        table[i].appendChild(mass);
        table[i].appendChild(hair_color);
        table[i].appendChild(skin_color);
        table[i].appendChild(eye_color);
        table[i].appendChild(birth_year);
        table[i].appendChild(gender); 
            
       }

    }
   
}

window.addEventListener('load',function(){
    Main(_URL1);
});

btn[0].addEventListener('click',function(){
     Main(_URL1);
});
btn[1].addEventListener('click',function(){
    Main(_URL2);
});
btn[2].addEventListener('click',function(){
    Main(_URL3);
});
btn[3].addEventListener('click',function(){
    Main(_URL4);
});
btn[4].addEventListener('click',function(){
    Main(_URL5);
});


async function Main(url){
    let obj = new asynLesson();
    obj.__URL1 = url;
    await obj.Request();
    let arr = await obj.GetUserList();
    obj.BuildList(arr);
    console.log('arr = ', arr);
}