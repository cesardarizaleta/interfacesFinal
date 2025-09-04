<template>
  <navbar-element></navbar-element>
  <home-view></home-view>
  <footer-element></footer-element>
  <palette-loader></palette-loader>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import NavbarElement from "@/components/navigation/NavbarElement.vue";
import FooterElement from "@/components/navigation/FooterElement.vue";
import HomeView from "@/components/HomeView.vue";
import PaletteLoader from "@/components/ui/PaletteLoader.vue";
import "@/style/style.css";
import DataSet from "@/utils/loadData";
import { usePalette } from '~/composables/usePalette';
import { useFonts } from '~/composables/useFonts';

definePageMeta({
  middleware: ['auth']
});

const { setActivePalette, activePalette, defaultPalette, applyColorsToPage } = usePalette();
const { loadAssignedFonts, applyFontsToPage } = useFonts();

// Referencia para el listener de autenticación
const authListenerRef = ref(null);

// Configuración de colores por defecto
const defaultColors = {
  colorPrimary: '#292524',
  backgroundNeutral: '#e5e5e5',
  colorAccent: '#000000',
  colorSecondary: '#57534e',
  colorText: '#78716c',
  colorTextLight: '#f5f5f4'
};

// Configuración de fuentes por defecto
const defaultFonts = {
  fontFamily: 'Poppins',
  titleSize: 8,
  subtitleSize: 6,
  paragraphSize: 10,
  fontTitleFilePath: null,
  fontSubtitleFilePath: null
};

// Función para aplicar variables CSS de colores
const applyColors = (colors) => {
  const root = document.documentElement;
  const colorMapping = {
    colorPrimary: '--color-primary',
    backgroundNeutral: '--background-neutral',
    colorAccent: '--color-accent',
    colorSecondary: '--color-secondary',
    colorText: '--color-text',
    colorTextLight: '--color-text-light',
    // Mapeos adicionales para compatibilidad
    bgPrimary: '--bg-primary',
    bgSecondary: '--bg-secondary',
    bgAccent: '--bg-accent',
    bgNeutral: '--bg-neutral',
    borderPrimary: '--border-primary',
    borderSecondary: '--border-secondary',
    borderAccent: '--border-accent'
  };

  // Aplicar colores principales
  Object.entries(colors).forEach(([key, value]) => {
    const cssVar = colorMapping[key];
    if (cssVar && value) {
      root.style.setProperty(cssVar, value);
    }
  });

  // Aplicar colores derivados
  if (colors.colorPrimary) {
    root.style.setProperty('--bg-primary', colors.colorPrimary);
    root.style.setProperty('--border-primary', colors.colorPrimary);
  }
  if (colors.colorSecondary) {
    root.style.setProperty('--bg-secondary', colors.colorSecondary);
    root.style.setProperty('--border-secondary', colors.colorSecondary);
  }
  if (colors.colorAccent) {
    root.style.setProperty('--bg-accent', colors.colorAccent);
    root.style.setProperty('--border-accent', colors.colorAccent);
  }
  if (colors.backgroundNeutral) {
    root.style.setProperty('--bg-neutral', colors.backgroundNeutral);
  }

  // Forzar actualización de elementos dinámicos
  setTimeout(() => {
    const event = new CustomEvent('colorsUpdated', { detail: colors });
    document.dispatchEvent(event);
  }, 100);
};

// Función para aplicar variables CSS de fuentes
const applyFonts = (fonts) => {
  const root = document.documentElement;
  root.style.setProperty('--font-family', fonts.fontFamily);
  // Convertir píxeles a rem (1rem = 16px por defecto)
  root.style.setProperty('--title-size', `${fonts.titleSize / 16}rem`);
  root.style.setProperty('--subtitle-size', `${fonts.subtitleSize / 16}rem`);
  root.style.setProperty('--paragraph-size', `${fonts.paragraphSize / 16}rem`);
};

// Función para cargar fuentes personalizadas
const loadCustomFonts = async (fonts) => {
  try {
    if (fonts.fontTitleFilePath) {
      const fontUrl = `${useRuntimeConfig().public.BACKEND_URL}/${fonts.fontTitleFilePath}`;
      console.warn('Loading font from:', fontUrl);
      
      const fontTitle = new FontFace(fonts.fontFamily, `url(${fontUrl})`, {
        weight: '900', // Black weight
        style: 'normal'
      });

      try {
        const loadedFont = await fontTitle.load();
        document.fonts.add(loadedFont);
        console.warn('Font loaded successfully:', fonts.fontFamily);
      } catch (fontError) {
        console.error('Error loading font file:', fontError);
        // Si falla la carga de la fuente personalizada, usar una fuente del sistema
        fonts.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      }
    }
    
    if (fonts.fontSubtitleFilePath) {
      const fontUrl = `${useRuntimeConfig().public.BACKEND_URL}/${fonts.fontSubtitleFilePath}`;
      console.warn('Loading subtitle font from:', fontUrl);
      
      const fontSubtitle = new FontFace(`${fonts.fontFamily}-subtitle`, `url(${fontUrl})`, {
        weight: '400', // Regular weight
        style: 'normal'
      });

      try {
        const loadedFont = await fontSubtitle.load();
        document.fonts.add(loadedFont);
        console.warn('Subtitle font loaded successfully:', `${fonts.fontFamily}-subtitle`);
      } catch (fontError) {
        console.error('Error loading subtitle font file:', fontError);
        // Si falla la carga de la fuente personalizada, usar la fuente principal
        fonts.fontSubtitleFilePath = null;
      }
    }
  } catch (error) {
    console.error("Error in font loading process:", error);
    // En caso de error general, usar fuentes del sistema
    fonts.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    fonts.fontTitleFilePath = null;
    fonts.fontSubtitleFilePath = null;
  }
};

// Función para obtener colores del backend
const fetchColors = async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token") || "";

  if (!user?.id || !token) {
    console.warn("Usuario no autenticado, usando colores por defecto");
    applyColors(defaultColors);
    return;
  }

  try {
    const response = await fetch(
      `${useRuntimeConfig().public.BACKEND_URL}/api/profile/lastColorUsed`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const backendColors = {
      colorPrimary: data?.colorPrimary || defaultColors.colorPrimary,
      backgroundNeutral: data?.backgroundNeutral || defaultColors.backgroundNeutral,
      colorAccent: data?.colorAccent || defaultColors.colorAccent,
      colorSecondary: data?.colorSecondary || defaultColors.colorSecondary,
      colorText: data?.colorText || defaultColors.colorText,
      colorTextLight: data?.colorTextLight || defaultColors.colorTextLight
    };

    // Aplicar la paleta activa usando el composable
    setActivePalette(backendColors);

    // Aplicar los colores usando DataSet
    const dataSet = new DataSet(document);
    Object.entries(backendColors).forEach(([key, value]) => {
      const oldColor = defaultColors[key];
      if (oldColor && value && oldColor !== value) {
        dataSet.changeColor(oldColor, value);
      }
    });

    applyColorsToPage(backendColors);
    localStorage.setItem('themeColors', JSON.stringify(backendColors));

  } catch (error) {
    console.error("Error fetching colors:", error);
    // Intentar usar colores guardados en localStorage como fallback
    const savedColors = JSON.parse(localStorage.getItem('themeColors')) || defaultColors;
    applyColorsToPage(savedColors);
  }
};

// Función para obtener fuentes del backend
const fetchFonts = async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token") || "";

  if (!user?.id || !token) {
    console.warn("Usuario no autenticado, usando fuentes por defecto");
    applyFontsToPage();
    return;
  }

  try {
    const response = await fetch(
      `${useRuntimeConfig().public.BACKEND_URL}/api/profile/lastFontUsed`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.warn('Received font data:', data);

    const backendFonts = {
      fontFamily: data?.fontFamily || defaultFonts.fontFamily,
      titleSize: parseInt(data?.titleSize) || defaultFonts.titleSize,
      subtitleSize: parseInt(data?.subtitleSize) || defaultFonts.subtitleSize,
      paragraphSize: parseInt(data?.paragraphSize) || defaultFonts.paragraphSize,
      fontTitleFilePath: data?.fontTitleFilePath,
      fontSubtitleFilePath: data?.fontSubtitleFilePath
    };

    // Cargar fuentes personalizadas
    await loadCustomFonts(backendFonts);

    // Aplicar configuración de fuentes usando DataSet
    const dataSet = new DataSet(document);
    dataSet.applyFontSettings({
      ...backendFonts,
      titleSize: backendFonts.titleSize / 16,
      subtitleSize: backendFonts.subtitleSize / 16,
      paragraphSize: backendFonts.paragraphSize / 16
    });

    applyFontsToPage();
    localStorage.setItem('themeFonts', JSON.stringify(backendFonts));

  } catch (error) {
    console.error("Error fetching fonts:", error);
    // Intentar usar fuentes guardadas en localStorage como fallback
    const savedFonts = JSON.parse(localStorage.getItem('themeFonts')) || defaultFonts;
    applyFontsToPage();
  }
};

// Ejecutar al montar el componente
onMounted(async () => {
  // Cargar colores y fuentes de forma independiente
  await fetchColors();
  await fetchFonts();

  // Cargar fuentes asignadas dinámicamente
  await loadAssignedFonts();

  // Aplicar colores iniciales desde localStorage si existen
  const savedColors = JSON.parse(localStorage.getItem('themeColors') || 'null');
  if (savedColors) {
    applyColorsToPage(savedColors);
  }

  // Aplicar fuentes asignadas después de cargarlas
  applyFontsToPage();

  // Escuchar cambios de autenticación
  const authListener = () => {
    if (!localStorage.getItem("token")) {
      applyColorsToPage(defaultColors);
      applyFontsToPage();
    } else {
      fetchColors();
      fetchFonts();
      loadAssignedFonts();
    }
  };

  window.addEventListener('storage', authListener);

  // Guardar referencia para limpiar después
  authListenerRef.value = authListener;
});

// Limpiar listeners al desmontar
onUnmounted(() => {
  if (authListenerRef.value) {
    window.removeEventListener('storage', authListenerRef.value);
  }
});
</script>

<style>
:root {
  /* Variables CSS con valores por defecto */
  --color-primary: #292524;
  --background-neutral: #e5e5e5;
  --color-accent: #000000;
  --color-secondary: #57534e;
  --color-text: #78716c;
  --color-text-light: #f5f5f4;
}

html {
  scroll-behavior: smooth;
  background-color: var(--background-neutral);
}

* {
  letter-spacing: 0.025em;
  color: var(--color-text);
}

h1, h2, h3, h4, h5, h6 {
  color: var(--color-primary);
}

.btn {
  background-color: var(--color-primary);
  color: var(--color-text-light);
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  border-radius: 0.5rem;
  padding: 0.5rem 2rem;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: var(--color-accent);
}

.socialIcon {
  font-size: 1.25rem;
  color: var(--color-secondary);
  transition: color 0.3s ease;
}

.socialIcon:hover {
  color: var(--color-accent);
}

/* Estilos para componentes específicos */
.navbar {
  background-color: var(--color-primary);
  color: var(--color-text-light);
}

.footer {
  background-color: var(--color-primary);
  color: var(--color-text-light);
}

/* Estilos para inputs y textareas */
input, textarea {
  background-color: var(--color-secondary);
  color: var(--color-text-light);
  border-color: var(--color-accent);
}

input:focus, textarea:focus {
  border-color: var(--color-primary);
  outline-color: var(--color-primary);
}

/* Estilos para enlaces */
a {
  color: var(--color-accent);
  transition: color 0.3s ease;
}

a:hover {
  color: var(--color-primary);
}

/* Estilos para círculos decorativos */
.decorative-circle {
  background-color: var(--color-secondary);
  opacity: 0.5;
}

/* Estilos para secciones */
section {
  background-color: var(--background-neutral);
}

/* Estilos para tarjetas y contenedores */
.card, .container {
  background-color: var(--color-secondary);
  color: var(--color-text-light);
}

/* Estilos para textos secundarios */
.text-secondary {
  color: var(--color-text);
}

/* Estilos para textos claros */
.text-light {
  color: var(--color-text-light);
}

/* Estilos para bordes */
.border {
  border-color: var(--color-accent);
}

/* Estilos para sombras */
.shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>