import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fabric } from 'fabric';
import { SAVE_IMAGE, CLEAR_CANVAS } from '../../constants/commonConstant';
import { ToolDraw } from "../../constants/masterData";
import img from "../../assets/images/color.png"
class CenterMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drawing: false,
            startPoint: [0, 0]
        };
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas('sketch', {
            isDrawingMode: true,
        });
        this.canvas.freeDrawingBrush.width = this.props.toolSize;
        this.canvas.freeDrawingBrush.color = this.props.colorSelect;


        this.canvasImage = document.getElementById("sketch-image");
        let background = new Image();
        background.crossOrigin = 'anonymous'
        background.src = img;
        let ctx = this.canvasImage.getContext("2d");
        background.onload = () => {
            ctx.drawImage(background, 0, 0, this.canvasImage.width, this.canvasImage.height);
            let imgData = ctx.getImageData(0, 0, background.width, background.height);
            for (let i = 0; i < imgData.data.length; i += 4) {
                if (imgData.data[i] === 255 && imgData.data[i + 1] === 255 && imgData.data[i + 2] === 255) { imgData.data[i + 3] = 0; }
            }
            ctx.putImageData(imgData, 0, 0);
        }
        this.canvasImage.addEventListener('mousedown', (e) => this._handleMouseDown(e));
        this.canvasImage.addEventListener('mousemove', (e) => this._handleMouseMove(e));
        document.addEventListener('mouseup', (e) => this._handleMouseUp(e));
    }
    _handleMouseDown(e) {
        // this.canvas.on('mouse:down', () => { });

        this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush.width = this.props.toolSize;
        this.canvas.freeDrawingBrush.color = this.props.colorSelect;
    }
    _handleMouseMove(e) {
        // this.canvas.on('mouse:move', () => { });
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush.width = this.props.toolSize;
        this.canvas.freeDrawingBrush.color = this.props.colorSelect;
    }
    _handleMouseUp(e) {
        // this.canvas.on('mouse:up', () => { });

    }
    componentWillReceiveProps(newProps, e) {
        this.drawingMode = "add";

        if (newProps.tool === ToolDraw[0]) {
            this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
        }
        if (newProps.tool === ToolDraw[1]) {
            this.canvas.freeDrawingBrush = new fabric.PatternBrush(this.canvas);
        }
        if (newProps.tool === ToolDraw[2]) {
            this.canvas.freeDrawingBrush = new fabric.SprayBrush(this.canvas);
        }
        if (this.canvas.freeDrawingBrush) {
            this.canvas.freeDrawingBrush.width = newProps.toolSize;
            this.canvas.freeDrawingBrush.color = newProps.colorSelect;
        }
        if (newProps.tool === 'eraser') {
            this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
            this.canvas.freeDrawingBrush.color = "white"
            this.canvas.freeDrawingBrush.width = newProps.toolSize;
        }
        if (newProps.clearCanvas) {
            this.canvas.clear();
            this.setImage();
            this.props.clearCanvasDispatch(CLEAR_CANVAS, false);
        }
    }
    render() {
        return (
            <div id="center" style={{ height: 450 }} >
                <div id="canvasDiv" className="aa" style={{ height: '100%', width: '100%' }}>
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
