import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SAVE_IMAGE, CLEAR_CANVAS } from '../../constants/commonConstant';
import { ToolDraw } from "../../constants/masterData";
import img from "../../assets/images/color.png"
class CenterMain extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.canvas = document.getElementById('sketch');
        this.ctx = this.canvas.getContext('2d');
        this.drawing = false;
        this.drawingMode = true;

        this.canvasImage = document.getElementById('sketch-image');
        let background = new Image();
        background.crossOrigin = 'anonymous'
        background.src = img;
        let ctxIm = this.canvasImage.getContext('2d');
        background.onload = () => {
            ctxIm.drawImage(background, 0, 0, this.canvasImage.width, this.canvasImage.height);
            let imgData = ctxIm.getImageData(0, 0, background.width, background.height);
            for (let i = 0; i < imgData.data.length; i += 4) {
                if (imgData.data[i] === 255 && imgData.data[i + 1] === 255 && imgData.data[i + 2] === 255) { imgData.data[i + 3] = 0; }
            }
            ctxIm.putImageData(imgData, 0, 0);
        }
        this.canvasImage.addEventListener('mousedown', (e) => this._handleMouseDown(e));
        this.canvasImage.addEventListener('mousemove', (e) => this._handleMouseMove(e));
        document.addEventListener('mouseup', () => this._handleMouseUp());

    }
    componentWillReceiveProps(newProps, e) {
        this.drawingMode = newProps.tool === 'eraser' ? false : true;
        if (newProps.clearCanvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.props.clearCanvasDispatch(CLEAR_CANVAS, false);
        }
    }
    _getMouseCoordinate(evt) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        }
    };
    _handleMouseDown(e) {
        if (this.drawing) return false;
        this.drawing = true;
        this._handleDraw(e);
    }
    _handleMouseMove(e) {
        if (!this.drawing) return false;
        this._handleDraw(e);
    }
    _handleMouseUp() {
        if (!this.drawing) return false;
        this.drawing = false;
    }
    _handleDraw(e) {
        this.ctx.globalCompositeOperation = this.drawingMode ? 'xor' : 'destination-out';
        switch (this.props.tool) {
            case ToolDraw[0]:
                this._pencilBrush(e);
                break;
            case ToolDraw[1]:
                this._brushBrush(e);
                break;
            case ToolDraw[2]:
                this._sprayBrush(e);
                break;
            case 'eraser':
                this._pencilBrush(e);
                break;
            default: this._pencilBrush(e);
        }
    }
    _pencilBrush(e) {
        var mouse = this._getMouseCoordinate(e);
        this.ctx.fillStyle = this.drawingMode ? this.props.colorSelect : 'rgba(0,0,0,1)';
        this.ctx.beginPath();
        this.ctx.arc(mouse.x, mouse.y, this.props.toolSize, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }
    _brushBrush(e) {

    }
    _sprayBrush(e) {

    }
    render() {
        return (
            <div id="center" style={{ height: 450 }} >
                <div id="canvasDiv" className={this.props.tool} style={{ height: '100%', width: '100%' }}>
                    <canvas id="sketch" width="777" height="450">
                    </canvas>
                    <canvas id="sketch-image" width="777" height="450">
                    </canvas>
                </div>
            </div >
        );
    }
}



function mapStateToProps(state) {
    return {
        tool: state.drawReduct.tool,
        toolSize: state.drawReduct.toolSize,
        colorSelect: state.drawReduct.colorSelect,
        clearCanvas: state.drawReduct.clearCanvas,
        saveImage: state.drawReduct.saveImage
    };
}
const mapPropsToDispatch = dispatch => ({
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
export default connect(mapStateToProps, mapPropsToDispatch)(CenterMain);
