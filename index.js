let ca =document.querySelector("canvas")
let ctx = ca.getContext("2d")

let fram=0

let sprite = new Image()

sprite.src="image/template.png"

let bg={
    sx:0,
    sy:0,
    w:150,
    h:226,
    x:-5,
    y:ca.height-226,
    draw(){
        ctx.drawImage(
            sprite,this.sx,this.sy,this.w,this.h,
            this.x,this.y,this.w*2,this.h)
            
            ctx.drawImage(
                sprite,this.sx,this.sy,this.w,this.h,
                this.w,this.y,this.w*2,this.h)
    }
}













function update(){

}

function draw(){
    ctx.fillStyle="#70c5ce"
    ctx.fillRect(0,0,ca.width,ca.height)
    bg.draw()
}

function animate(){
    update()
    draw()
    fram++

    requestAnimationFrame(animate)
}

animate()








