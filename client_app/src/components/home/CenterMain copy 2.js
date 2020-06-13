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
        // // this.canvas = new fabric.Canvas('sketch', {
        // //     isDrawingMode: true,
        // // });

        // // this.canvas.freeDrawingBrush.width = this.props.toolSize;
        // // this.canvas.freeDrawingBrush.color = this.props.colorSelect;

        // // this.setImage();
        // // this.canvas = document.getElementById("sketch");
        // let background = new Image();
        // // background.crossOrigin = 'anonymous'
        // let src = img;
        // background.src = src;
        // // // background.src = "https://html5.litten.com/layers/city.png";
        // let canvasA = document.getElementById("sketch");
        // let ctx = canvasA.getContext("2d");
        // //ctx.drawImage(background, 0, 0);
        // background.onload = () => {
        //     ctx.drawImage(background, 0, 0, canvasA.width, canvasA.height);
        //     let imgData = ctx.getImageData(0, 0, background.width, background.height);
        //     for (let i = 0; i < imgData.data.length; i += 4) {
        //         if (imgData.data[i] === 255 && imgData.data[i + 1] === 255 && imgData.data[i + 2] === 255) { imgData.data[i + 3] = 0; }
        //     }
        //     ctx.putImageData(imgData, 0, 0);
        // }

        // this.canvasB = new fabric.Canvas('sketch-image', {
        //     isDrawingMode: true
        // });

        // this.canvasB.freeDrawingBrush.width = this.props.toolSize;
        // this.canvasB.freeDrawingBrush.color = this.props.colorSelect;
        // this.canvasB.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        // this.canvasB.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        // this.canvasB.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.canvas = document.getElementById("sketch-image");
        this.ctx = this.canvas.getContext("2d");
        this.drawing = false;
        this.drawingMode = "add";
        this.pencilWidth = this.props.toolSize;
        this.fillColor = this.props.colorSelect;
        // this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        // this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        // this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));


        this.canvasA = document.getElementById("sketch");
        let background = new Image();
        background.crossOrigin = 'anonymous'
        //  const img = `http://www.supercoloring.com/sites/default/files/styles/coloring_full/public/cif/2009/01/european-badger-coloring-pages.png`;
        let src = img;
        background.src = src;
        let ctx = this.canvasA.getContext("2d");
        //ctx.drawImage(background, 0, 0);
        background.onload = () => {
            ctx.drawImage(background, 0, 0, this.canvasA.width, this.canvasA.height);
            let imgData = ctx.getImageData(0, 0, background.width, background.height);
            for (let i = 0; i < imgData.data.length; i += 4) {
                if (imgData.data[i] === 255 && imgData.data[i + 1] === 255 && imgData.data[i + 2] === 255) { imgData.data[i + 3] = 0; }
            }
            ctx.putImageData(imgData, 0, 0);
        }
         this.canvasA.addEventListener('mousedown', (e) => this.handleMouseDown(e));
         this.canvasA.addEventListener('mousemove', (e) => this.handleMouseMove(e));
         this.canvasA.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    }
    getMouseCoordinate(evt) {
        debugger
        const { x, y } = this.canvas.getBoundingClientRect();
        let a = this.canvas.offsetLeft;
        let b = this.canvas.offsetTop;
        return {
            x: evt.pageX - this.canvas.offsetLeft,
            y: evt.pageY - this.canvas.offsetTop,
        };
    };
    handleMouseDown(e) {
        if (this.drawing) return false;
        this.drawing = true;
        var mouse = this.getMouseCoordinate(e);

        this.ctx.globalCompositeOperation = this.drawingMode === "add" ? "xor" : "destination-out";
        this.ctx.fillStyle = this.drawingMode === "add" ? this.fillColor : "rgba(0,0,0,1)";

        this.ctx.beginPath();
        this.ctx.rect(mouse.x, mouse.y, this.pencilWidth, this.pencilWidth);
        this.ctx.fill();
        this.ctx.closePath();
    }

    handleMouseUp(e) {
        if (!this.drawing) return false;
        this.drawing = false;
    }
    handleMouseMove(e) {
        if (!this.drawing) return false;
        this.ctx.globalCompositeOperation = this.drawingMode === "add" ? "xor" : "destination-out";
        var mouse = this.getMouseCoordinate(e);
        this.ctx.beginPath();
        this.ctx.rect(mouse.x, mouse.y, this.pencilWidth, this.pencilWidth);
        this.ctx.fill();
        this.ctx.closePath();
    }
    setImage() {

        let src = "http://www.supercoloring.com/sites/default/files/styles/coloring_full/public/cif/2014/11/polar-bear-with-two-cubs-coloring-page.png";
        let background = new Image();
        background.src = src;
        let ctx = this.canvas.getContext("2d");
        // background.onload = () => {
        //     // ctx.save();
        //     // ctx.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);
        //     var dArr = [-1, -1, 0, -1, 1, -1, -1, 0, 1, 0, -1, 1, 0, 1, 1, 1], // offset array
        //         s = 2,  // thickness scale
        //         i = 0,  // iterator
        //         x = 5,  // final position
        //         y = 5;

        //     // draw images at offsets from the array scaled by s
        //     for (; i < dArr.length; i += 2)
        //         ctx.drawImage(background, x + dArr[i] * s, y + dArr[i + 1] * s);

        //     // fill with color
        //     ctx.globalCompositeOperation = "source-in";
        //     ctx.fillStyle = "red";
        //     ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        //     // draw original image in normal mode
        //     ctx.globalCompositeOperation = "source-over";
        //     ctx.drawImage(background, x, y);
        // }

        // fabric.Image.fromURL(src, (img) => {
        //     debugger
        //     img.set({
        //         left: 0,
        //         top: 0,
        //         // evented: false

        //     });
        //     // img.scaleToWidth(this.canvas.width);
        //     // img.scaleToHeight(this.canvas.height);
        //     img.width = this.canvas.width;
        //     img.height = this.canvas.height;
        //     // img.setCoords(true);
        //     this.canvas.add(img);
        // });

        this.canvas.setBackgroundImage(src, this.canvas.renderAll.bind(this.canvas), {
            width: this.canvas.width,
            height: this.canvas.height,
            top: 0,
            left: 0,
        });
    }
    componentWillReceiveProps(newProps, e) {
        this.drawingMode = "add";

        if (newProps.tool === ToolDraw[0]) {
            this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
        }
        if (newProps.tool === ToolDraw[1]) {
            // this.canvas.freeDrawingBrush.shadow = new fabric.Shadow({
            //     blur: parseInt(this.props.toolSize, 10) || 0,
            //     offsetX: 0,
            //     offsetY: 0,
            //     affectStroke: true,
            //     color: newProps.colorSelect,
            // });
            // this.canvas.freeDrawingBrush = new fabric.PatternBrush(this.canvas);
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
            // this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
            // this.canvas.freeDrawingBrush.color = "white"
            // this.canvas.freeDrawingBrush.width = newProps.toolSize;

            this.drawingMode = "delete";
        }
        if (newProps.clearCanvas) {
            this.canvas.clear();
            this.setImage();
            this.props.clearCanvasDispatch(CLEAR_CANVAS, false);
        }
    }
    render() {
        const img = `http://www.supercoloring.com/sites/default/files/styles/coloring_full/public/cif/2009/01/european-badger-coloring-pages.png`;
        return (
            <div id="center" style={{ height: 450 }} >
                <div id="canvasDiv" className="aa" style={{ height: '100%', width: '100%' }}>

                    <canvas id="sketch-image" width="777" height="450">
                    </canvas>
                    <canvas id="sketch" width="777" height="450">
                    </canvas>

                    {/* <canvas id="sketch" width="500" height="450" style={{ position: 'absolute', left: 0, top: 0, zIndex: 10, backgroundColor: 'transparent' }}
                    >
                    </canvas>
                    <canvas id="sketch-image" width="500" height="450" style={{ position: 'absolute', left: 0, top: 0, zIndex: 10, backgroundColor: 'transparent' }}>
                    </canvas> */}

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
