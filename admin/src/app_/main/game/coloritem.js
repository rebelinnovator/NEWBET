import React, {Component} from 'react';
import color from '@material-ui/core/colors/amber';


class ColorItem extends Component{

    render()
    {
        let colors = []
        let clrTemp = this.props.value
        let hasVio = false
        let clrPattern = [
            '#00FF00',
            '#0000FF',
            '#FF0000'
        ]

        if(Math.floor(clrTemp / 1000))
            colors.push(2)
        clrTemp -= 1000 * Math.floor(clrTemp / 1000)
        if(Math.floor(clrTemp / 100))
            hasVio = true
            
        clrTemp -= 100 * Math.floor(clrTemp / 100)
        if(Math.floor(clrTemp / 10))
            colors.push(0)
            if(hasVio)
            colors.push(1)
//        console.log(clrTemp)
//        console.log(colors)
        return(
            <div style={{
                display:"flex",
                justifyContent:"center"
            }}>
                {colors.map((item,index)=>{
                 //   console.log(index)
                   return( <div key={'key' + index} style={{
                       width:"15px",
                       height:"15px",
                       borderRadius:"50%",
                       backgroundColor:clrPattern[item],
                       marginLeft:"10px"
                   }}></div>)
                })}
            </div>
        )
    }
}
export default ColorItem