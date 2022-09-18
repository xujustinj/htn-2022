import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import imageRight from '../../../assets/imageIphoneFinal.png'
import { Navbar } from '../Navbar/Navbar';

export function Body() {
    return (
        <>
            <Navbar/>
            <h1 className='text-white ml-10 mr-10 mt-9 text-4xl font-serif mt-3  tracking-wide 	'>
                turn any <u>article</u> into a video <br></br> in seconds.
            </h1>
            <br />
            <p className='text-white ml-10 mr-10 '>A hackathon (also known as a hack day, hackfest, datathon or codefest; a portmanteau of hacking marathon) is a <a>sprint</a>-like design event wherein <a>computer programmers</a> and others involved in software <a>development</a>, including graphic designers,  interface designers, product managers, project managers, domain experts, and others collaborate intensively on <a>software</a> projects. <br /><br />
                <img className='w-50 float-right' src={imageRight} alt="right image" />
                The goal of a hackathon is to create functioning software or hardware by the end of the event.[1] Hackathons tend to have a specific focus, which can include the programming language used, the operating system, an application, an API, or the subject and the demographic group of the programmers. In other cases, there is no restriction on the type of software being created or the design of the new system.</p>
            <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 mt-5">
                create video
            </button>
            <h1 className='text-blue-500 text-4xl ml-10 mt-48	'><b>we're making information</b></h1>
            <h1 className='font-serif ml-10 mt-4 text-3xl'><b>easy</b> to understand</h1>
            <h1 className='font-serif ml-10 mt-3 text-3xl'><b>fun</b> to understand</h1>
            <h1 className='font-serif ml-10 mt-3 text-3xl'><b>easy</b> to understand</h1>
        </>

    )
}
