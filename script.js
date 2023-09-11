/**
 * @type {HTMLCanvasElement}
 */
let canvas = document.getElementById("SpaceLookingBackground");
let ctx = canvas.getContext("2d")


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

let stars = []
for(let i = 0;i<100;i++){
    let temp = new star(0,0,canvas.width,canvas.height)
    temp.resizeShine()
    stars.push(temp)
}

setInterval(() => {
    for(let i = 0;i<100;i++){
        stars[i].resizeShine()
    }
}, 1000);
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
    /*
    this is better than setinterval 
    it will run 60 fps on the rendering side of js
    */
    requestAnimationFrame(AnimationLoop)
}
AnimationLoop()