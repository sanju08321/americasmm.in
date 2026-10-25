import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { User } from '@supabase/supabase-js'

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Listen for login state updates
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Trigger GitHub Authentication Flow
  const loginWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'https://americasmm.in', 
      },
    })
  }

  // Handle Logout
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return <div style={styles.container}>Loading authentication...</div>
  }

  return (
    <div style={styles.container}>
      {!user ? (
        <div style={styles.card}>
          <h1 style={styles.title}>Welcome to AmericaSMM</h1>
          <p style={styles.subtitle}>Sign in to access your dashboard infrastructure.</p>
          <button onClick={loginWithGitHub} style={styles.githubBtn}>
            <svg style={styles.icon} viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.65.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
            </svg>
            Continue with GitHub
          </button>
        </div>
      ) : (
        <div style={styles.card}>
          <h1 style={styles.title}>Dashboard</h1>
          <p style={styles.successText}>Successfully authenticated!</p>
          <div style={styles.profileBox}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.id}</p>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

// Minimal Clean Inline Styles
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' },
  card: { padding: '40px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', textAlign: 'center' as const, maxWidth: '400px', width: '100%' },
  title: { fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: '0 0 10px 0' },
  subtitle: { fontSize: '14px', color: '#6b7280', marginBottom: '24px' },
  successText: { color: '#10b981', fontWeight: 'bold', marginBottom: '15px' },
  profileBox: { textAlign: 'left' as const, backgroundColor: '#f9fafb', padding: '15px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' },
  githubBtn: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '12px', backgroundColor: '#24292f', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '6px', cursor: 'pointer', fontSize: '16px' },
  logoutBtn: { width: '100%', padding: '10px', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  icon: { color: '#ffffff' }
}
