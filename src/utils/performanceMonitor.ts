/**
 * Performance Monitor Utility for Mattix Brand Logo
 * This utility helps monitor GPU acceleration and performance metrics
 */

export class PerformanceMonitor {
  private observer?: PerformanceObserver;
  private frameCount = 0;
  private lastTime = 0;
  private fps = 0;

  constructor() {
    this.init();
  }

  /**
   * Initialize performance monitoring
   */
  private init() {
    // Monitor performance entries
    if ('PerformanceObserver' in window) {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.handlePerformanceEntry(entry);
        }
      });

      this.observer.observe({
        entryTypes: ['measure', 'navigation', 'resource', 'paint']
      });
    }

    // Start FPS monitoring
    this.startFPSMonitoring();
  }

  /**
   * Handle performance entries
   */
  private handlePerformanceEntry(entry: PerformanceEntry) {
    if (entry.entryType === 'paint') {
      console.log(`🎨 Paint Event: ${entry.name} - ${entry.startTime.toFixed(2)}ms`);
    } else if (entry.entryType === 'measure') {
      console.log(`📊 Performance Measure: ${entry.name} - ${entry.duration?.toFixed(2)}ms`);
    } else if (entry.entryType === 'navigation') {
      const navEntry = entry as PerformanceNavigationTiming;
      console.log(`🚀 Navigation: Load time ${navEntry.loadEventEnd - navEntry.fetchStart}ms`);
    }
  }

  /**
   * Start FPS monitoring
   */
  private startFPSMonitoring() {
    const countFrame = (currentTime: number) => {
      this.frameCount++;
      
      if (currentTime >= this.lastTime + 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
        this.frameCount = 0;
        this.lastTime = currentTime;
        
        // Log FPS (only if below 60fps to avoid spam)
        if (this.fps < 60) {
          console.warn(`⚠️  FPS: ${this.fps} (target: 60)`);
        }
      }
      
      requestAnimationFrame(countFrame);
    };
    
    requestAnimationFrame(countFrame);
  }

  /**
   * Check if GPU acceleration is working
   */
  public checkGPUAcceleration(): boolean {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') as WebGLRenderingContext;
      
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          console.log('🎮 GPU Renderer:', renderer);
          return !renderer.toLowerCase().includes('software');
        }
      }
    } catch (error) {
      console.warn('Could not detect GPU acceleration:', error);
    }
    
    return false;
  }

  /**
   * Monitor specific element performance
   */
  public monitorElement(element: HTMLElement, name: string) {
    if (!element) return;

    const observer = new MutationObserver(() => {
      performance.mark(`${name}-mutation-start`);
      requestAnimationFrame(() => {
        performance.mark(`${name}-mutation-end`);
        performance.measure(
          `${name}-mutation`,
          `${name}-mutation-start`,
          `${name}-mutation-end`
        );
      });
    });

    observer.observe(element, {
      attributes: true,
      childList: true,
      subtree: true
    });

    return observer;
  }

  /**
   * Get current performance metrics
   */
  public getMetrics() {
    return {
      fps: this.fps,
      memory: (performance as any).memory ? {
        used: Math.round((performance as any).memory.usedJSHeapSize / 1048576),
        total: Math.round((performance as any).memory.totalJSHeapSize / 1048576),
        limit: Math.round((performance as any).memory.jsHeapSizeLimit / 1048576)
      } : null,
      timing: performance.timing ? {
        loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
        domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
      } : null
    };
  }

  /**
   * Log performance summary
   */
  public logSummary() {
    const metrics = this.getMetrics();
    console.group('🔍 Performance Summary');
    console.log(`FPS: ${metrics.fps}`);
    console.log(`GPU Acceleration: ${this.checkGPUAcceleration() ? '✅ Active' : '❌ Not Active'}`);
    
    if (metrics.memory) {
      console.log(`Memory Usage: ${metrics.memory.used}MB / ${metrics.memory.total}MB`);
    }
    
    if (metrics.timing) {
      console.log(`Page Load: ${metrics.timing.loadTime}ms`);
      console.log(`DOM Ready: ${metrics.timing.domReady}ms`);
    }
    
    console.groupEnd();
  }

  /**
   * Start performance profiling for a specific duration
   */
  public startProfiling(duration = 10000) {
    console.log('🔬 Starting performance profiling...');
    performance.mark('profiling-start');
    
    setTimeout(() => {
      performance.mark('profiling-end');
      performance.measure('profiling-session', 'profiling-start', 'profiling-end');
      this.logSummary();
      console.log('✅ Profiling complete');
    }, duration);
  }

  /**
   * Check for performance issues
   */
  public diagnose() {
    const issues: string[] = [];
    const metrics = this.getMetrics();

    if (metrics.fps < 60) {
      issues.push(`Low FPS: ${metrics.fps} (target: 60)`);
    }

    if (!this.checkGPUAcceleration()) {
      issues.push('GPU acceleration not detected');
    }

    if (metrics.memory && metrics.memory.used > metrics.memory.limit * 0.8) {
      issues.push('High memory usage detected');
    }

    if (issues.length > 0) {
      console.group('⚠️  Performance Issues Detected');
      issues.forEach(issue => console.warn(issue));
      console.groupEnd();
    } else {
      console.log('✅ No performance issues detected');
    }

    return issues;
  }

  /**
   * Cleanup
   */
  public destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Auto-initialize in development mode
if (process.env.NODE_ENV === 'development') {
  const monitor = new PerformanceMonitor();
  
  // Make it globally available for debugging
  (window as any).performanceMonitor = monitor;
  
  // Auto-diagnose after 5 seconds
  setTimeout(() => {
    monitor.diagnose();
  }, 5000);
}

export default PerformanceMonitor;
