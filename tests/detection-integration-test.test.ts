import {Detection, Detector, Loader} from "../src/coco/loader";
import {Canvas, Image} from "canvas";
import {ImageUtils} from "../src/utils/image-utils";

const path = require('path');
const fs = require('fs');

jest.setTimeout(20000);

test('Loader-detect-image-full-model-IT', async () => {
    const modelLoader: Loader = new Loader(mockLogging());
    const detector: Detector = await modelLoader.loadCoco();
    await verifyDetections(detector);
});

test('Loader-detect-image-lite-model-IT', async () => {
    const modelLoader: Loader = new Loader(mockLogging());
    const detector: Detector = await modelLoader.loadCoco();
    await verifyDetections(detector);
});

const verifyDetections = async (detector: Detector) => {
    expect(detector).not.toBeNull();

    ImageUtils.userStoragePath = require('os').homedir();
    let image: Image = await ImageUtils.createImage(path.resolve('resources/images/test.jpg'));
    expect(image).not.toBeNull();

    let detections: Detection[] = await detector.detect(image, true);
    expect(detections).not.toBeNull();
    expect(detections.length).toBeGreaterThan(0);

    const annotatedImage: Canvas = await ImageUtils.generateAnnotatedImage(image, detections);
    const fileName: string = await ImageUtils.saveCanvasToFile(annotatedImage);
    let stats = fs.statSync(fileName);
    expect(stats.isFile()).toBeTruthy();

    fs.unlinkSync(fileName);
};

const mockLogging = (): any => {
    return {
        info: jest.fn((message: string) => {
            console.log(message);
        }),
        debug: jest.fn((message: string) => {
            console.log(message);
        })
    }
}