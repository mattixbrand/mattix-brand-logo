/**
 * GPU Acceleration Test Utility
 * Run this in the browser console to test GPU acceleration
 */

// Test if GPU acceleration is working
function testGPUAcceleration() {
  console.log('🧪 Testing GPU Acceleration...');
  
  try {
    // Test 1: WebGL Context
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') as WebGLRenderingContext;
    
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        console.log('🎮 GPU Renderer:', renderer);
        console.log('✅ Hardware acceleration detected');
      }
    } else {
      console.log('❌ No WebGL support detected');
    }
  } catch (error) {
    console.log('❌ GPU detection failed:', error);
  }
  
  // Test 2: Check CSS transforms
  const testElement = document.createElement('div');
  testElement.style.transform = 'translate3d(0, 0, 0)';
  testElement.style.willChange = 'transform';
  document.body.appendChild(testElement);
  
  const computedStyle = window.getComputedStyle(testElement);
  const transform = computedStyle.getPropertyValue('transform');
  
  if (transform && transform !== 'none') {
    console.log('✅ 3D transforms working');
  } else {
    console.log('❌ 3D transforms not applied');
  }
  
  document.body.removeChild(testElement);
  
  // Test 3: Performance metrics
  const perfEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
  if (perfEntries.length > 0) {
    const navTiming = perfEntries[0];
    console.log(`⚡ Page Load Time: ${navTiming.loadEventEnd - navTiming.loadEventStart}ms`);
  }
  
  // Test 4: Memory usage (Chrome only)
  if ((performance as any).memory) {
    const memory = (performance as any).memory;
    console.log(`💾 JS Heap Used: ${Math.round(memory.usedJSHeapSize / 1048576)}MB`);
    console.log(`💾 JS Heap Total: ${Math.round(memory.totalJSHeapSize / 1048576)}MB`);
  }
  
  console.log('🏁 GPU Acceleration test complete');
}

// Test animation performance
function testAnimationPerformance() {
  console.log('🎬 Testing Animation Performance...');
  
  let frameCount = 0;
  let lastTime = 0;
  let fps = 0;
  
  function measureFPS(currentTime: number) {
    frameCount++;
    
    if (currentTime >= lastTime + 1000) {
      fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      console.log(`📊 Current FPS: ${fps}`);
      
      if (fps >= 60) {
        console.log('✅ Excellent performance (60+ FPS)');
      } else if (fps >= 30) {
        console.log('⚠️ Good performance (30-59 FPS)');
      } else {
        console.log('❌ Poor performance (<30 FPS)');
      }
      
      frameCount = 0;
      lastTime = currentTime;
    }
    
    requestAnimationFrame(measureFPS);
  }
  
  requestAnimationFrame(measureFPS);
  
  // Stop after 5 seconds
  setTimeout(() => {
    console.log('🏁 Animation performance test complete');
  }, 5000);
}

// Test gradient performance
function testGradientPerformance() {
  console.log('🌈 Testing Gradient Performance...');
  
  const testDiv = document.createElement('div');
  testDiv.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0a0a0a 100%);
    transform: translate3d(0, 0, 0);
    will-change: transform;
    z-index: -9999;
    pointer-events: none;
  `;
  
  document.body.appendChild(testDiv);
  
  console.log('✅ GPU-accelerated gradient applied');
  
  // Remove after 3 seconds
  setTimeout(() => {
    document.body.removeChild(testDiv);
    console.log('🏁 Gradient performance test complete');
  }, 3000);
}

// Run all tests
function runAllTests() {
  testGPUAcceleration();
  setTimeout(() => testAnimationPerformance(), 1000);
  setTimeout(() => testGradientPerformance(), 2000);
}

// Export for use
if (typeof window !== 'undefined') {
  (window as any).GPUTest = {
    testGPUAcceleration,
    testAnimationPerformance,
    testGradientPerformance,
    runAllTests
  };
  
  // Auto-run in development
  if (location.hostname === 'localhost') {
    console.log('🚀 GPU Test utilities loaded. Run GPUTest.runAllTests() to test performance.');
  }
}

export {
  testGPUAcceleration,
  testAnimationPerformance,
  testGradientPerformance,
  runAllTests
};
