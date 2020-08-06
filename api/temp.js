function gameInterval(){
    //clearInterval(startInverval)
  
    setInterval(() => {
        console.log(":" + Date.now().toString())
        
        io.emit("bettingFinished",bettingTotalResult)   
        
        /** */
        for(i = 0;i < 4;i++)
        {
            BetResult.create({
                betTimePeroid:startNowTurnTime,//fix
                betType:i,
                betPrice:100,//fix
                betNumber:bettingTotalResult[i].Num,
                betColor:bettingTotalResult[i].Clr
            })
        }
       
        /** */
        startNowTurnTime = Date.now()
        console.log("start:" + (Math.ceil((startNowTurnTime - 1594989860000) / 1000)).toString())
        setTimeout(()=>{
           calcResult()
        },betTime - 8 * 1000)
        //var result = 
    },betTime)    
}