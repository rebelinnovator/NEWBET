import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import ColorItem from './coloritem'

class ManageGameOne extends Component{
    
    state = {
        selectedNum:-1,
        selectedColor:-1

    }
    
    selectNumResult = (e)=>{
        if(e.target.parentElement.value){
            //this.setState({showAmountDlg:true})
            this.setState({selectedNum:e.target.parentElement.value})
        }
    }
    selectcolorResult = (e) =>{
        if(e.target.parentElement.value){
     //       console.log(e.target.parentElement.value)
            //this.setState({showAmountDlg:true})
            
            switch(e.target.parentElement.value)
            {
                case '1':
                    this.setState({selectedColor:1000})
                    break;
                case '2':
                    this.setState({selectedColor:10})
                    break;
                case '3':
                    this.setState({selectedColor:1100})
                    break;
                case '4':
                    this.setState({selectedColor:110})
                    break;
            }
      //      console.log(this.state)
        }
    }
    setResult = ()=>{

    }
    setBetResult = ()=>{
        if(this.state.selectedNum != -1 || this.state.selectedColor != -1)
        this.props.setBetResult(this.props.type,{
            num:this.state.selectedNum,
            clr:this.state.selectedColor
        })
    }
    render(){
        let recomNum = this.props.calcdone?this.props.result.Num:'betting...'
        let selnum = this.state.selectedNum != -1?this.state.selectedNum:'None'

        let recomClr = this.props.calcdone?this.props.result.Clr:'betting...'
        let selClr = this.state.selectedColor != -1?this.state.selectedColor:'None'
     //   console.log(this.props.calcdone)
        return(
            <div style={{
                padding:'10px'
            }}>
                <div className="NumberBetting">
                <h2 style={{
                    margin:'5px'
                }}>NumberBetting</h2>
                <div>
               
                  <div className="p-4" style={{
                            display:"flex",
                            justifyContent:'space-between'
                        }}>
                    
                        <Button variant="outlined" color="primary" value={0} onClick={this.selectNumResult}>0</Button>
                        <Button variant="outlined" color="primary" value={1} onClick={this.selectNumResult}>1</Button>
                        <Button variant="outlined" color="primary" value={2} onClick={this.selectNumResult}>2</Button>
                        <Button variant="outlined" color="primary" value={3} onClick={this.selectNumResult}>3</Button>
                        <Button variant="outlined" color="primary" value={4} onClick={this.selectNumResult}>4</Button>
                    </div>
                    <div className="p-4" style={{
                                display:"flex",
                                justifyContent:'space-between'
                            }}>
                        <Button variant="outlined" color="primary" value={5} onClick={this.selectNumResult}>5</Button>
                        <Button variant="outlined" color="primary" value={6} onClick={this.selectNumResult}>6</Button>
                        <Button variant="outlined" color="primary" value={7} onClick={this.selectNumResult}>7</Button>
                        <Button variant="outlined" color="primary" value={8} onClick={this.selectNumResult}>8</Button>
                        <Button variant="outlined" color="primary" value={9} onClick={this.selectNumResult}>9</Button>
                    </div>
                    <div className="p-4" style={{
                            display:"flex",
                            justifyContent:'space-between',
                            padding:"20px"
                        }}>
                        <div>
                            <p>Recommend Number</p><br/><center><h2 style={{color:'red'}}>{recomNum}</h2></center>
                        </div>
                        <div>
                            <p>Selection Number</p><br/>
                            <center><h2 style={{color:'red'}}>{selnum}</h2></center>
                            
                          
                        </div>
                    </div>
                    
                </div>
              
                </div>
                <div className="ColorBetting">
                    <h2 style={{
                        margin:'5px'
                    }}>ColorBetting</h2>
                    

                      <div className="p-4" style={{
                            display:"flex",
                            justifyContent:'space-between'
                        }}>
                        
                        <Button variant="outlined" color="primary" value={2} onClick={this.selectcolorResult}>Green</Button>
                        <Button variant="outlined" color="primary" value={1} onClick={this.selectcolorResult}>Red</Button>
                        
                        <Button variant="outlined" color="primary" value={4} onClick={this.selectcolorResult}>G&V</Button>
                        <Button variant="outlined" color="primary" value={3} onClick={this.selectcolorResult}>R&V</Button>

                    </div>
                    <div className="p-4" style={{
                            display:"flex",
                            justifyContent:'space-between',
                            padding:"20px"
                        }}>
                        <div>
                            {recomClr == "betting..." && (
                            <div><p>Recommend Color</p><br/><center><h2 style={{color:'red'}}>{recomClr}</h2></center></div>
                            )}
                            {recomClr != "betting..." && (
                            <div><p>Recommend Color</p><br/><ColorItem value={recomClr}/></div>
                            )}
                        </div>
                        <div>
                            {selClr == "None" &&(
                                <div>
                            <p>Selection Color</p><br/>
                            <center><h2 style={{color:'red'}}>{selClr}</h2></center>
                            </div>
                            )
                            }
                            {selClr != "None" &&(
                                <div>
                            <p>Selection Color</p>
                            <h2 style={{color:'red'}}><br/><ColorItem value={selClr}/></h2>
                            </div>
                            )
                            }
                        </div>
                    </div>
                </div>
                { this.props.calcdone &&
                <Button variant="contained" color="primary"  onClick={this.setBetResult} color="primary">Confirm</Button>
                }
            </div>
        )
    }
}
export default ManageGameOne