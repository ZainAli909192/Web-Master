// buttons 
const fileinput=document.querySelector(".file-input");
const chooseImgBtn=document.querySelector(".choose-img");
const saveimgbtn=document.querySelector(".save-img");
const resetbtn=document.querySelector(".reset-filter");

// img previewer
const previewimg=document.querySelector(".preview-img img");

// rotate and flip option 
const rotateoptions = document.querySelectorAll(".rotate button");


// filter information 
const filtername=document.querySelector(".filter-info .name");
const filtervalue=document.querySelector(".filter-info .value");

// slider range 
const filterslider=document.querySelector('.slider input');
const filteroption=document.querySelectorAll(".filter button");


let brightness="100", saturation="100", grayscale="0", inversion="0";
let rotate=0, flipHorizontal=1, flipVertical=1;
let circle = false;

const resetfilters=()=>{
    brightness="100", saturation="100", grayscale="0", inversion="0";
    rotate=0, flipHorizontal=1, flipVertical=1;
    filteroption[0].click();
    applyfilter();
}
const applyfilter=()=>{
previewimg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
previewimg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}


const loadimg=()=>{

    let file=fileinput.files[0];
    if(!file){
        return;
    }
    else{
        previewimg.src = URL.createObjectURL(file);
        previewimg.addEventListener("load",()=>{
resetfilters();
    document.querySelector(".container").classList.remove("disable");
})

    }
}

filteroption.forEach(option=>{
    option.addEventListener("click", ()=>{
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filtername.innerText=option.innerText;
    
        if(option.id === "brightness"){
            filterslider.max="200";
            filterslider.value=brightness;
            filtervalue.innerText=`${brightness}%`;
        }else if(option.id==="saturation"){
            filterslider.max="200";
            filterslider.value=saturation;
            filtervalue.innerText=`${saturation}%`;
        }
        else if(option.id==="inversion"){
            filterslider.max="100";
            filterslider.value=inversion;
            filtervalue.innerText=`${inversion}%`;
        }  
        else{
            filterslider.max="100";
            filterslider.value=grayscale;
            filtervalue.innerText=`${grayscale}%`;
        }
    });
})

const updatefilter=()=>{
    filtervalue.innerText=`${filterslider.value}%`;
    const selectedfilter=document.querySelector(".filter .active");
    if(selectedfilter.id==="brightness"){
        brightness=filterslider.value;
    }else if(selectedfilter.id==="saturation"){
        saturation=filterslider.value;
    
    }else if(selectedfilter.id==="inversion"){
        inversion=filterslider.value;
    }else{
        grayscale=filterslider.value;
    }
    applyfilter();
}

rotateoptions.forEach(option =>{
    option.addEventListener("click",()=>{
        if(option.id==="left"){
            
            rotate -=90;
        }else if(option.id==="right"){
            rotate +=90;
        }else if(option.id==="horizontal"){
                    if(flipHorizontal==1){
                        flipHorizontal=-1;
                    }else if(flipHorizontal==-1){
                        flipHorizontal=1;
                    }
        }else{
            // equal to above horizontal if else logic
            flipVertical = flipVertical=== 1 ? -1:1;
        }
        applyfilter();
    })
})

const saveimg=()=>{
    const canvas=document.createElement("canvas");
    const ctx=canvas.getContext("2d");

    canvas.width=previewimg.naturalWidth;
    canvas.height=previewimg.naturalHeight;
    canvas.width=400;
    canvas.height=400;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;

    ctx.translate(canvas.width / 2, canvas.height / 2);

    if (rotate !== 0) {
        // ctx.rotate(rotate * Math.PI / 180);
        ctx.rotate(rotate);
      }
    
    ctx.scale(flipHorizontal,flipVertical);

    if (circle) { // assuming 'circle' is a boolean variable
        ctx.beginPath();
        ctx.arc(0, 0, Math.min(canvas.width, canvas.height) /2, 0, 2 * Math.PI);
        ctx.clip(); // clip the image to the circular path
    }

    ctx.drawImage(previewimg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    
    ctx.drawImage(previewimg, -canvas.width/2,-canvas.height/2, canvas.width, canvas.height);

    const link =document.createElement("a");
    link.download="img.jpg";
    link.href=canvas.toDataURL();
    link.click();
}

resetbtn.addEventListener("click",resetfilters);
fileinput.addEventListener("change", loadimg);
chooseImgBtn.addEventListener("click", () => fileinput.click());
filterslider.addEventListener("input",updatefilter);
saveimgbtn.addEventListener("click",saveimg);



const circleBtn = document.querySelector('.circle');


circleBtn.addEventListener('click', () => {
    let file=fileinput.files[0];
    if(!file) {
        alert("Upload img please"); 
        return;
    }
    previewimg.classList.toggle('circle');
    circle = !circle;
});
