import {Box, Drawer, FormControlLabel, MenuItem, Select, Switch, TextField} from "@mui/material";
import React, {Fragment} from "react";
import Grid from "@mui/material/Grid/Grid";



export default function PostFilters(props){

    let [search, setSearch] = React.useState("");
    let [sortVotes, setSortVotes] = React.useState(false);
    let [verifiedPosters, setVerifiedPosters] = React.useState(false);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        props.searchPosts(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortVotes(event.target.value);
    };

    const handleVerifiedPostersChange = (event) => {
        setVerifiedPosters(event.target.value);
    };



    return(
        <Grid container
              sx={{
                  padding: 3,
                  backgroundColor: '#F3F6F9',
              }}>
            <TextField
                id="outlined-basic"
                label="Search"
                value={search}
                onChange={handleSearchChange}
                sx={{
                    backgroundColor: '#FFF',
                }}
            />
            <TextField
                value={sortVotes}
                sx={{
                    backgroundColor: '#FFF',
                    minWidth: 130,
                    marginLeft: 1
                }}
                onChange={handleSortChange}
                select // tell TextField to render select
                label="Sort by"
            >
                <MenuItem key={1} value={false}>
                    Newest
                </MenuItem>
                <MenuItem key={2} value={true}>
                    Most Votes
                </MenuItem>
            </TextField>
            <TextField
                value={verifiedPosters}
                sx={{
                    backgroundColor: '#FFF',
                    minWidth: 130,
                    marginLeft: 1
                }}
                onChange={handleVerifiedPostersChange}
                select // tell TextField to render select
                label="Posts from"
            >
                <MenuItem key={1} value={false}>
                    Anyone
                </MenuItem>
                <MenuItem key={2} value={true}>
                    Experts
                </MenuItem>
            </TextField>

        </Grid>
    )
}