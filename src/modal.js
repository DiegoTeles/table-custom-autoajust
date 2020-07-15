import React, { useState } from "react";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function Modal(props) {
    const classes = useStyles();

    const [carrier, setCarrier] = useState({
        carriers: [{
            cnpj: '5445643178541',
            name: 'Teste 01'
        },
        {
            cnpj: '5445643178541',
            name: 'Teste 02'
        },
        {
            cnpj: '5445643178541',
            name: 'Teste 03'
        }]
    })

    const [open, setOpen] = useState(false);
    const [data, setData] = useState(false);
    const [d, setD] = useState([])
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        setData({ ...data, [name]: value, id: props.setItem.id });
    };

    const handleChangeCarrier = event => {
        const value = event.target.value;
        const name = event.target.name;
        if (event.type === "click") {
            setD([ ...d,  value])
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const param = {
            id: data.id,
            region: data.region,
            postalCodeEnd: data.postalCodeEnd,
            postalCodeStart: data.postalCodeStart,
            carriers: d
        }

        console.log('Fim do evento :>> ', JSON.stringify(param));
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Editar
        </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edite sua abrangência para {props.setItem.region}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="region"
                            label="Região"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="postalCodeStart"
                            label="CEP Inicial"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="postalCodeEnd"
                            label="CEP final"
                            onChange={handleChange}
                        />

                        {[1, 2, 3, 4].map((item, index) => {
                            index++;
                            return (
                                <TextField
                                    select
                                    label="Select"
                                    onChange={handleChangeCarrier}
                                    name={item}
                                    type="select"
                                    helperText={`Transportadora ${item}`}
                                >
                                    {carrier.carriers.map((option) => {
                                        const shipping = `shipping${item}`
                                        return (
                                            <MenuItem key={index} value={{carrier: { cnpj: option.cnpj, name: option.name},  position: index }}>
                                                {option.name}
                                            </MenuItem>

                                        )
                                    })}
                                </TextField>

                            );
                        })}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
            </Button>
                        <Button type="submit" onClick={handleClose} color="primary">
                            Salvar
            </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}