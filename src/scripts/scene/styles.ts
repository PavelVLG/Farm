export const text_style = {
    basket: {
        fontFamily: 'fantasy',
        fontSize: '32px',
        color: 'rgb(255,255,255)',
    },
    button: {
        fontFamily: 'fantasy',
        fontSize: '40px',
        color: 'rgb(255,255,255)',
    },
    loading_title: {
        text: 'loading',
        style: {
            fontFamily: 'Fantasy',
            fontSize: '64px',
        },
    },
} as const;

export const coordinates = {
    loading_title: {
        x: 0,
        y: -50,
    },

    loading_texture: {
        x: 0,
        y: 50,
        width: 400,
        height: 20,
    },
} as const;

export const btn_frames = {
    basket: {
        static: 'btn_static',
        hover: 'btn_hover',
        click: 'btn_click',
    },
} as const;

export const COLORS = {
    PURPLE: 0xff00ff,
    BLUE: 0xfff,
    SALAD: 0xff00,
    BLACK: 0x000,
    ELlOW: 0xffff00,
    LITE_BLUE: 0xffff,
    WHITE: 0xffffff,
};

export const TINTS = {
    1: [0xff00ff, 0xffff00, 0x0000ff, 0xff0000],
    2: [0xff00ff, 0xff00ff, 0x0000ff, 0x0000ff],
};
