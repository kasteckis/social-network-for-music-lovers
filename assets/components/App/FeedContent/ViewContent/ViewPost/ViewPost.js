import React, {Component} from 'react';

class ViewPost extends Component {

    componentDidMount() {
    }

    render() {
        console.log(this.props.match.params.id);

        return (
            <div>
                aaa
            </div>
        );
    }
}

export default ViewPost;