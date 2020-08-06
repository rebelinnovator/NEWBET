import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
class GameTimeCount extends Component{
    render()
    {
        let min = Math.floor(this.props.remainTime / 60)
        let sec = Math.floor(this.props.remainTime % 60)
        return(
            <p style={{
                fontSize:"20px"
            }}> 
                {min}:{sec}
            </p>
        )
    }
}
export default GameTimeCount