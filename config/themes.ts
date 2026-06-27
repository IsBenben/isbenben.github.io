// Data for ~/assets/_theme.scss
export type Themes = Record<string, Record<string, string>>;

const themes: Themes = {
  dark: {
    background: 'hsl(201, 20%, 10%)',
    color: 'hsl(0, 0%, 100%)',
    scrollbarTrack: 'hsl(201, 20%, 10%)',
    scrollbarThumb: 'hsl(201, 20%, 25%)',
    scrollbarThumbHover: 'hsl(201, 20%, 30%)',
    boxShadow: 'hsla(201, 20%, 100%, 0.4)',
    borderColor: 'hsla(201, 20%, 100%, 0.6)',
    asideBackground: 'hsla(201, 20%, 100%, 0.1)',
    codeBackground: 'hsla(201, 20%, 100%, 0.1)',
    codeActiveBackground: 'hsla(201, 20%, 100%, 0.2)',
    preScrollbarTrack: 'hsl(201, 20%, 18%)',
    preScrollbarThumb: 'hsl(201, 20%, 24%)',
    preScrollbarThumbHover: 'hsl(201, 20%, 30%)',
    cardBackground: 'hsla(201, 20%, 100%, 0.1)',
    cardGlow: 'hsla(201, 20%, 100%, 0.4)',
    cardHoverGlow: 'hsla(201, 20%, 100%, 0.3)',
    cardInnerBackground: 'hsla(201, 20%, 15%, 0.9)',
    backgroundCanvasColor: 'hsl(110, 50%, 60%)',
  },
  light: {
    background: 'hsl(201, 10%, 90%)',
    color: 'hsl(0, 0%, 0%)',
    scrollbarTrack: 'hsl(201, 10%, 90%)',
    scrollbarThumb: 'hsl(201, 10%, 75%)',
    scrollbarThumbHover: 'hsl(201, 10%, 70%)',
    boxShadow: 'hsla(201, 20%, 0%, 0.4)',
    borderColor: 'hsla(201, 10%, 0%, 0.6)',
    asideBackground: 'hsla(201, 10%, 40%, 0.1)',
    codeBackground: 'hsla(201, 10%, 40%, 0.1)',
    codeActiveBackground: 'hsla(201, 10%, 40%, 0.2)',
    preScrollbarTrack: 'hsl(201, 10%, 82%)',
    preScrollbarThumb: 'hsl(201, 10%, 76%)',
    preScrollbarThumbHover: 'hsl(201, 10%, 70%)',
    cardBackground: 'hsla(201, 10%, 0%, 0.1)',
    cardGlow: 'hsla(201, 10%, 0%, 0.4)',
    cardHoverGlow: 'hsla(201, 10%, 0%, 0.3)',
    cardInnerBackground: 'hsla(201, 10%, 85%, 0.9)',
    backgroundCanvasColor: 'hsl(110, 50%, 30%)',
  },
};

for (const key of Object.keys(themes)) {
  const theme = themes[key];
  if (theme) {
    theme.name = key;
  }
}

export { themes };

export const defaultTheme: keyof Themes = 'dark';
