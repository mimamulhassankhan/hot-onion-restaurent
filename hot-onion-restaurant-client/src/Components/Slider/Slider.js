import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { Button, FormControl, InputGroup, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import './Slider.css'
import { TextField } from '@material-ui/core';

const Slider = ({allFoods}) => {
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
                    return (
                    <div onClick={() => history.push(`/food/item=${option?._id}`)}>
                        {parts.map((part, index) => (
                        <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                            {part.text}
                        </span>
                        ))}
                    </div>
                    );
                }}
            />
            {/* <InputGroup className="mx-auto w-50 pt-3">
                <FormControl
                    placeholder="Search anything..."
                    aria-label="Recipient's username"
                />
                <InputGroup.Append>
                    <Button variant="danger">Button</Button>
                </InputGroup.Append>
            </InputGroup>               */}
        </Jumbotron>
    );
};

const mapStateToProps = state => {
    return{
        allFoods: state.allFoods
    }
}
export default connect(mapStateToProps)(Slider);