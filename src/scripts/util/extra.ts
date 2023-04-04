type ScalableGameObjects = Phaser.GameObjects.Text | Phaser.GameObjects.BitmapText;

export function rescale_to_width(
    target_text: ScalableGameObjects | null | undefined,
    target_width: number,
    scale?: number
) {
    if (target_text) {
        if (scale) {
            target_text.setScale(scale);
            return scale;
        }

        const real_width = target_text.width * target_text.scaleX;

        const scale_value = Math.min((target_text.scaleX * target_width) / real_width, 1);
        target_text.setScale(scale_value);

        return scale_value;
    } else {
        return undefined;
    }
}

export class Swear {
    public state = 'pending' as 'pending' | 'done' | 'canceled' | 'rejected';
    public promise: Promise<any>;

    private _cancel: boolean;
    private _resolve!: Function;
    private _reject!: Function;

    constructor() {
        this._cancel = false;

        this.promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }

    cancel = () => {
        this._cancel = true;
        this.state = 'canceled';
    };

    resolve = (data?: any) => {
        if (this._cancel) return;
        this.state = 'done';
        this._resolve(data);
    };

    reject = (data?: any) => {
        if (this._cancel) return;
        this.state = 'rejected';
        this._reject(data);
    };
}

export function saveBase64ToTextures(scene: Phaser.Scene, name: string, element: any) {
    const base64 = element.getAttribute('src');
    scene.textures.addBase64(name, base64);
}

export function timer(scene: Phaser.Scene, duration: number) {
    return new Promise(function (resolve) {
        return scene.time.delayedCall(duration, () => resolve(undefined));
    });
}

export function correctRounding(str: string | number) {
    if (!str) return '';
    str = Number(str).toFixed(2);

    if (str.endsWith('.00') || str.endsWith(',00')) {
        return str.substring(0, str.length - 3);
    } else {
        return `${str}`;
    }
}
export class List extends Array {
    constructor(i: number, callback = Function('i', 'return i;')) {
        super();
        return Array.from({ length: i }, (e, i) => callback(i));
    }
}

export function orientation(
    callbacks = {
        landscape: new Function(),
        portrait: new Function(),
    },
    isDesktop = false
) {
    return ((isPortrait) => {
        if (isPortrait === true) {
            callbacks.portrait();
            return 'portrait';
        }

        if (isPortrait === false) {
            callbacks.landscape();
            return 'landscape';
        }

        return 'unknown';
    })(window.matchMedia('(orientation: portrait)')?.matches);
}

export function combineSpineSkins(
    nameSkin: string,
    SkinsName: string[],
    spine: SpineGameObject
): spine.Skin {
    const full_skin = new spine.plugin.plugin.Skin(nameSkin);

    SkinsName.forEach((item) => {
        spine
            .findSkin(item)
            .getAttachments()
            .forEach((attachment) => {
                full_skin.setAttachment(
                    attachment.slotIndex,
                    attachment.name,
                    attachment.attachment
                );
            });
    });

    return full_skin;
}

/**
 * A function to easily create a gradient with settings like in Photoshop
 * @param {Phaser.GameObjects.Text} textElm Phaser text element
 * @param {Array<{ color: string; percent: number }>} options color options such as color and fill percentage
 * @returns {CanvasGradient}
 */
export function makeGradient(
    textElm: Phaser.GameObjects.Text,
    options: Array<{ color: string; percent: number }>
) {
    const height = textElm.height;
    const size = String(textElm.style.fontSize);
    const font = Number(size.replace('px', ''));
    const lines = Math.floor(height / font) || 1;

    if (options.length < 2) return console.error('at least two colors are expected');

    const gradient = textElm.context.createLinearGradient(0, 5, 0, textElm.height);
    new Array(lines).fill('').forEach((item, index) => {
        options.forEach((option) => {
            gradient.addColorStop(
                (1 / lines / 100) * option.percent + (1 / lines) * index,
                option.color
            );
        });
    });

    textElm.setFill(gradient);
    return gradient;
}

/**
 * This function will create graphics with Rectangle shape.
 * You could modify size and values with `graphic.setData(param)`.
 * Make sure you emmit `graphic.getData("update")()` after params been modified.
 *
 * @param {Phaser.Scene} scene
 * @param {Object} settings
 * @param {Number} settings.x
 * @param {Number} settings.y
 * @param {Number} settings.width
 * @param {Number} settings.height
 * @param {Number} settings.originX
 * @param {Number} settings.originY
 * @returns {Phaser.GameObjects.Graphics}
 */
export function graphicR(
    scene: Phaser.Scene,
    settings: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        originX?: number;
        originY?: number;
    }
) {
    const graphic = scene.make.graphics({});

    if (settings.x !== undefined) graphic.setData('x', settings.x);
    if (settings.y !== undefined) graphic.setData('y', settings.y);
    if (settings.width !== undefined) graphic.setData('width', settings.width);
    if (settings.height !== undefined) graphic.setData('height', settings.height);
    if (settings.originX !== undefined) graphic.setData('originX', settings.originX);
    if (settings.originY !== undefined) graphic.setData('originY', settings.originY);

    graphic.setData('update', () => {
        const _x = graphic.getData('x') || 0;
        const _y = graphic.getData('y') || 0;
        const width = graphic.getData('width') || 10;
        const height = graphic.getData('height') || 10;
        const originX = graphic.getData('originX') || 0;
        const originY = graphic.getData('originY') || 0;

        const [w, h] = [width, height];
        const [x, y] = [_x - w * originX, _y - h * originY];

        graphic.clear();
        graphic.fillStyle(0xffffff);
        graphic.beginPath();
        graphic.fillRect(x, y, w, h);
        graphic.closePath();
    });

    graphic.getData('update')();

    return graphic;
}

export const resize = (
    game: Phaser.Game,
    config: {
        maxWidth: number;
        maxHeight: number;
        minWidth: number;
        minHeight: number;
        callback?: Function;
    }
) => {
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    const { maxWidth, maxHeight, minWidth, minHeight, callback } = config;

    const maxRatio = maxWidth / minHeight;
    const currentMaxWidth = innerHeight * maxRatio;
    const currentMinWidth = currentMaxWidth * (minWidth / maxWidth);

    const currentWidth = innerWidth < currentMinWidth ? innerWidth : currentMinWidth;
    const currentHeight =
        currentWidth < currentMinWidth ? currentWidth / (minWidth / minHeight) : innerHeight;

    const zoom = currentHeight / minHeight;

    game.scale.setZoom(zoom);

    const width = maxWidth;
    const height = Math.max(minHeight + (currentMinWidth - currentWidth), maxHeight);

    game.scale.setGameSize(width, height);

    (() => {
        const h = +game.canvas.style.height.replace('px', '');
        const offsetY = innerHeight > h ? 1 : innerHeight / h;

        callback &&
            callback({
                offsetY,
                zoom,
                currentWidth,
                currentMinWidth,
                currentHeight,
                width,
                height,
            });
    })();
};

export function isDiffArray(arr1: any[], arr2: any[]) {
    for (let i = 0; i <= arr1.length; i++) {
        if (arr2.indexOf(arr1[i]) > -1) {
            return true;
        }
    }
    return false;
}

export const isArraysEqual = (a: any[], b: any[]) => {
    return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
    );
};

// Check is some word exist in string.
export const isExist = (string: string, word: string) =>
    string.toLocaleLowerCase().includes(word.toLocaleLowerCase());

export const preciousSymbolsSounds: object = {
    gold_bar_lands: ['11', '20'],
    free_spins_symbol_lands: ['12', '30'],
    jackpot_symbol_lands: ['13', '14', '15', '1000'],
};
