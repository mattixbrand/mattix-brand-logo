/**
 * React Hook for Performance Monitoring
 * Easy integration with Mattix Brand Logo components
 */

import React, { useEffect, useRef, useState } from 'react';
import { PerformanceMonitor } from '../utils/performanceMonitor';

export interface PerformanceMetrics {
  fps: number;
  memory: {
    used: number;
    total: number;
    limit: number;
  } | null;
  timing: {
    loadTime: number;
    domReady: number;
  } | null;
}

export const usePerformanceMonitor = () => {
  const monitorRef = useRef<PerformanceMonitor | null>(null);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isGPUAccelerated, setIsGPUAccelerated] = useState(false);

  useEffect(() => {
    // Initialize performance monitor
    monitorRef.current = new PerformanceMonitor();
    
    // Check GPU acceleration
    setIsGPUAccelerated(monitorRef.current.checkGPUAcceleration());

    // Update metrics every second
    const interval = setInterval(() => {
      if (monitorRef.current) {
        setMetrics(monitorRef.current.getMetrics());
      }
    }, 1000);

    // Cleanup
    return () => {
      clearInterval(interval);
      if (monitorRef.current) {
        monitorRef.current.destroy();
      }
    };
  }, []);

  const diagnose = () => {
    return monitorRef.current?.diagnose() || [];
  };

  const startProfiling = (duration?: number) => {
    monitorRef.current?.startProfiling(duration);
  };

  const logSummary = () => {
    monitorRef.current?.logSummary();
  };

  const monitorElement = (element: HTMLElement, name: string) => {
    return monitorRef.current?.monitorElement(element, name);
  };

  return {
    metrics,
    isGPUAccelerated,
    diagnose,
    startProfiling,
    logSummary,
    monitorElement
  };
};

/**
 * Performance Debug Component
 * Shows performance metrics in development mode
 */
export const PerformanceDebugger: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  enabled?: boolean;
}> = ({ 
  position = 'top-right', 
  enabled = process.env.NODE_ENV === 'development' 
}) => {
  const { metrics, isGPUAccelerated } = usePerformanceMonitor();

  if (!enabled || !metrics) return null;

  const positionStyles: Record<string, React.CSSProperties> = {
    'top-left': { top: 10, left: 10 },
    'top-right': { top: 10, right: 10 },
    'bottom-left': { bottom: 10, left: 10 },
    'bottom-right': { bottom: 10, right: 10 }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        ...positionStyles[position],
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '12px',
        zIndex: 9999,
        minWidth: '200px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(79, 172, 254, 0.3)'
      }}
    >
      <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4facfe' }}>
        🚀 Performance Monitor
      </div>
      
      <div style={{ marginBottom: '4px' }}>
        FPS: <span style={{ 
          color: metrics.fps >= 60 ? '#00ff00' : metrics.fps >= 30 ? '#ffff00' : '#ff0000' 
        }}>
          {metrics.fps}
        </span>
      </div>
      
      <div style={{ marginBottom: '4px' }}>
        GPU: <span style={{ color: isGPUAccelerated ? '#00ff00' : '#ff0000' }}>
          {isGPUAccelerated ? '✅ Active' : '❌ Inactive'}
        </span>
      </div>
      
      {metrics.memory && (
        <div style={{ marginBottom: '4px' }}>
          Memory: <span style={{ 
            color: metrics.memory.used / metrics.memory.total < 0.7 ? '#00ff00' : '#ffff00' 
          }}>
            {metrics.memory.used}MB
          </span>
        </div>
      )}
      
      {metrics.timing && (
        <div style={{ fontSize: '10px', color: '#aaa' }}>
          Load: {metrics.timing.loadTime}ms
        </div>
      )}
    </div>
  );
};

/**
 * Higher-order component for automatic performance monitoring
 */
export const withPerformanceMonitoring = <P extends Record<string, any>>(
  Component: React.ComponentType<P>,
  componentName = 'Component'
) => {
  const WrappedComponent = React.forwardRef<HTMLDivElement, P>((props, ref) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const { monitorElement } = usePerformanceMonitor();

    useEffect(() => {
      if (elementRef.current) {
        const observer = monitorElement(elementRef.current, componentName);
        return () => observer?.disconnect();
      }
    }, [monitorElement]);

    return (
      <div ref={ref || elementRef}>
        <Component {...(props as P)} />
      </div>
    );
  });

  WrappedComponent.displayName = `withPerformanceMonitoring(${componentName})`;
  return WrappedComponent;
};

export default usePerformanceMonitor;
