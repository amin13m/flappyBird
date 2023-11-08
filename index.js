let ca = document.querySelector("canvas")

let ctx = ca.getContext("2d")

let fram = 0


let sprite = new Image()

sprite.src = "templat/template.png"

let flap =new Audio();
flap.src="templat/flap.mp3"

let die=new Audio();
die.src="templat/die.mp3"

let hit = new Audio()
hit.src="templat/flappy-bird-hit-sound.mp3"

let state = {
    current: 0,
    getready: 0,
    game: 1,
    gameover: 2,
}

let score = {
    best: localStorage.getItem("best") || 0,
    value: 0,
    draw() {
        if (state.current == state.game) {
            ctx.save()
            ctx.fillStyle = 'white'
            ctx.lineWidth = 2

            ctx.font = "15px IMPACT"

            ctx.fillText(this.value, 140, 30)
            ctx.strokeText(this.value, 140, 30)
            ctx.restore()

        } else if (state.current == state.gameover) {

            ctx.save()
            ctx.fillStyle = 'white'

            ctx.lineWidth = 2
            ctx.font = "15px IMPACT"

            ctx.fillText(this.value, 210, 63)
            ctx.strokeText(this.value, 210, 63)

            ctx.fillText(this.best, 210, 83)
            ctx.strokeText(this.best, 210, 83)
            ctx.restore()
        }
    },
}

let dg = Math.PI / 180

function clickHandler() {
    if (state.getready == state.current) {
        state.current = state.game


    } else if (state.game == state.current) {
        bird.flap()


    } else if (state.current == state.gameover) {
        state.current = state.getready
        bird.y = 50
        bird.spead = 0
        bird.rotation = 0
        ca.style.borderColor = "black"
    }


}





document.addEventListener("keydown", (e) => {
    if (e.which == 32) {
        clickHandler()
    }
})


document.addEventListener("click", (e) => {

    clickHandler()

})

/*
    sx: 152,
    sy: 0,
    w: 26,
    h: 163,
    x: ca.width / 2 - 100,
    y: -100,

*/

class pipe {
    constructor() {
        this.top = {
            sx: 152,
            sy: 0
        }
        this.bottom = {
            sx: 180,
            sy: 0
        }
        this.w = 26
        this.h = 163
        this.y = -100 * (Math.random()) - 1.7 * fg.h
        this.x = ca.width - 10
        this.dx = 1
        this.gap = 90
        this.position = []
        this.maxYPos = -150


    }


    draw() {
        let bottomYPos = this.y + this.h + this.gap
        ctx.drawImage(
            sprite, this.top.sx, this.top.sy, this.w, this.h,
            this.x, this.y, this.w + 10, this.h)
        ctx.drawImage(
            sprite, this.bottom.sx, this.bottom.sy, this.w, this.h,
            this.x, bottomYPos, this.w + 10, this.h)





    }

    update() {
        if (state.current == state.game) {

            this.x -= this.dx;
            let bPP = this.y + this.h + this.gap

        }
    }

}



let Pipes = []

let pd = -1


setInterval(() => {
    if (state.current == state.game) {
        let pipes = new pipe()

        Pipes.push(pipes)

        pd++

        if (pd >= -2) {
            score.value = pd + 2
            if (score.best < score.value) {
                score.best = score.value
                localStorage.setItem("best", score.best)
            }
        }

        if (pd > 0) {
            Pipes.shift()

        }
    }

}, 1800)





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
    sy: -5,
    w: 170,
    h: 50,
    x: -5,
    y: ca.height - 50,
    dx: 1,
    draw() {
        ctx.drawImage(
            sprite, this.sx, this.sy, this.w, this.h,
            this.x, this.y, this.w * 2, this.h)
    },
    update() {
        if (state.current == state.game) {
            if (this.x > -24) {
                this.x = this.x - this.dx
            } else this.x = -5
        }

    }
}


let bird = {
    animation: [{
            sx: 380,
            sy: 187
        },
        {
            sx: 380,
            sy: 212
        },
        {
            sx: 380,
            sy: 239
        },
        {
            sx: 380,
            sy: 211
        },
    ],
    sx: 380,
    sy: 235,
    w: 18,
    h: 14,
    x: 80,
    y: 50,
    spead: 0,
    gravity: 0.04,
    animationIndex: 0,
    rotation: 0,
    jump: 12,
    radius: 10,

    draw() {

        let Bird = this.animation[this.animationIndex]

        ctx.save()


        ctx.translate(this.x, this.y)
        //fgfgfghf
        ctx.rotate(this.rotation)

        ctx.drawImage(
            sprite, Bird.sx, Bird.sy, this.w, this.h,
            -this.w / 2, -this.h / 2, this.w + 1, this.h)

        ctx.restore()
    },

    update() {
        if (state.current == state.game) {
            this.y += this.spead
            this.spead += this.gravity

            if (this.spead * 10 < this.jump) {
                this.rotation = -25 * dg
            } else {
                this.rotation = 25 * dg
            }
        }

        if (this.y > ca.height - 43) {
        
            if(state.current==state.game){
                die.play()
            }

            state.current = state.gameover
            this.animationIndex = 1
        }
    },

    flap() {
        this.y -= this.jump
        this.spead = 0
        flap.play()

    }
}

setInterval((e) => {
    if (bird.animationIndex < 3) {
        bird.animationIndex++

    } else {
        bird.animationIndex = 0
    }
}, 200)

let gr = {
    sx: 250,
    sy: 70,
    w: 100,
    h: 25,
    x: ca.width / 2 - 100,
    y: 20,
    draw() {
        if (state.current == state.getready) {
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
    x: ca.width / 2 - 100,
    y: 10,
    draw() {
        if (state.current == state.gameover) {
            ctx.drawImage(
                sprite, this.sx, this.sy, this.w, this.h,
                this.x, this.y, this.w * 2, this.h)

            ca.style.borderColor = 'red'
        }
    }
}


let go2 = {
    sx: 260,
    sy: 190,
    w: 120,
    h: 70,
    x: ca.width / 2 - 110,
    y: 30,
    draw() {
        if (state.current == state.gameover) {
            ctx.drawImage(
                sprite, this.sx, this.sy, this.w, this.h,
                this.x, this.y, this.w * 2, this.h)
        }
    }
}

let dxp = 1

function stateControl() {
    if (state.current == state.game) {
        for (let i = 0; i < Pipes.length; i++) {
            let pipes = Pipes[i]

            pipes.dx = dxp

            pipes.gap -= dxp / 7


            if (score.value % 2 == 0 && score.value != 0) {

                dxp += 0.0005
            }

            

            if (pipes.x + pipes.w > bird.x && bird.x + bird.radius > pipes.x) {

                if (bird.y - bird.radius > pipes.y + pipes.h &&
                    bird.y < pipes.y + pipes.h + pipes.gap) {


                } else {

                    if(bird.y+bird.h<120){
                       hit.play()
                    }

                    state.current = state.gameover

                   
                }
            } 

        }
    } else if (state.current == state.getready) {
        score.value = 0
        dxp = 1
    }

}




function update() {
    bird.update()
    fg.update()
    for (let i = 0; i < Pipes.length; i++) {
        let pipes = Pipes[i]
        pipes.update()
    }
}

function draw() {
    ctx.fillStyle = "#70c5ce"
    ctx.fillRect(0, 0, ca.width, ca.height)
    bg.draw()
    bird.draw()
    gr.draw()
    for (let i = 0; i < Pipes.length; i++) {
        let pipes = Pipes[i]
        pipes.draw()
    }
    
    fg.draw()

    go1.draw()
    go2.draw()
    score.draw()

}

function animate() {
    update()
    draw()
    fram++
    if (state.current == state.getready) {
        for (let i = 0; i < Pipes.length; i++) {
            Pipes.pop()
        }

        pd = -4
    }
    stateControl()

    requestAnimationFrame(animate)
}

animate()

//state.current=0