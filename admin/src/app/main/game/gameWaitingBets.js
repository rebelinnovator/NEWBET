import React, {Component} from 'react';

class GameWaitingBet extends Component{

    render(){
       
        let colorPattern = [
            "#00FF00",
            '#0000FF',
            '#FF0000'
        ]
        
        return(
            <div>
                {this.props.bets && this.props.bets.map((item,index)=>{
                     let numorclr = item.betCardType <= 9 ? 100 : item.betCardType - 10

                    return(
                        <div key={'key' + index} style={{
                            display:"flex",
                            justifyContent:'space-between',
                            padding:"30px 2px 20px 2px",
                            margin:'10px',
                            boxShadow:'0px 0px 1px 1px #AAA'
                        }}>
                            {numorclr == 100 && (<div style={{marginLeft:'20px'}}>
                                BettingNumber:<span style={{
                                    color:"red",
                                    marginLeft:'20px',
                                }}>{item.betCardType}</span>
                            </div>
                            )}
                             {numorclr != 100 && (
                             <div style={{marginLeft:'20px'}}>
                                BettingColor:<span style={{
                                    width:"15px",
                                    height:"15px",
                                    borderRadius:"50%",
                                    marginLeft:'20px',
                                    backgroundColor:colorPattern[numorclr],
                                    marginRight:"20px",
                                    color:colorPattern[numorclr]
                                }}>{item.betCardType}</span>
                            </div>
                            )}
                            <div>
                              {item.betCardAmount}(US$){item.betCardCount}
                            </div>
                            <div style={{marginRight:'20px'}}>
                            Waiting
                            </div>
                            
                        </div>
                    )
                })
                }
            </div>
        )
    }
}
export default GameWaitingBet
