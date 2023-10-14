function StGm(){
const startGame = startGameRender()
document.body.insertAdjacentHTML('afterbegin', startGame);



function startGameRender(){
    
    return `<container>
    <canvas id="canvas" width="1000" height="400"></canvas>
    <div class="controlBlock">
    <div class="upDown">
        <div class="up">up</div>
      
        <div class="down">down</div>
    </div>
    <div class="hits">hits :
         <span id="hits">0</span>
    </div>
    <button class="startStop">Start</button>
    <div class="shot">shot</div>
 </div>
   
</container>
    `
  
}


var startStop = document.querySelector('.startStop')
startStop.addEventListener('click',(e)=>{
    startStop.classList.toggle('active')
    if(e.target.className=="startStop active"){
        console.log(123);
        startStop.innerHTML = 'stop'
        Game()
       
       
    }
    // if(e.target.className=="startStop")
    // {
    //     startStop.innerHTML = 'Start'
    //     console.log(456);
    //     startGame
    // }
})
}
StGm()

