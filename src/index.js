document.addEventListener('DOMContentLoaded', () => {
    let tbody=document.getElementById('table-body')// select the body

function tableData(dog){

let trow=document.createElement('tr')

trow.innerHTML=`
<td>${dog.name}</td>
<td>${dog.breed}</td>
<td>${dog.sex}</td>
<button class="edit" item-id=${dog.id}>Edit Dog</button> 
<button class="delete" item-id=${dog.id}>Delete Dog</button>
`
tbody.appendChild(trow)

let editor=trow.querySelector('.edit')
let Delete=trow.querySelector('.delete')

editor.addEventListener('click', function(){
    console.log('i am Ok')                       //edit function
    let item_id=this.getAttribute('item-id')
dogData(item_id)

})
Delete.addEventListener('click', function(){
    console.log('i am Ok')
    let item_id=this.getAttribute('item-id')        //delete function
deleteDog(item_id)
})

    }

    function getData(){ //get dogs data function
        fetch('http://localhost:3003/dogs')
        .then(res=>res.json())
        .then(data=>data.forEach(dog=>tableData(dog)))
    }
    getData()

function dogData(item_id){ //fetch dog by id
    fetch(`http://localhost:3003/dogs/${item_id}`)
    .then(res=>res.json())
    .then(data=>handleDog(data))
    .catch(error=>console.log(error))

}
const handleDog=(dogy)=>{  //for handling specific dog
let nameInput=document.querySelector('input[name="name"]')
let breed=document.querySelector('input[name="breed"]')
let sex=document.querySelector('input[name="sex"]')

nameInput.value=dogy.name
breed.value=dogy.breed
sex.value=dogy.sex
}


function deleteDog(item_id){ //delete function
    fetch(`http://localhost:3003/dogs/${item_id}`,{
        method:'DELETE',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(item_id)
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
}

let form=document.getElementById('dog-form') //select the form
form.addEventListener('submit', (e)=>{
    let dogId=document.querySelector('.edit').getAttribute('item-id')
    e.preventDefault()
    let nameInput=document.querySelector('input[name="name"]').value
let breed=document.querySelector('input[name="breed"]').value
let sex=document.querySelector('input[name="sex"]').value
 let updatedDog={
    name:nameInput,  //data to change
    breed:breed,
    sex:sex,
 }

 fetch(`http://localhost:3003/dogs/${dogId}`,{
    method:'PATCH', //use patch for changing data
    headers:{
        'content-type': 'application/json'
    },
    body:JSON.stringify(updatedDog)
 }).then(res=>res.json())
 .then(data=>data)
 .catch(error=>console.log(error))

    
})




})