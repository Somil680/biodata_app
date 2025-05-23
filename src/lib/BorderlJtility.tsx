import React from 'react';

interface BorderOptions {
  // Basic border properties
  style?: 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
  width?: number; // in pixels
  color?: string; // any valid CSS color
  radius?: number; // border radius in pixels
  
  // Corner decorations
  corners?: {
    visible: boolean;
    size?: number; // size of corner decorations in cm
    style?: 'squared' | 'diagonal' | 'curved' | 'ornate';
    color?: string; // can be different from main border
    width?: number; // can be different from main border
  };
  
  // Inner border (creates a double-border effect)
  innerBorder?: {
    enabled: boolean;
    gap?: number; // gap between outer and inner border in pixels
    style?: 'solid' | 'dashed' | 'dotted' | 'double';
    width?: number;
    color?: string;
  };
  
  // Decorative elements
  decorations?: {
    type: 'floral' | 'geometric' | 'classic' | 'minimalist' | 'none';
    position?: 'corners' | 'edges' | 'full';
    color?: string;
    size?: number;
    density?: 'sparse' | 'medium' | 'dense';
  };
  
  // Border padding (space between border and content)
  padding?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

// Default border options
const defaultBorderOptions: BorderOptions = {
  style: 'solid',
  width: 1,
  color: '#D4AF37', // Gold color
  radius: 0,
  corners: {
    visible: true,
    size: 4,
    style: 'squared',
    color: '#D4AF37',
    width: 2
  },
  innerBorder: {
    enabled: false,
    gap: 10,
    style: 'solid',
    width: 1,
    color: '#D4AF37'
  },
  decorations: {
    type: 'none',
    position: 'corners',
    color: '#D4AF37',
    size: 30,
    density: 'medium'
  },
  padding: {
    top: 2.5,
    right: 1.5,
    bottom: 2.5,
    left: 1.5
  }
};

/**
 * Creates customizable border styles for A4 size paper
 * @param options - Border customization options
 * @returns JSX Elements and style object for the border
 */
const createCustomBorder = (options: BorderOptions = {}) => {
  // Merge options with defaults
  const mergedOptions = {
    ...defaultBorderOptions,
    ...options,
    corners: { ...defaultBorderOptions.corners, ...options.corners },
    innerBorder: { ...defaultBorderOptions.innerBorder, ...options.innerBorder },
    decorations: { ...defaultBorderOptions.decorations, ...options.decorations },
    padding: { ...defaultBorderOptions.padding, ...options.padding }
  };
  
  // Generate corner elements JSX based on style
  const generateCornerElements = () => {
    if (!mergedOptions.corners?.visible) return null;
    
    const cornerSize = `${mergedOptions.corners.size}cm`;
    const cornerColor = mergedOptions.corners.color || mergedOptions.color;
    const cornerWidth = `${mergedOptions.corners.width}px`;
    const cornerStyle = mergedOptions.corners.style || 'squared';
    
    // Generate different corner styles
    switch (cornerStyle) {
      case 'diagonal':
        return (
          <>
            <div className="corner top-left" />
            <div className="corner top-right" />
            <div className="corner bottom-left" />
            <div className="corner bottom-right" />
            <style jsx>{`
              .corner {
                position: absolute;
                width: ${cornerSize};
                height: ${cornerSize};
              }
              .top-left {
                top: ${mergedOptions.padding?.top || 2}cm;
                left: ${mergedOptions.padding?.left || 2}cm;
                border-top: ${cornerWidth} solid ${cornerColor};
                border-left: ${cornerWidth} solid ${cornerColor};
              }
              .top-right {
                top: ${mergedOptions.padding?.top || 2}cm;
                right: ${mergedOptions.padding?.right || 2}cm;
                border-top: ${cornerWidth} solid ${cornerColor};
                border-right: ${cornerWidth} solid ${cornerColor};
              }
              .bottom-left {
                bottom: ${mergedOptions.padding?.bottom || 2}cm;
                left: ${mergedOptions.padding?.left || 2}cm;
                border-bottom: ${cornerWidth} solid ${cornerColor};
                border-left: ${cornerWidth} solid ${cornerColor};
              }
              .bottom-right {
                bottom: ${mergedOptions.padding?.bottom || 2}cm;
                right: ${mergedOptions.padding?.right || 2}cm;
                border-bottom: ${cornerWidth} solid ${cornerColor};
                border-right: ${cornerWidth} solid ${cornerColor};
              }
            `}</style>
          </>
        );
      
      case 'curved':
        return (
          <>
            <div className="corner top-left" />
            <div className="corner top-right" />
            <div className="corner bottom-left" />
            <div className="corner bottom-right" />
            <style jsx>{`
              .corner {
                position: absolute;
                width: ${cornerSize};
                height: ${cornerSize};
                border: ${cornerWidth} solid ${cornerColor};
              }
              .top-left {
                top: ${mergedOptions.padding?.top || 2}cm;
                left: ${mergedOptions.padding?.left || 2}cm;
                border-right: none;
                border-bottom: none;
                border-top-left-radius: ${cornerSize};
              }
              .top-right {
                top: ${mergedOptions.padding?.top || 2}cm;
                right: ${mergedOptions.padding?.right || 2}cm;
                border-left: none;
                border-bottom: none;
                border-top-right-radius: ${cornerSize};
              }
              .bottom-left {
                bottom: ${mergedOptions.padding?.bottom || 2}cm;
                left: ${mergedOptions.padding?.left || 2}cm;
                border-right: none;
                border-top: none;
                border-bottom-left-radius: ${cornerSize};
              }
              .bottom-right {
                bottom: ${mergedOptions.padding?.bottom || 2}cm;
                right: ${mergedOptions.padding?.right || 2}cm;
                border-left: none;
                border-top: none;
                border-bottom-right-radius: ${cornerSize};
              }
            `}</style>
          </>
        );
      
      case 'ornate':
        // Ornate corners use decorative SVG elements
        return (
          <>
            <div className="corner top-left">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,0 L100,0 L100,20 C70,20 50,50 20,100 L0,100 Z" fill="none" stroke={cornerColor} strokeWidth="3"/>
                <path d="M20,0 C20,30 30,50 60,80 C40,70 30,60 0,60" fill="none" stroke={cornerColor} strokeWidth="2"/>
              </svg>
            </div>
            <div className="corner top-right">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,0 L100,0 L100,100 L80,100 C80,70 50,50 0,20 Z" fill="none" stroke={cornerColor} strokeWidth="3"/>
                <path d="M80,0 C80,30 70,50 40,80 C60,70 70,60 100,60" fill="none" stroke={cornerColor} strokeWidth="2"/>
              </svg>
            </div>
            <div className="corner bottom-left">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,0 C0,30 50,50 80,100 L0,100 Z" fill="none" stroke={cornerColor} strokeWidth="3"/>
                <path d="M0,40 C30,40 40,60 60,100" fill="none" stroke={cornerColor} strokeWidth="2"/>
              </svg>
            </div>
            <div className="corner bottom-right">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M100,0 C100,30 50,50 20,100 L100,100 Z" fill="none" stroke={cornerColor} strokeWidth="3"/>
                <path d="M100,40 C70,40 60,60 40,100" fill="none" stroke={cornerColor} strokeWidth="2"/>
              </svg>
            </div>
            <style jsx>{`
              .corner {
                position: absolute;
                width: ${cornerSize};
                height: ${cornerSize};
              }
              .top-left {
                top: ${mergedOptions.padding?.top || 2}cm;
                left: ${mergedOptions.padding?.left || 2}cm;
                transform: rotate(0deg);
              }
              .top-right {
                top: ${mergedOptions.padding?.top || 2}cm;
                right: ${mergedOptions.padding?.right || 2}cm;
                transform: rotate(90deg);
              }
              .bottom-left {
                bottom: ${mergedOptions.padding?.bottom || 2}cm;
                left: ${mergedOptions.padding?.left || 2}cm;
                transform: rotate(270deg);
              }
              .bottom-right {
                bottom: ${mergedOptions.padding?.bottom || 2}cm;
                right: ${mergedOptions.padding?.right || 2}cm;
                transform: rotate(180deg);
              }
            `}</style>
          </>
        );
      
      // Default squared corners
      default:
        return (
          <>
            <div className="corner top-left" />
            <div className="corner top-right" />
            <div className="corner bottom-left" />
            <div className="corner bottom-right" />
            <style jsx>{`
              .corner {
                position: absolute;
                width: ${cornerSize};
                height: ${cornerSize};
              }
              .top-left {
                top: ${mergedOptions.padding?.top || 2}cm;
                left: ${mergedOptions.padding?.left || 2}cm;
                border-top: ${cornerWidth} solid ${cornerColor};
                border-left: ${cornerWidth} solid ${cornerColor};
              }
              .top-right {
                top: ${mergedOptions.padding?.top || 2}cm;
                right: ${mergedOptions.padding?.right || 2}cm;
                border-top: ${cornerWidth} solid ${cornerColor};
                border-right: ${cornerWidth} solid ${cornerColor};
              }
              .bottom-left {
                bottom: ${mergedOptions.padding?.bottom || 2}cm;
                left: ${mergedOptions.padding?.left || 2}cm;
                border-bottom: ${cornerWidth} solid ${cornerColor};
                border-left: ${cornerWidth} solid ${cornerColor};
              }
              .bottom-right {
                bottom: ${mergedOptions.padding?.bottom || 2}cm;
                right: ${mergedOptions.padding?.right || 2}cm;
                border-bottom: ${cornerWidth} solid ${cornerColor};
                border-right: ${cornerWidth} solid ${cornerColor};
              }
            `}</style>
          </>
        );
    }
  };
  
  // Generate decorative elements based on type and position
  const generateDecorations = () => {
    if (mergedOptions.decorations?.type === 'none') return null;
    
    const decorationType = mergedOptions.decorations?.type || 'classic';
    const decorationPosition = mergedOptions.decorations?.position || 'corners';
    const decorationColor = mergedOptions.decorations?.color || mergedOptions.color;
    const decorationSize = mergedOptions.decorations?.size || 30;
    
    // Different decoration patterns based on type
    const getDecorationSVG = () => {
      switch (decorationType) {
        case 'floral':
          return `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M50,0 C60,15 80,10 90,20 C75,30 80,50 70,60 C85,70 90,90 80,100 C70,85 50,90 40,80 C30,95 10,90 0,80 C15,70 10,50 20,40 C5,30 0,10 10,0 C20,15 40,10 50,0" fill="none" stroke="${decorationColor}" stroke-width="2"/>
              <circle cx="50" cy="50" r="10" fill="none" stroke="${decorationColor}" stroke-width="1.5"/>
            </svg>
          `;
        case 'geometric':
          return `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="80" height="80" fill="none" stroke="${decorationColor}" stroke-width="2"/>
              <rect x="25" y="25" width="50" height="50" fill="none" stroke="${decorationColor}" stroke-width="1.5"/>
              <line x1="10" y1="10" x2="90" y2="90" stroke="${decorationColor}" stroke-width="1"/>
              <line x1="10" y1="90" x2="90" y2="10" stroke="${decorationColor}" stroke-width="1"/>
            </svg>
          `;
        case 'minimalist':
          return `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="50" x2="100" y2="50" stroke="${decorationColor}" stroke-width="2"/>
              <line x1="50" y1="0" x2="50" y2="100" stroke="${decorationColor}" stroke-width="2"/>
              <circle cx="50" cy="50" r="25" fill="none" stroke="${decorationColor}" stroke-width="1.5"/>
            </svg>
          `;
        // Classic decoration by default
        default:
          return `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="${decorationColor}" stroke-width="2"/>
              <path d="M20,20 L80,20 L80,80 L20,80 Z" fill="none" stroke="${decorationColor}" stroke-width="1.5"/>
              <circle cx="50" cy="50" r="15" fill="none" stroke="${decorationColor}" stroke-width="1"/>
            </svg>
          `;
      }
    };
    
    // Position decorations based on the provided option
    const decorationPositions = () => {
      switch (decorationPosition) {
        case 'corners':
          return `
            .decoration.top-left { top: ${mergedOptions.padding?.top || 2}cm; left: ${mergedOptions.padding?.left || 2}cm; }
            .decoration.top-right { top: ${mergedOptions.padding?.top || 2}cm; right: ${mergedOptions.padding?.right || 2}cm; transform: rotate(90deg); }
            .decoration.bottom-left { bottom: ${mergedOptions.padding?.bottom || 2}cm; left: ${mergedOptions.padding?.left || 2}cm; transform: rotate(270deg); }
            .decoration.bottom-right { bottom: ${mergedOptions.padding?.bottom || 2}cm; right: ${mergedOptions.padding?.right || 2}cm; transform: rotate(180deg); }
          `;
        case 'edges':
          return `
            .decoration.top { top: ${mergedOptions.padding?.top || 2}cm; left: 50%; transform: translateX(-50%); }
            .decoration.right { right: ${mergedOptions.padding?.right || 2}cm; top: 50%; transform: translateY(-50%) rotate(90deg); }
            .decoration.bottom { bottom: ${mergedOptions.padding?.bottom || 2}cm; left: 50%; transform: translateX(-50%) rotate(180deg); }
            .decoration.left { left: ${mergedOptions.padding?.left || 2}cm; top: 50%; transform: translateY(-50%) rotate(270deg); }
          `;
        case 'full':
          return `
            .decoration.top-left { top: ${mergedOptions.padding?.top || 2}cm; left: ${mergedOptions.padding?.left || 2}cm; }
            .decoration.top { top: ${mergedOptions.padding?.top || 2}cm; left: 50%; transform: translateX(-50%); }
            .decoration.top-right { top: ${mergedOptions.padding?.top || 2}cm; right: ${mergedOptions.padding?.right || 2}cm; transform: rotate(90deg); }
            .decoration.right { right: ${mergedOptions.padding?.right || 2}cm; top: 50%; transform: translateY(-50%) rotate(90deg); }
            .decoration.bottom-right { bottom: ${mergedOptions.padding?.bottom || 2}cm; right: ${mergedOptions.padding?.right || 2}cm; transform: rotate(180deg); }
            .decoration.bottom { bottom: ${mergedOptions.padding?.bottom || 2}cm; left: 50%; transform: translateX(-50%) rotate(180deg); }
            .decoration.bottom-left { bottom: ${mergedOptions.padding?.bottom || 2}cm; left: ${mergedOptions.padding?.left || 2}cm; transform: rotate(270deg); }
            .decoration.left { left: ${mergedOptions.padding?.left || 2}cm; top: 50%; transform: translateY(-50%) rotate(270deg); }
          `;
        default:
          return '';
      }
    };
    
    const decorationSVG = getDecorationSVG();
    const positionCSS = decorationPositions();
    
    // Create decoration elements based on position
    const createDecorationElements = () => {
      switch (decorationPosition) {
        case 'corners':
          return (
            <>
              <div className="decoration top-left" dangerouslySetInnerHTML={{ __html: decorationSVG }} />
              <div className="decoration top-right" dangerouslySetInnerHTML={{ __html: decorationSVG }} />
              <div className="decoration bottom-left" dangerouslySetInnerHTML={{ __html: decorationSVG }} />
              <div className="decoration bottom-right" dangerouslySetInnerHTML={{ __html: decorationSVG }} />
            </>
          );
        case 'edges':
          return (
            <>
              <div className="decoration top" dangerouslySetInnerHTML={{ __html: decorationSVG }} />
              <div className="decoration right" dangerouslySetInnerHTML={{ __html: decorationSVG }} />
              <div className="decoration bottom" dangerouslySetInnerHTML={{ __html: decorationSVG }} />
              <div className="decoration left" dangerouslySetInnerHTML={{ __html: decorationSVG }} />
            </>
          );
        case 'full':
          return (
            <>
              <div className="decoration top-left" dangerouslySetInnerHTML={{ __html: decorationSVG }} />
              <div className="decoration top" dangerouslySetInnerHTML={{ __html: decorationSVG }} />
              <div className="decoration top-right" dangerouslySetInnerHTML={{ __html: decorationSVG }} />
              <div className="decoration right" dangerouslySetInnerHTML={{ __html: decorationSVG }} />
              <div className="decoration bottom-right" dangerouslySetInnerHTML={{ __html: decorationSVG }} />
              <div className="decoration bottom" dangerouslySetInnerHTML={{ __html: decorationSVG }} />
              <div className="decoration bottom-left" dangerouslySetInnerHTML={{ __html: decorationSVG }} />
              <div className="decoration left" dangerouslySetInnerHTML={{ __html: decorationSVG }} />
            </>
          );
        default:
          return null;
      }
    };
    
    return (
      <>
        {createDecorationElements()}
        <style jsx>{`
          .decoration {
            position: absolute;
            width: ${decorationSize}px;
            height: ${decorationSize}px;
            z-index: 1;
          }
          ${positionCSS}
        `}</style>
      </>
    );
  };
  
  // Generate border styles
  const generateBorderStyles = () => {
    const mainBorderStyle = `
      ${mergedOptions.width}px 
      ${mergedOptions.style} 
      ${mergedOptions.color}
    `;
    
    let borderStyles = `
      border: ${mainBorderStyle};
      border-radius: ${mergedOptions.radius}px;
    `;
    
    // Add inner border if enabled
    if (mergedOptions.innerBorder?.enabled) {
      const innerGap = mergedOptions.innerBorder.gap || 10;
      const innerWidth = mergedOptions.innerBorder.width || 1;
      const innerColor = mergedOptions.innerBorder.color || mergedOptions.color;
      const innerStyle = mergedOptions.innerBorder.style || 'solid';
      
      borderStyles += `
        box-shadow: 0 0 0 ${innerGap}px white, 
                    0 0 0 ${innerGap + innerWidth}px ${innerColor};
      `;
    }
    
    return borderStyles;
  };
  
  // Generate content padding styles
  const generatePaddingStyles = () => {
    const { padding } = mergedOptions;
    return `
      padding: ${padding?.top || 2.5}cm ${padding?.right || 1.5}cm ${padding?.bottom || 2.5}cm ${padding?.left || 1.5}cm;
    `;
  };
  
  // Return JSX elements and styles for the border
  return {
    // Border container JSX with styles
    borderContainer: (
      <div className="border-container">
        <style jsx>{`
          .border-container {
            position: relative;
            width: 100%;
            height: 100%;
            ${generateBorderStyles()}
            ${generatePaddingStyles()}
            box-sizing: border-box;
          }
        `}</style>
        {generateCornerElements()}
        {generateDecorations()}
      </div>
    ),
    
    // Style object for direct use
    styles: {
      border: generateBorderStyles(),
      padding: generatePaddingStyles(),
    },
    
    // CSS string for external use
    cssString: `
      .border-container {
        position: relative;
        width: 100%;
        height: 100%;
        ${generateBorderStyles()}
        ${generatePaddingStyles()}
        box-sizing: border-box;
      }
    `
  };
};

// Example usage:
// The decorative border component that wraps content
interface DecorativeBorderProps {
  children: React.ReactNode;
  options?: BorderOptions;
}

const DecorativeBorder: React.FC<DecorativeBorderProps> = ({ children, options }) => {
  const border = createCustomBorder(options);
  
  return (
    <div className="a4-container">
      <div className="border-container">
        {/* The border elements */}
        {border.borderContainer}
        
        {/* The actual content */}
        <div className="content">
          {children}
        </div>
      </div>
      
      <style jsx>{`
        .a4-container {
          width: 21cm;
          min-height: 29.7cm;
          margin: 0 auto;
          background: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          position: relative;
        }
        
        .border-container {
          width: 100%;
          height: 100%;
          position: relative;
        }
        
        .content {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
        }
        
        @media print {
          .a4-container {
            box-shadow: none;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Example configurations for different border styles
const borderStyles = {
  classic: {
    style: 'solid' as const,
    width: 1,
    color: '#D40000',
    corners: {
      visible: true,
      style: 'squared' as const,
      size: 4,
    },
    decorations: {
      type: 'classic' as const,
      position: 'corners' as const,
    }
  },
  
  elegant: {
    style: 'double' as const,
    width: 1,
    color: '#8B4513',
    corners: {
      visible: true,
      style: 'curved' as const,
      size: 3,
    },
    innerBorder: {
      enabled: true,
      gap: 8,
    },
    decorations: {
      type: 'floral' as const,
      position: 'corners' as const,
    }
  },
  
  modern: {
    style: 'solid' as const,
    width: 2,
    color: '#333333',
    radius: 0,
    corners: {
      visible: true,
      style: 'squared' as const,
      size: 5,
    },
    decorations: {
      type: 'minimalist' as const,
      position: 'edges' as const,
    }
  },
  
  ornate: {
    style: 'solid' as const,
    width: 1,
    color: '#B8860B',
    corners: {
      visible: true,
      style: 'ornate' as const,
      size: 5,
    },
    innerBorder: {
      enabled: true,
      gap: 12,
      width: 1,
    },
    decorations: {
      type: 'floral' as const,
      position: 'full' as const,
      density: 'dense' as const,
    }
  },
  
  // Add more predefined styles as needed
};

export { createCustomBorder, DecorativeBorder, borderStyles, type BorderOptions };