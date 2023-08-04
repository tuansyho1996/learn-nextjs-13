
import Link from 'next/link'
import x from '../style/style.module.css';
import y from '../style/style2.module.css'

export default function Home() {
  return (
    <div>
      <ul>
        <li className={x.color}>
          <Link href='/facebook'>
            <span>Facebook</span>
          </Link>
        </li>
        <li className={y.color}>
          <Link href='/youtube'>Youtube</Link>
        </li>
        <li>
          <Link href='/dashboard'>Dashboard</Link>
        </li>
      </ul>
    </div>
  )
}
