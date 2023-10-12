let ca =document.querySelector("canvas")
let ctx = ca.getContext("2d")

let fram=0

let sprite = new Image()

sprite.src="image/template.jpg"

function update(){

}

function draw(){
    ctx.fillStyle="#70c5ce"
    ctx.fillRect(0,0,ca.width,ca.height)
}

function animate(){
    update()
    draw()
    fram++

    requestAnimationFrame(animate)
}

animate()








