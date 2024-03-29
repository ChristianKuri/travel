import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'
import useStyles from './styles'
import PlaceDetails from '../PlaceDetails/PlaceDetails'


export default function List({ places, placeClicked, isLoading, type, setType, rating, setRating }) {
    const classes = useStyles()
    
    const [elRefs, setElRefs] = useState([])

    useEffect(() => {
        setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places])

    return (
        <div className={classes.container}>
            <Typography variant='h4'>Restaurants, Hotels & Attractions around you</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select value={type} onChange={(e) => {
                            setType(e.target.value)
                        }}> 
                            <MenuItem value='restaurants'>Restaurants</MenuItem>
                            <MenuItem value='hotels'>Hotels</MenuItem>
                            <MenuItem value='attractions'>Attractions</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel>Rating</InputLabel>
                        <Select value={rating} onChange={(e) => {
                            setRating(e.target.value)
                        }}> 
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={3}>3 stars or more</MenuItem>
                            <MenuItem value={4}>4 stars or more</MenuItem>
                            <MenuItem value={4.5}>4.5 stars or more</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {places?.map((place, index) => (
                            <Grid ref={elRefs[index]} item key={index} xs={12}>
                                <PlaceDetails
                                    place={place}
                                    selected={Number(placeClicked) === index}
                                    refProp={elRefs[index]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </div>
    )
}
