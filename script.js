var canvas = document.querySelector('#canvas')
var ctx = canvas.getContext("2d")
console.log(ctx);
var okUP = false
var okDown = false
var shot = false
//отрисовка игрового поля
var drawBackground = ()=>{
    ctx.fillStyle = "darkseagreen"
    ctx.fillRect(0,0,1000,400)
}
class Fish{
    constructor(x,y){
        // присваивает эти м полям x y  значения x и y
        this.x = x
        this.y = y
    }
    // метод для назначения цвета рыбы
    setSetings(){
        var arrColors = ["red","green","yellow","lime","orangered","teal","agua","olive","blueviolet","brown","saddlerbrown","chocolate","purple","navy","darkslategray","dodgerblue"]
        // генерим случайный индекс на длинну массива
        var randIndex = Math.floor(Math.random()*arrColors.length);
        // назначаем цвет с рандомным индексом из массива
        this.color = arrColors[randIndex]

        // //случайная скорость
        // this.speed = Math.random()*4+3
        // this.offsetY = Math.random()*300+50
        // this.freq = Math.random()*0.01
        // this.ampl = Math.random()*100+50

        //случайная скорость
        this.speed = Math.random()*4+3
        this.offsetY = Math.random()*280+50
        this.freq = Math.random()*0.01
        this.ampl = Math.random()*90+40
    }
    //  метод для отрисовки рыбы
    drawFish(){
        if (this.x < -10){
            this.setSetings()
            this.x = 1020
        }
        //чтобы рыбфа выезжала
        this.x -= this.speed
        this.y = this.offsetY + this.ampl *  Math.cos(this.x * this.freq)


        ctx.fillStyle = this.color
        // метод говорит что мы начинаем отрисовку
        ctx.beginPath()
        // задаем траекторию дуги с координатами центра дуги, 20 это радиус 0 и 2*Math.PI начало и онец дуги в нашем случае окружность фолс это напрвление дуги против часовой стрелки
        ctx.arc(this.x, this.y, 10, 0, 2*Math.PI, false)
        // заливаем окружность нашим цветом
        ctx.fill()
        ctx.stroke()

        // создаем хвост
        ctx.beginPath()
        //добавляем по х 2 радиуса для смещения и для того чтоб обрубить окружность в нужных точка Math.PI/2 верхняя , нижняя  3*Math.PI/2
        ctx.arc(this.x +20, this.y, 10, Math.PI/2, 3*Math.PI/2, false)
        ctx.fill()
        ctx.stroke()

        // рисуем глаз
        ctx.fillStyle = "white"
        ctx.beginPath()
        ctx.arc(this.x-5, this.y-3, 3, 0, 2*Math.PI, false)
        ctx.fill()

        // рисуем зрачек
        ctx.fillStyle = "black"
        ctx.beginPath()
        ctx.arc(this.x-5, this.y-3, 1, 0, 2*Math.PI, false)
        ctx.fill()

         // рисуем рот
         ctx.fillStroke = "black"
         ctx.beginPath()
         ctx.moveTo(this.x - 9, this.y+4)
         ctx.lineTo(this.x - 4, this.y+4)
         ctx.stroke()
        //  ctx.arc(this.x-5, this.y-3, 3, 0, 2*Math.PI, false)
        //  ctx.fill()
    }

}
//создаем экземпляр рыбы с помощью конструктра
var fish  = new Fish(1020,0)
//добавляю рыбе  случайный цвет
fish.setSetings()
//создаем 2 экземпляр рыбы с помощью конструктра

var fish2  = new Fish(1520,0)
fish2.setSetings()

class Bullet{
    constructor(x,y){
        // присваивает эти м полям x y  значения x и y
        this.x = x
        this.y = y
    }

    arrBullet =[]

    // метод для отрисовки пули
    drawBullet(){
        if(shot===true&&this.arrBullet.length<10){
            shot = false
            var flyBullet = new Bullet(this.x,this.y)
            this.arrBullet.push(flyBullet)
            console.log(this.arrBullet);

        }
        //проверка чтобыпуля стрелляла
        if (this.arrBullet.length>0){
            this.arrBullet.forEach(element=>{
                ctx.fillStyle = "black" 
                ctx.beginPath()
                ctx.arc(element.x , element.y, 5, Math.PI/2, 3*Math.PI/2, true)
                ctx.fill()
                //проверка попадания пули в рыбу по формуле в тетради и если это расстоояние меньше суммы радиусов значит пуля попала
                if(Math.sqrt(Math.pow(element.x-fish.x,2)+Math.pow(element.y - fish.y,2))<15){
                    fish.color = "black"
                }

                if(Math.sqrt(Math.pow(element.x-fish2.x,2)+Math.pow(element.y - fish2.y,2))<15){
                    fish2.color = "black"
                }

                element.x += 5
                // проверка если пуля вылетела за гранцы поля она удоляется из массива пуль
                if(element.x>1000){
                    this.arrBullet.shift()
                }
            })
        }
        //проверки для движения пули в верх и низ  соответственно 
        if(okUP===true&&this.y-5>0){
            this.y -=5
        }
        if(okDown===true&&this.y+5<400){
            this.y +=5
        }
       ctx.fillStyle = "black" 
        ctx.beginPath()
        //добавляем по х 2 радиуса для смещения и для того чтоб обрубить окружность в нужных точка Math.PI/2 верхняя , нижняя  3*Math.PI/2
        ctx.arc(this.x , this.y, 5, Math.PI/2, 3*Math.PI/2, true)
        ctx.fill()
    }

}
var bullet = new Bullet(0,200)

var animate = ()=>{
    drawBackground()
    fish.drawFish()
    fish2.drawFish()
    bullet.drawBullet()

    requestAnimationFrame(animate)
}
animate()

// задаем события клавишам цифры 38 39 40 коды кнопок клавиатуры вверх вправо вниз соответственно
addEventListener("keydown",(e)=>{
if(e.keyCode===38){
    okUP = true
}
if(e.keyCode===40){
    okDown = true
}
if(e.keyCode===39){
    shot = true
}
})
addEventListener("keyup",(e)=>{
    if(e.keyCode===38){
        okUP = false
    }
    if(e.keyCode===40){
        okDown = false
    }
    })