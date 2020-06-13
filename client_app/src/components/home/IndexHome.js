import React, { Component } from 'react';
import LeftToolBox from './LeftToolBox';
import RightColorBox from './RightColorBox';
import CenterMain from './CenterMain';
class IndexHome extends Component {
    render() {
        return (
            <div className="contaninehome" >
                <div className="container" >
                    <div className="row" style={{ paddingTop: 15 }} id="divContainer">
                        
                        <div className="col-3 col-sm-3 col-md-3">
                            <LeftToolBox />
                        </div>
                        <div className="col-6 col-sm-6 col-md-6">
                            <CenterMain />
                        </div>
                        <div className="col-3 col-sm-3 col-md-3">
                            <RightColorBox />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default IndexHome
