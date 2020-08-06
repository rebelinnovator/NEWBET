import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import ColorItem from './coloritem'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
class GameResultTable extends Component{

    /**
     * 
     * 
    element.style {
        border-radius: 50%;
        background-color: #2b0303;
        width: 15px;
        height: 15px;
    }
     */
    render()
    {
        
        return(
            <div style={{
                display:"flex",
                justifyContent:'space-between'
            }}>

                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Period</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Number</TableCell>
                            <TableCell align="right">Color</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        { this.props.list && this.props.list.map((item)=>{
                            return(
                            <TableRow key={item._id}>
                                <TableCell component="th" scope="row">
                                    {item.betDisplayTime}
                                </TableCell>
                                <TableCell align="right">{item.betPrice}</TableCell>
                                <TableCell align="right">{item.betNumber}</TableCell>
                                <TableCell align="right">
                                    <ColorItem value={item.betColor}/>
                                    
                                </TableCell>
                            </TableRow>
                            )
                         })}
                        </TableBody>
                    </Table>
            </div>
        )
    }
}

export default GameResultTable