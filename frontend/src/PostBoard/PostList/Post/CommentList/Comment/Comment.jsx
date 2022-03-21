import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";

export default function Comment(params){
    let comment = params.comment;

    return(
        <Card>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {comment.author}
                </Typography>
                <Typography variant="body1">
                    {comment.content}
                </Typography>
            </CardContent>
        </Card>
    )
}