import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';
const overrides = {
   
    MuiButtonBase:{
        root:{
            color:"white",
            minWidth:"10px"
        }
    }
}
class GameButtonGroup extends Component{
    
  
    render()
    {
        let bvalueList = [0,1,2,3,4,5,6,7,8,9]
        return(
            <MuiThemeProvider theme={{
                ...this.props.theme,
                overrides: overrides
            }}>
                
                {this.props.enabled === true && (
                    <React.Fragment>
                <div className="p-2" style={{
                               display:"flex",
                               justifyContent:'space-between'
                           }}>
                    <Button style={{margin:'5px',color:'green'}} fullWidth variant="outlined" color="primary"  value={10} onClick={this.props.buttonClick}>Green</Button>
                    <Button style={{margin:'5px',color:'blue'}} fullWidth variant="outlined" color="primary" value={11} onClick={this.props.buttonClick}>Violet</Button>
                    <Button style={{margin:'5px',color:'red'}} fullWidth variant="outlined" color="primary"  value={12} onClick={this.props.buttonClick}>Red </Button>
                </div>
                
                <div className="p-2" style={{
                            display:"flex",
                            justifyContent:'space-between'
                        }}>
                    
                    <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={0} onClick={this.props.buttonClick}>0</Button>
                    <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={1} onClick={this.props.buttonClick}>1</Button>
                    <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={2} onClick={this.props.buttonClick}>2</Button>
                    <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={3} onClick={this.props.buttonClick}>3</Button>
                    <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={4} onClick={this.props.buttonClick}>4</Button>
                </div>
                <div className="p-2" style={{
                            display:"flex",
                            justifyContent:'space-between'
                        }}>
                    <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={5} onClick={this.props.buttonClick}>5</Button>
                    <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={6} onClick={this.props.buttonClick}>6</Button>
                    <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={7} onClick={this.props.buttonClick}>7</Button>
                    <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={8} onClick={this.props.buttonClick}>8</Button>
                    <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={9} onClick={this.props.buttonClick}>9</Button>
                </div>
               
                </React.Fragment>
                )}
                 {this.props.enabled === false && (
                    <React.Fragment>
                    <div className="p-2" style={{
                            display:"flex",
                            justifyContent:'space-between'
                        }}>
                        <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={10} disabled onClick={this.props.buttonClick}>Join Green</Button>
                        <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={11} disabled onClick={this.props.buttonClick}>Join Violet</Button>
                        <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={12} disabled onClick={this.props.buttonClick}>Join Red </Button>
                    </div>
                    
                    <div className="p-2" style={{
                        display:"flex",
                        justifyContent:'space-between'
                    }}>
                        
                        <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={0} disabled onClick={this.props.buttonClick}>0</Button>
                        <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={1} disabled onClick={this.props.buttonClick}>1</Button>
                        <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={2} disabled onClick={this.props.buttonClick}>2</Button>
                        <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={3} disabled onClick={this.props.buttonClick}>3</Button>
                        <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={4} disabled onClick={this.props.buttonClick}>4</Button>
                    </div>
                    <div className="p-2" style={{
                        display:"flex",
                        justifyContent:'space-between'
                    }}>
                        <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={5} disabled onClick={this.props.buttonClick}>5</Button>
                        <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={6} disabled onClick={this.props.buttonClick}>6</Button>
                        <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={7} disabled onClick={this.props.buttonClick}>7</Button>
                        <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={8} disabled onClick={this.props.buttonClick}>8</Button>
                        <Button style={{margin:'5px'}} fullWidth variant="outlined" color="primary" value={9} disabled onClick={this.props.buttonClick}>9</Button>
                    </div>
                    
                    </React.Fragment>
                )}
            </MuiThemeProvider>
        )
    }
}
export default GameButtonGroup