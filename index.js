let ca = document.querySelector("canvas")
let ctx = ca.getContext("2d")

let fram = 0

let sprite = new Image()

sprite.src = "image/template.png"

var state={
    current:0,
    getready:0,
    game:1,
    gameover:2,
}


function clickHandler(){
    if(state.getready==state.current){
    state.current=state.game

    }else if(state.game==state.current){
        bird.flap()

    }else{
        state.current=state.getready
    }
    

}




//document.addEventListener("click",clickHandler())
document.addEventListener("keydown",(e)=>{
    if(e.which==32){
        clickHandler()
    }
})

let bg = {
    sx: 0,
    sy: 0,
    w: 150,
    h: 226,
    x: -3,
    y: ca.height - 236,
    draw() {
        ctx.drawImage(
            sprite, this.sx, this.sy, this.w, this.h,
            this.x, this.y, this.w + 10, this.h)

        ctx.drawImage(
            sprite, this.sx, this.sy, this.w, this.h,
            this.w, this.y, this.w + 10, this.h)
    }
}


let fg = {
    sx: 220,
    sy: -60,
    w: 170,
    h: 120,
    x: -5,
    y: ca.height - 108,
    draw() {
        ctx.drawImage(
            sprite, this.sx, this.sy, this.w, this.h,
            this.x, this.y, this.w * 2, this.h)
    }
}


let bird = {
    animation: [{
            sx: 380,
            sy: 180
        },
        {
            sx: 380,
            sy: 206
        },
        {
            sx: 380,
            sy: 232
        },
        {
            sx: 380,
            sy: 180
        },
    ],
    sx: 380,
    sy: 235,
    w: 100,
    h: 20,
    x: 100,
    y: 50,
    animationIndex: 0,


    draw() {
       
        let Bird = this.animation[this.animationIndex]

         ctx.drawImage(
            sprite, Bird.sx, Bird.sy, this.w, this.h,
            this.x - this.w / 2, this.y - this.h / 2, this.w * 2, this.h)
    },
    flap(){

    }
}


let gr = {
    sx: 250,
    sy: 70,
    w: 100,
    h: 25,
    x: ca.width/2- 100,
    y: 40,
    draw() {
        if(state.current==state.getready){
             ctx.drawImage(
                sprite, this.sx, this.sy, this.w, this.h,
                this.x, this.y, this.w * 2, this.h)
        }
       
    }
}

let go1 = {
    sx: 150,
    sy: 170,
    w: 100,
    h: 25,
    x: ca.width/2- 100,
    y: 40,
    draw() {
        if(state.current==state.gameover){
        ctx.drawImage(
            sprite, this.sx, this.sy, this.w, this.h,
            this.x, this.y, this.w * 2, this.h)
        }
    }
}


let go2 = {
    sx: 260,
    sy: 190,
    w: 120,
    h: 70,
    x: ca.width/2- 110,
    y: 60,
    draw() {
        if(state.current==state.gameover){
        ctx.drawImage(
            sprite, this.sx, this.sy, this.w, this.h,
            this.x, this.y, this.w * 2, this.h)
        }
    }
}

setInterval((e) => {
    if (bird.animationIndex < 3) {
        bird.animationIndex++

    }else{
         bird.animationIndex=0
        }
},500)






function update() {

}

function draw() {
    ctx.fillStyle = "#70c5ce"
    ctx.fillRect(0, 0, ca.width, ca.height)
    bg.draw()
    fg.draw()
    bird.draw()
    gr.draw()
    go1.draw()
    go2.draw()
}

function animate() {
    update()
    draw()
    fram++

    requestAnimationFrame(animate)
}

animate()