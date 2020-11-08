import React, {Component} from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import './index.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const NEON_ORANGE = "#FF6600"
const ACTIVITIES = [
    {name: "Walking", path: "walking", id: "a1"},
    {name: "Cycling", path: "cycling", id: "a2"},
    {name: "Driving", path: "driving", id: "a3"}];
const ActivityInput = styled.div`
 ${tw`bg-white text-gray-800 border-opacity-0 border-0 hover:border-2 hover:border-yellow-orange hover:text-yellow-orange font-normal py-2 px-4 m-3 rounded`}
`
var map;
var draw;

class RouteCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -71,
            lat: 43,
            zoom: 8.5,
            activity: null,
            distance: 0,
            duration: 0,
            clearMetricsAndLinesOnNextActivitySelectClick: false
        }

        this.drawRoute = this.drawRoute.bind(this);
        this.createRoute = this.createRoute.bind(this);
        this.updateRoute = this.updateRoute.bind(this);
        this.deleteRoute = this.deleteRoute.bind(this);
        this.getRouteMetrics = this.getRouteMetrics.bind(this);
    }

    componentDidMount() {
        map = new mapboxgl.Map({
            container: this.routeCreatorMap,
            style: 'mapbox://styles/klu17/ckh98gx7u2tdf19lgx2mpx3k7',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                line_string: true,
                trash: true
            }
        });

        map.addControl(draw, "top-left");
        map.on('draw.create', this.createRoute);
        map.on('draw.delete', this.deleteRoute);
        map.on('draw.update', this.updateRoute);
    }

    handleActivityClick(e, data) {
        if(this.state.clearMetricsOnNextActivitySelectClick) {
            this.setState({distance: 0, duration: 0, clearMetricsOnNextActivitySelectClick: false});
            this.deleteRoute();
        }
        this.setState({activity: data.path});
        e.preventDefault();
    }

    updateRoute(e) {
        let data = draw.getAll();
        map.removeLayer('route').removeSource('route');
        const coordinates = data.features[0].geometry.coordinates;
        this.drawRoute(coordinates);
        this.getRouteMetrics(coordinates);
    }

    getRouteMetrics(data) {
        if (this.state.activity) {
            var url = 'https://api.mapbox.com/directions/v5/mapbox/' + this.state.activity + '/' + data.join(';') + '?geometries=geojson&steps=true&&access_token=' + mapboxgl.accessToken;
            var req = new XMLHttpRequest();
            req.responseType = 'json';
            req.open('GET', url, true);
            req.onload = function () {
                var jsonResponse = req.response;
                var distance = jsonResponse.routes[0].distance * 0.001; // convert to km
                var duration = jsonResponse.routes[0].duration / 60; // convert to minutes
                this.setState({distance: distance.toFixed(2), duration: duration.toFixed(2)});
            }.bind(this);
            req.send();
        } else {
            alert("No activity was selected.");
            return;
        }
        this.setState({clearMetricsOnNextActivitySelectClick: true});
    }

    drawRoute(points) {
        map.addSource('route', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': points
                }
            }
        });
        map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': NEON_ORANGE,
                'line-width': 6
            }
        });
    }

    createRoute(e) {
        let data = draw.getAll();
        const coordinates = data.features[0].geometry.coordinates;
        this.drawRoute(coordinates);
        this.getRouteMetrics(coordinates);
    }

    deleteRoute(e) {
        let data = draw.getAll();
        map.removeLayer('route').removeSource('route');
    }

    render() {
        return (
            <React.Fragment>
                <div className="max-w overflow-hidden">
                    <div className="px-6 py-4">
                        <div className="font-light text-xl mb-2">Create a route.</div>
                        <p className="font-light text-gray-700 text-base">
                            Select your activity. Draw your route. Submit.
                        </p>
                        <div className="activityMenu flex items-center">
                            {ACTIVITIES.map((data) => {
                                return (
                                    <ActivityInput
                                        className={this.state.activity === data.path ? 'selectedActivityInput' : null}
                                        key={data.id} type="radio" id={data.id}
                                        name="activity" value={data.path}
                                        onClick={(e) => this.handleActivityClick(e, data)}>{data.name}</ActivityInput>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="routeCreatorMapContainer">
                    <div ref={e => this.routeCreatorMap = e} className="routeCreatorMap"/>
                </div>
                <div className="max-w overflow-hidden metricsBox">
                    <div className="px-6 py-4">
                        <div className="font-light text-xl mb-2">Route Metrics</div>
                        <p className="font-light text-gray-700 text-base">
                            <span>Activity: <span className="capitalize">{this.state.activity ? this.state.activity : "- -"}</span><br/>
                            Distance: {this.state.distance ? this.state.distance : "- -"} km<br/>
                            Duration: {this.state.duration ? this.state.duration : "- -"} minutes</span>
                        </p>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default RouteCreator;
