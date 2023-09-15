// side note now that I look at this
// this is a complete mess
// Well this is good enough considering that I may now be ahead of my math class









/**
 * @type {HTMLCanvasElement}
 */
let canvas = document.getElementById("SpaceLookingBackground");
let ctx = canvas.getContext("2d")
//stores stars
let stars = []
//config to draw yellow horizon
let yelo = {
    smooth:200, //how many bar should it draw, more = better
    height:0.5 //fraction of how much of the screen should it take u
}

// Class to make stars
class star{
    static ids = 0
    constructor(MinX,MinY,MaxX,MaxY){
        this.x = Math.floor(Math.random() * (MaxX - MinX) + MinX)
        this.y = Math.floor(Math.random() * (MaxY - MinY) + MinY)
        this.size = Math.floor(Math.random()*10)
        this.id = star.ids
        star.ids++
    }
    resizeShine(){
        this.shine = Math.floor(Math.random() * (3 - -3) + -3)
    }
}

// makes stars and adds them to the array
for(let i = 0;i<100;i++){
    let temp = new star(0,0,canvas.width,canvas.height)
    temp.resizeShine()
    stars.push(temp)
}

// Changes the Shine of the star every 1 second (1000 miliseconds)
setInterval(() => {
    for(let i = 0;i<100;i++){
        stars[i].resizeShine()
    }
}, 1000);

let frac = canvas.height/yelo.height
//Animates all of this
function AnimationLoop(){
    ctx.beginPath()
    ctx.rect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "rgba(1,1,25,1)"
    ctx.fill()
    ctx.closePath()

    for(let i = 0;i<100;i++){
        ctx.beginPath()
        ctx.rect(stars[i].x-(stars[i].shine/2),stars[i].y-(stars[i].shine/2),stars[i].size+stars[i].shine,stars[i].size+stars[i].shine)
        ctx.fillStyle = "white"
        ctx.fill()
        ctx.closePath()
    }
    ctx.globalAlpha = 1
    for(let i=0;i<=yelo.smooth;i++){
        ctx.beginPath()
        ctx.rect(0,(canvas.height-frac)+(frac-((frac/yelo.smooth)*i)),canvas.width,frac/yelo.smooth)
        ctx.globalAlpha = 1/i
        ctx.fillStyle = "yellow"
        ctx.fill()
        ctx.closePath()
    }
    ctx.globalAlpha = 1
    /*
    this is better than setinterval 
    it will run 60 fps on the rendering side of js
    */
    requestAnimationFrame(AnimationLoop)
}
AnimationLoop()

canvas.style.width = window.innerHeight*1.5+"px"