import React from 'react';
import {Link} from "@material-ui/core";
import {useHistory} from "react-router";

function ForgotPasswordLink() {
    const history = useHistory();

    return (
        <Link
            href="#"
            variant="body2"
            onClick={(event) => {
                event.preventDefault();
                history.push('/pamirsau-slaptazodi');
            }}
        >
            Pamiršau slaptažodį
        </Link>
    );
}

export default ForgotPasswordLink;
