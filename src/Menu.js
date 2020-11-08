import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import './index.css';

const OrangeHeader = styled.div`
 ${tw`text-neon-orange font-black uppercase text-3xl tracking-tighter`}
`
const MainItem = styled(NavLink)`
 ${tw`ml-8 inline-flex items-center px-1 pt-1 leading-5 text-sm font-normal text-black hover:text-neon-orange transition duration-150 ease-in-out`}
`
const MobileMenuItem = styled(NavLink)`
 ${tw`mt-1 block pl-3 pr-4 py-2 text-base font-normal text-black hover:text-neon-orange focus:outline-none transition duration-150 ease-in-out`}
`

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobileMenuOpen: false,
            screenWidth: null
        }
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
        this.resizeScreen = this.resizeScreen.bind(this);
    }
    
    componentDidMount() {
        window.addEventListener("resize", this.resizeScreen);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeScreen)
    }

    resizeScreen() {
        if (window.innerWidth > 600) {
            this.setState({isMobileMenuOpen: false});
        }

    }

    toggleMobileMenu() {
        this.setState(prevState => ({isMobileMenuOpen: !prevState.isMobileMenuOpen}));
    }
    
    render() {
        return (
            <React.Fragment>
                <nav className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="flex-shrink-0 flex items-center">
                                    <OrangeHeader>Orange Lines</OrangeHeader>
                                </div>
                                <div className="hidden sm:ml-6 sm:flex">
                                    {this.props.menuItems.map((data) => {
                                        return (
                                            <MainItem exact to={data.path} activeClassName={"activeMenuItem"} className={"mainMenuItem"} key={data.id}>{data.name}</MainItem>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="-mr-2 flex items-center sm:hidden" onClick={this.toggleMobileMenu}>
                                <button
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                    aria-label="Main menu" aria-expanded="false">
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M4 6h16M4 12h16M4 18h16"/>
                                    </svg>
                                    <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`${this.state.isMobileMenuOpen ? "block sm:block" : "hidden sm:hidden"}`}>
                        <div className="pt-2 pb-3">
                            {this.props.menuItems.map((data) => {
                                return (
                                    <MobileMenuItem exact to={data.path} activeClassName={"activeMenuItem"} className={"mobileMenuItem"} key={data.id + 'Mobile'}>{data.name}</MobileMenuItem>
                                );
                            })}
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
     
}
export default Menu;
