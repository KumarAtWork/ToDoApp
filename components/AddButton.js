import React from 'react';
import { Container, Fab, Icon } from 'native-base';
import { useLinkProps } from '@react-navigation/native';

const AddButton =(props)=>{
        return(
            <Container>        
                <Fab
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={props.handler}>            
                    <Icon name="add" />
                </Fab>
            </Container>
        );
    }

 export default AddButton   