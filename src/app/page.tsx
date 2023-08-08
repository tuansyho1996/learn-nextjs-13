'use client'

import Link from 'next/link'
import x from '../style/style.module.scss'
import y from '../style/style2.module.css';
import { Button } from 'react-bootstrap';

export default function Home() {
  return (
    <div>
      <ul>
        <li className={x.color}>
          <Link href='/facebook'>
            <span className={x.element}>Facebook</span>
          </Link>
        </li>
        <li className={y.color}>
          <Link href='/youtube'>Youtube</Link>
        </li>
        <li>
          <Link href='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <button className='btn btn-primary'>use bootstrap</button>
          <Button variant='primary'>use react bootstrap</Button>
        </li>
      </ul>
    </div>
  )
}
