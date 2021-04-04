import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import './Slider.css'
import { TextField } from '@material-ui/core';

const Slider = ({allFoods, restaurants}) => {
    const history = useHistory();
    return (
        <Jumbotron className="jumbotron-body align-middle">
            <h1>Best food wating for your stomach!</h1>
            <Autocomplete
                className="mx-auto pt-3"
                style={{ width: 500 }}
                options={allFoods}
                getOptionLabel={(option) => option?.foodName || option?.name}
                renderInput={(params) => (
                    <TextField {...params} label="Search any food" variant="filled" margin="normal" />
                )}
                renderOption={(option, { inputValue }) => {
                    const matches = match(option?.foodName || option.name, inputValue);
                    const parts = parse(option?.foodName || option.name, matches);
                    const [selectedRes] = restaurants.filter(rest => rest._id === option?.restaurantId);
                    return (
                    <div onClick={() => history.push(`/food/item=${option?._id}`)} style={{width: '100%'}}>
                        {parts.map((part, index) => (
                        <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                            {part.text}
                        </span>
                        ))}
                        <div className="d-flex justify-content-between flex-wrap">
                            <div>
                                <small >{selectedRes?.restaurantName}</small>
                            </div>
                            <div>
                                <small className="text-danger">{option.foodPrice}</small>
                            </div>
                        </div>
                    </div>
                    );
                }}
            />
        </Jumbotron>
    );
};

const mapStateToProps = state => {
    return{
        allFoods: state.allFoods,
        restaurants: state.restaurants
    }
}
export default connect(mapStateToProps)(Slider);