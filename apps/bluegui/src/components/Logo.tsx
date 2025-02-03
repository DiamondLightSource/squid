
import diamondLogo from '/assets/images/diamond.svg'

export default function Logo() {
    return <a href="https://intranet.diamond.ac.uk/Home.html" target="_blank">
        <img src={diamondLogo} className="logo" alt="Diamond Web logo"  height={20} width={20}/>
    </a>
}