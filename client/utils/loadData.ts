class DataSet {
  private document: Document | null;

  constructor(document: Document) {
    this.document = document;
  }

  private hexToRgb(
    hex: string | null
  ): { r: number; g: number; b: number } | null {
    if (!hex) return null;
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return `#${[r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('')}`;
  }

  private normalizeColor(color: string): string {
    // Mapa más completo de nombres de colores a hexadecimal
    const colorNames: Record<string, string> = {
      'aliceblue': '#f0f8ff', 'antiquewhite': '#faebd7', 'aqua': '#00ffff',
      'aquamarine': '#7fffd4', 'azure': '#f0ffff', 'beige': '#f5f5dc',
      'bisque': '#ffe4c4', 'black': '#000000', 'blanchedalmond': '#ffebcd',
      'blue': '#0000ff', 'blueviolet': '#8a2be2', 'brown': '#a52a2a',
      'burlywood': '#deb887', 'cadetblue': '#5f9ea0', 'chartreuse': '#7fff00',
      'chocolate': '#d2691e', 'coral': '#ff7f50', 'cornflowerblue': '#6495ed',
      'cornsilk': '#fff8dc', 'crimson': '#dc143c', 'cyan': '#00ffff',
      'darkblue': '#00008b', 'darkcyan': '#008b8b', 'darkgoldenrod': '#b8860b',
      'darkgray': '#a9a9a9', 'darkgreen': '#006400', 'darkgrey': '#a9a9a9',
      'darkkhaki': '#bdb76b', 'darkmagenta': '#8b008b', 'darkolivegreen': '#556b2f',
      'darkorange': '#ff8c00', 'darkorchid': '#9932cc', 'darkred': '#8b0000',
      'darksalmon': '#e9967a', 'darkseagreen': '#8fbc8f', 'darkslateblue': '#483d8b',
      'darkslategray': '#2f4f4f', 'darkslategrey': '#2f4f4f', 'darkturquoise': '#00ced1',
      'darkviolet': '#9400d3', 'deeppink': '#ff1493', 'deepskyblue': '#00bfff',
      'dimgray': '#696969', 'dimgrey': '#696969', 'dodgerblue': '#1e90ff',
      'firebrick': '#b22222', 'floralwhite': '#fffaf0', 'forestgreen': '#228b22',
      'fuchsia': '#ff00ff', 'gainsboro': '#dcdcdc', 'ghostwhite': '#f8f8ff',
      'gold': '#ffd700', 'goldenrod': '#daa520', 'gray': '#808080',
      'green': '#008000', 'greenyellow': '#adff2f', 'grey': '#808080',
      'honeydew': '#f0fff0', 'hotpink': '#ff69b4', 'indianred': '#cd5c5c',
      'indigo': '#4b0082', 'ivory': '#fffff0', 'khaki': '#f0e68c',
      'lavender': '#e6e6fa', 'lavenderblush': '#fff0f5', 'lawngreen': '#7cfc00',
      'lemonchiffon': '#fffacd', 'lightblue': '#add8e6', 'lightcoral': '#f08080',
      'lightcyan': '#e0ffff', 'lightgoldenrodyellow': '#fafad2', 'lightgray': '#d3d3d3',
      'lightgreen': '#90ee90', 'lightgrey': '#d3d3d3', 'lightpink': '#ffb6c1',
      'lightsalmon': '#ffa07a', 'lightseagreen': '#20b2aa', 'lightskyblue': '#87cefa',
      'lightslategray': '#778899', 'lightslategrey': '#778899', 'lightsteelblue': '#b0c4de',
      'lightyellow': '#ffffe0', 'lime': '#00ff00', 'limegreen': '#32cd32',
      'linen': '#faf0e6', 'magenta': '#ff00ff', 'maroon': '#800000',
      'mediumaquamarine': '#66cdaa', 'mediumblue': '#0000cd', 'mediumorchid': '#ba55d3',
      'mediumpurple': '#9370db', 'mediumseagreen': '#3cb371', 'mediumslateblue': '#7b68ee',
      'mediumspringgreen': '#00fa9a', 'mediumturquoise': '#48d1cc', 'mediumvioletred': '#c71585',
      'midnightblue': '#191970', 'mintcream': '#f5fffa', 'mistyrose': '#ffe4e1',
      'moccasin': '#ffe4b5', 'navajowhite': '#ffdead', 'navy': '#000080',
      'oldlace': '#fdf5e6', 'olive': '#808000', 'olivedrab': '#6b8e23',
      'orange': '#ffa500', 'orangered': '#ff4500', 'orchid': '#da70d6',
      'palegoldenrod': '#eee8aa', 'palegreen': '#98fb98', 'paleturquoise': '#afeeee',
      'palevioletred': '#db7093', 'papayawhip': '#ffefd5', 'peachpuff': '#ffdab9',
      'peru': '#cd853f', 'pink': '#ffc0cb', 'plum': '#dda0dd',
      'powderblue': '#b0e0e6', 'purple': '#800080', 'rebeccapurple': '#663399',
      'red': '#ff0000', 'rosybrown': '#bc8f8f', 'royalblue': '#4169e1',
      'saddlebrown': '#8b4513', 'salmon': '#fa8072', 'sandybrown': '#f4a460',
      'seagreen': '#2e8b57', 'seashell': '#fff5ee', 'sienna': '#a0522d',
      'silver': '#c0c0c0', 'skyblue': '#87ceeb', 'slateblue': '#6a5acd',
      'slategray': '#708090', 'slategrey': '#708090', 'snow': '#fffafa',
      'springgreen': '#00ff7f', 'steelblue': '#4682b4', 'tan': '#d2b48c',
      'teal': '#008080', 'thistle': '#d8bfd8', 'tomato': '#ff6347',
      'turquoise': '#40e0d0', 'violet': '#ee82ee', 'wheat': '#f5deb3',
      'white': '#ffffff', 'whitesmoke': '#f5f5f5', 'yellow': '#ffff00',
      'yellowgreen': '#9acd32'
    };
    
    return colorNames[color.toLowerCase()] || color;
  }

  public changeColor(oldColor: string, newColor: string): void {
    if (!this.document) return;

    // Normaliza los colores
    const normalizedOldColor = this.normalizeColor(oldColor);
    const normalizedNewColor = this.normalizeColor(newColor);

    // Convierte el color antiguo a RGB para comparación
    const oldColorRgb = this.hexToRgb(normalizedOldColor);
    if (!oldColorRgb) return;

    // Busca en todos los elementos del documento
    this.searchAndReplaceColorInElements(oldColorRgb, normalizedNewColor);
    
    // Busca en estilos globales (hojas de estilo)
    this.searchAndReplaceColorInStyles(oldColorRgb, normalizedNewColor);
  }

  private searchAndReplaceColorInElements(oldColorRgb: { r: number; g: number; b: number }, newColor: string): void {
    if (!this.document) return;

    const allElements = this.document.querySelectorAll('*');
    const colorProperties = this.getAllColorProperties();

    allElements.forEach(element => {
      const styles = getComputedStyle(element);

      colorProperties.forEach(property => {
        const propertyValue = styles.getPropertyValue(property);
        if (!propertyValue) return;

        const elementRgb = this.extractRgbFromValue(propertyValue);
        if (elementRgb && this.colorsMatch(elementRgb, oldColorRgb)) {
          (element as HTMLElement).style.setProperty(property, newColor);
        }
      });

      // Maneja atributos de estilo inline
      if (element.hasAttribute('style')) {
        const inlineStyle = element.getAttribute('style') || '';
        const newInlineStyle = this.replaceColorInStyleString(inlineStyle, oldColorRgb, newColor);
        if (newInlineStyle !== inlineStyle) {
          element.setAttribute('style', newInlineStyle);
        }
      }
    });
  }

  private searchAndReplaceColorInStyles(oldColorRgb: { r: number; g: number; b: number }, newColor: string): void {
    if (!this.document) return;

    // Procesa todas las hojas de estilo
    Array.from(this.document.styleSheets).forEach(styleSheet => {
      try {
        // Solo funciona con hojas de estilo que no son de origen cruzado
        if (styleSheet.cssRules) {
          Array.from(styleSheet.cssRules).forEach(rule => {
            if (rule instanceof CSSStyleRule) {
              const newStyle = this.replaceColorInStyleString(rule.style.cssText, oldColorRgb, newColor);
              if (newStyle !== rule.style.cssText) {
                rule.style.cssText = newStyle;
              }
            }
          });
        }
      } catch (e) {
        console.warn('No se pudo acceder a la hoja de estilo:', e);
      }
    });
  }

  private replaceColorInStyleString(styleString: string, oldColorRgb: { r: number; g: number; b: number }, newColor: string): string {
    // Esta expresión regular busca todos los valores de color en la cadena de estilo
    return styleString.replace(/(#[a-f0-9]{3,6}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)|\b[a-z]+\b)(?=\s*;|\s*$)/gi, match => {
      const rgb = this.extractRgbFromValue(match);
      if (rgb && this.colorsMatch(rgb, oldColorRgb)) {
        return newColor;
      }
      return match;
    });
  }

  private getAllColorProperties(): string[] {
    return [
      'color',
      'background-color',
      'border-color',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'outline-color',
      'text-decoration-color',
      'column-rule-color',
      'caret-color',
      'fill',
      'stroke',
      'stop-color',
      'flood-color',
      'lighting-color'
    ];
  }

  private extractRgbFromValue(value: string): { r: number; g: number; b: number } | null {
    // Elimina espacios en blanco
    value = value.trim();
    
    // Extrae RGB de formatos como rgb(255, 255, 255) o rgba(255, 255, 255, 0.5)
    const rgbRegex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i;
    const match = value.match(rgbRegex);
    if (match) {
      return {
        r: parseInt(match[1], 10),
        g: parseInt(match[2], 10),
        b: parseInt(match[3], 10)
      };
    }
    
    // Si es un valor hexadecimal, usa hexToRgb
    if (value.startsWith('#')) {
      return this.hexToRgb(value);
    }

    // Si es un nombre de color, normalízalo y conviértelo
    const normalized = this.normalizeColor(value);
    if (normalized !== value) {
      return this.hexToRgb(normalized);
    }

    return null;
  }

  private colorsMatch(
    color1: { r: number; g: number; b: number },
    color2: { r: number; g: number; b: number }
  ): boolean {
    return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b;
  }

  public changeFont(oldFont: string, newFont: string): void {
    if (!this.document) return;

    // Buscar en todos los elementos del documento
    const allElements = this.document.querySelectorAll('*');
    allElements.forEach(element => {
      const styles = getComputedStyle(element);
      const fontFamily = styles.getPropertyValue('font-family');
      
      if (fontFamily.includes(oldFont)) {
        (element as HTMLElement).style.setProperty('font-family', newFont);
      }
    });

    // Buscar en estilos globales
    Array.from(this.document.styleSheets).forEach(styleSheet => {
      try {
        if (styleSheet.cssRules) {
          Array.from(styleSheet.cssRules).forEach(rule => {
            if (rule instanceof CSSStyleRule) {
              const newStyle = rule.style.cssText.replace(
                new RegExp(oldFont, 'g'),
                newFont
              );
              if (newStyle !== rule.style.cssText) {
                rule.style.cssText = newStyle;
              }
            }
          });
        }
      } catch (e) {
        console.warn('No se pudo acceder a la hoja de estilo:', e);
      }
    });
  }

  public changeFontSize(element: HTMLElement, newSize: string): void {
    if (!this.document) return;

    const elements = this.document.querySelectorAll(element.tagName);
    elements.forEach(el => {
      (el as HTMLElement).style.setProperty('font-size', newSize);
    });
  }

  public applyFontSettings(fontSettings: {
    fontFamily: string;
    titleSize: number;
    subtitleSize: number;
    paragraphSize: number;
  }): void {
    if (!this.document) return;

    // Aplicar tamaños de fuente
    const titles = this.document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    titles.forEach(title => {
      (title as HTMLElement).style.setProperty('font-size', `${fontSettings.titleSize}rem`);
    });

    const subtitles = this.document.querySelectorAll('.subtitle');
    subtitles.forEach(subtitle => {
      (subtitle as HTMLElement).style.setProperty('font-size', `${fontSettings.subtitleSize}rem`);
    });

    const paragraphs = this.document.querySelectorAll('p');
    paragraphs.forEach(paragraph => {
      (paragraph as HTMLElement).style.setProperty('font-size', `${fontSettings.paragraphSize}rem`);
    });

    // Aplicar familia de fuente
    const allElements = this.document.querySelectorAll('*');
    allElements.forEach(element => {
      (element as HTMLElement).style.setProperty('font-family', fontSettings.fontFamily);
    });

    // Aplicar variables CSS globales
    const root = this.document.documentElement;
    root.style.setProperty('--font-family', fontSettings.fontFamily);
    root.style.setProperty('--title-size', `${fontSettings.titleSize}rem`);
    root.style.setProperty('--subtitle-size', `${fontSettings.subtitleSize}rem`);
    root.style.setProperty('--paragraph-size', `${fontSettings.paragraphSize}rem`);
  }
}

export default DataSet;