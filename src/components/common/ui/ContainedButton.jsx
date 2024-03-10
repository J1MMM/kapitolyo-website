import { Button, Typography } from '@mui/material';
import React from 'react';

const ContainedButton = ({ onClick, icon, title }) => {
    return (
        <Button
            variant="contained"
            size="small"
            onClick={onClick}
            disableFocusRipple
        >
            {icon}
            <Typography
                component={"span"}
                pr={1}
                variant="caption"
                color="#FFF"
            >
                {title}
            </Typography>
        </Button>
    );
}

export default ContainedButton;
