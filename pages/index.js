import React from 'react'
import Image from 'next/image'
import company_logo_source from "/public/company-logo.png";
import app_logo_source from "/public/GAccess-colored.png";
import google_logo_source from "/public/img_landingpage/brands-and-logotypes.png";
import { useRouter } from 'next/router'

export default function LandingPage() {
  const router = useRouter()
  const handleClick = (e) => {
    e.preventDefault()
    router.push('/landingPage')
  }
  return (
    <div className='background'>
      <div className='top'></div>
      <div className='box'>
      <Image src={company_logo_source} alt="company_logo" width={124} height={46}/>
      <div style={{marginTop:'5%'}}>
      <Image src={app_logo_source} alt="app_logo" width={247} height={76}/>
      </div>
      <div className='sso_container'>
        <div className='google_logo_container'>
            <Image src={google_logo_source} alt="google_logo" width={32} height={32}/>
        </div>
        <button className='sso_button' onClick={handleClick}>Login with Google account</button>
      </div>
      </div>
      <div className='bottom'></div>
    </div>
  )
}
