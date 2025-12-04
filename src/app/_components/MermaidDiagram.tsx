'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  id?: string;
}

export default function MermaidDiagram({ chart, id }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize mermaid with custom theme and rounded corners
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      themeVariables: {
        primaryColor: '#7c3aed',
        primaryTextColor: '#e0e7ff',
        primaryBorderColor: '#a78bfa',
        lineColor: '#818cf8',
        secondaryColor: '#2dd4bf',
        tertiaryColor: '#f472b6',
        background: '#1e293b',
        mainBkg: '#334155',
        secondBkg: '#1e3a8a',
        tertiaryBkg: '#831843',
        primaryTextColor: '#f1f5f9',
        secondaryTextColor: '#e0f2fe',
        tertiaryTextColor: '#fce7f3',
        lineColor: '#818cf8',
        textColor: '#f1f5f9',
        fontSize: '16px',
        nodeBorder: '#a78bfa',
        clusterBkg: '#1e293b',
        clusterBorder: '#6366f1',
        edgeLabelBackground: '#334155',
      },
      flowchart: {
        curve: 'basis',
        nodeSpacing: 50,
        rankSpacing: 50,
        padding: 15,
        useMaxWidth: true,
      },
    });

    // Render the diagram
    if (containerRef.current) {
      const uniqueId = id ?? `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      void mermaid.render(uniqueId, chart).then(({ svg }) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;

          // Add rounded corners to all rectangles and other shapes
          const svgElement = containerRef.current.querySelector('svg');
          if (svgElement) {
            const rects = svgElement.querySelectorAll('rect');
            rects.forEach((rect) => {
              rect.setAttribute('rx', '8');
              rect.setAttribute('ry', '8');
            });

            const polygons = svgElement.querySelectorAll('polygon');
            polygons.forEach((polygon) => {
              polygon.style.filter = 'url(#round-corners)';
            });
          }
        }
      });
    }
  }, [chart, id]);

  return (
    <div className="my-6 p-4 bg-base-200 rounded-lg overflow-x-auto">
      <div ref={containerRef} className="flex justify-center" />
    </div>
  );
}
