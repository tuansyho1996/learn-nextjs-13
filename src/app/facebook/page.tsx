'use client'
import { Fragment } from "react";
import { useRouter } from 'next/navigation'

const page = () => {
  const route = useRouter()
  const handleClickBack = () => {
    route.push('/')
  }
  return (
    <Fragment>
      <div>hello facebook</div>
      <div>
        <button onClick={() => handleClickBack()}>Back</button>
      </div>
    </Fragment>
  )
}
export default page