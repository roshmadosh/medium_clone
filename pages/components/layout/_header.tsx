import Link from 'next/link';
export function Header() {
  return (
    <header>
      <div className="logo">
        <Link href={'/'}>
          <a>
            <img src="officelogo.jpg" alt="navigate to home page" height={60} width={90} />
          </a> 
        </Link>
      </div>
      <nav>
        <ul>
          <li><Link href={'/signup'}>Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  )
}