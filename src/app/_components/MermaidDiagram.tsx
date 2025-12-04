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
    // Initialize mermaid with dark theme
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    });

    // Render the diagram
    if (containerRef.current) {
      const uniqueId = id ?? `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      void mermaid.render(uniqueId, chart).then(({ svg }) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
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
