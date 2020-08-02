import {ImageUtils} from "./utils/image-utils";
import {Image} from "canvas";
import {Detection, Detector, Loader} from "./coco/loader";
import {Logging} from "./utils/Logging";

const path = require('path');

export class Demo {

    public readonly logger: Logging;

    private readonly modelLoader: Loader;
    private detector: Detector;

    constructor() {
        ImageUtils.userStoragePath = require('os').homedir();

        this.logger = new Logging();
        this.modelLoader = new Loader(this.logger);
    }

    public async init(): Promise<void> {
        this.detector = await this.modelLoader.loadCoco();
    }

    public async detect(imagePath: string): Promise<Detection[]> {
        let image: Image = await ImageUtils.createImage(path.resolve(imagePath));
        return this.detector.detect(image, true);
    }
}

(async () => {
    const demo: Demo = new Demo();
    await demo.init();
    const detections: Detection[] = await demo.detect('resources/images/test.jpg');

    console.log(detections);

})();