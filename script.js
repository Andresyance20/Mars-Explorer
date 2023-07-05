let dataInject = document.getElementById("dataInject")
let input = document.getElementById("input")
let Btn= document.getElementById("Btn")
let filterSelect = document.getElementById("filterSelect");

if (localStorage.getItem("lastInput")) {
    input.value = localStorage.getItem("lastInput");
  }

let newApy = `/mars-photos/api/v1/rovers/opportunity/photos?api_key=DEMO_KEY&earth_date=${input.value}&camera=pancam`
let oldapi = `/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${input.value}&page-1`

let apiName = "https://api.nasa.gov"
let apiEndpoint = "/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2020-6-3&page-1"

let apiKey= "&api_key=11XpeILRqt3JyDttvzUhBzcDPyRJGlIpUPztsCKt"

Btn.addEventListener('click',function(e){
    dataInject.innerHTML="";
    let oldapi = `/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${input.value}&page-1`;
    fetchfuntion(apiName +  oldapi + apiKey);
});

async function fetchfuntion(url)
{
    const response = await fetch(url)
    if (response.ok)
    {
        let jsonData = await response.json();
        console.log(jsonData.photos)
         if(Array.isArray(jsonData.photos))
        {
            jsonData.photos.forEach(photos => {
                 
                if (filterSelect.value === "" || photos.camera.full_name === filterSelect.value) {
                    displayData(photos);
                }
                
             })
        }

    }

}
function displayData(data)
{


  //image
  let imgCol = document.createElement("div")
  imgCol.className = "col-12"
  
  let img = document.createElement("img")
  img.setAttribute('src', data.img_src)
  img.className = "img-fluid maxHeight"
  img.style.width = "800px"; 
  img.style.height = "700px";



  imgCol.appendChild(img)


  img.addEventListener("error", function () {
    img.setAttribute("src", "path/to/image-not-found.jpg"); // Replace with your image not found placeholder
});

  //text
  let textCol = document.createElement("div")
  textCol.className = "col-12"

  let camaratype = document.createElement("h2");
  camaratype.innerText = "View Name: "+ data.camera.full_name;

  let roverName = document.createElement("h2");
  roverName.innerText = "Rover Name: "+ data.rover.name;

  let roverStatus = document.createElement("h2");
  roverStatus.innerText = "Status: "+ data.rover.status;
  
  let landingDate = document.createElement("h2");
  landingDate.innerText = "Landing Date: "+ data.rover.landing_date;

  let launchingDate = document.createElement("h2");
  launchingDate.innerText = "Launch Date: "+ data.rover.launch_date;

 textCol.appendChild(camaratype)
 textCol.appendChild(roverName)
 textCol.appendChild(roverStatus)
 textCol.appendChild(landingDate)
 textCol.appendChild(launchingDate)


 //put everything together
 dataInject.appendChild(imgCol)
 dataInject.appendChild(textCol)




}


