import React, { Component } from 'react';
import { ToolDraw, ToolSize } from '../../constants/masterData';
import { CHANGE_TOOL, CHANGE_TOOL_SIZE, CLEAR_CANVAS, SAVE_IMAGE } from '../../constants/commonConstant';
import { connect } from 'react-redux';

class LeftToolBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tool: this.props.tool,
            toolSize: this.props.toolSize
        }
    }
    _changeTool(e) {
        this.setState({ tool: e });
        this.props.changeToolDispatch(CHANGE_TOOL, e)
    }
    _changeToolSize(e) {
        this.setState({ toolSize: e.value });
        this.props.changeToolSizeDispatch(CHANGE_TOOL_SIZE, e.value)
    }
    _clearCanvas() {
        this.props.clearCanvasDispatch(CLEAR_CANVAS, true)
    }
    _saveImage() {

    }
    render() {
        return (
            <div className="col-md-4 offset-md-4 lefttoolbox">
                <ul className="panel">
                    {
                        ToolDraw.map((e, i) => {
                            return <li className={`item ` + (this.state.tool === e ? 'active' : '')} key={i} >
                                <a id={e} key={e} href="/#" onClick={this._changeTool.bind(this, e)}>
                                </a></li>
                        })
                    }
                </ul>
                <ul className="panel">
                    <li className={`item ` + (this.state.tool === 'eraser' ? 'active' : '')} >
                        <a id="eraser" onClick={this._changeTool.bind(this, 'eraser')}></a>
                    </li>
                </ul>
                <ul className="panel" >
                    {
                        ToolSize.map((e, i) => {
                            return <li className={`item ` + (this.state.toolSize === e.value ? 'active' : '')} key={i} >
                                <a id={e.name} key={e.name} href="/#" onClick={this._changeToolSize.bind(this, e)}>
                                </a></li>
                        })
                    }
                </ul>
                <div className="wrap-swither">
                    <a id="clear" className="btn" href="#" title="Clear All" data-title="Start over" onClick={this._clearCanvas.bind(this)} >
                        {/* <span className="ico">Start over</span> */}
                    </a>
                    <a id="save" className="btn" href="#" data-title="Save colored sheet as picture" title="Save as Picture"
                        onClick={this._saveImage.bind(this)} >
                        {/* <span className="ico">Save</span> */}
                    </a>
                </div>

            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        tool: state.drawReduct.tool,
        toolSize: state.drawReduct.toolSize
    };
}
const mapPropsToDispatch = dispatch => ({
    changeToolDispatch: (action, data) => {
        return dispatch({
            type: action,
            tool: data
        });
    },
    changeToolSizeDispatch: (action, data) => {
        return dispatch({
            type: action,
            toolSize: data
        });
    },
    clearCanvasDispatch: (action, data) => {
        return dispatch({
            type: action,
            clearCanvas: data
        });
    },
    saveImageDispatch: (action, data) => {
        return dispatch({
            type: action,
            saveImage: data
        });
    },
});

export default connect(mapStateToProps, mapPropsToDispatch)(LeftToolBox);