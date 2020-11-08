import React, {Component} from 'react';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="max-w overflow-hidden">
                    <div className="px-6 py-4">
                        <div className="font-light text-xl mb-2">Strive for growth.</div>
                        <p className="font-light text-gray-700 text-base">
                            Orange Lines is a React web app which uses the MapBox API. It is inspired by Strava, an exercise app which connects me to others and motivates me to push my limits. Developed by Karmen Lu.
                        </p>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}
export default About;
