import React from "react";

export default function Footer() {
  return (
    <footer className='flex flex-col items-center justify-center text-sm font-bold gap-2 mb-4'>
      <p> NTNU Gjøvik bachelor project group 10</p>
      <a
        href='https://www.ntnu.no/studier/bwu'
        target='_blank'
        rel='noreferrer'
      >
        <img src='/standard_logo_ntnu.png' alt='NTNU logo' className='h-7' />
      </a>
    </footer>
  );
}
