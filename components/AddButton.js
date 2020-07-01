import React from 'react';
import {Fab, Icon } from 'native-base';

const AddButton =(props)=>{
        return(
                <Fab
                    style={{ backgroundColor: '#5067FF'}}
                    position="bottomRight"
                    onPress={props.handler}>            
                    <Icon name="add" />
                </Fab>
        );
    }

 export default AddButton   