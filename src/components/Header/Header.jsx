import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import useStyles from './styles'

export default function Header({ setCoordinates }) {
    const classes = useStyles()
    const [autocomplete, setAutocomplete] = useState(null)

    return (
        <AppBar style={{ position: 'initial' }}>
            <Toolbar className={classes.toolbar}>
                <Typography variant='h5' className={classes.title}>
                    Travel
                </Typography>
                <Box display='flex'>
                    <Typography variant='h6' className={classes.title}>
                        Explore new places
                    </Typography>
                    <Autocomplete
                        onLoad={(autocomplete) => setAutocomplete(autocomplete)}
                        onPlaceChanged={() => {
                            const lat = autocomplete.getPlace().geometry.location.lat()
                            const lng = autocomplete.getPlace().geometry.location.lng()
                            setCoordinates({ lat, lng })
                        }}
                    >
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder='Search...' classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
