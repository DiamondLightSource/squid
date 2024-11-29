import diamondLogo from '/assets/images/diamond.svg'
import './App.css'
import { CountButton } from './components/CountButton'

function App() {

  return (
    <>
      <div>
        <a href="https://intranet.diamond.ac.uk/Home.html" target="_blank">
          <img src={diamondLogo} className="logo" alt="Diamond Web logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <CountButton />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App


