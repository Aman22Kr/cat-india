import { Component } from 'react';

// Shows the real error on screen instead of a blank page.
export default class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error('App crashed:', error, info); }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ maxWidth: 640, margin: '64px auto', padding: 16, fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Something went wrong</h1>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f7fb', padding: 12, marginTop: 12, fontSize: 13 }}>{String(this.state.error?.stack || this.state.error)}</pre>
        <button onClick={() => window.location.reload()} style={{ marginTop: 12, padding: '8px 16px', background: '#f47920', color: '#fff', borderRadius: 6 }}>Reload</button>
      </div>
    );
  }
}
